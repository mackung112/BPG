import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API client
// Note: We use an empty string as a fallback to avoid crashing during initialization 
// if the key is missing. We will throw an error in the actual functions.
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(apiKey);

/**
 * กำหนด System Prompt โดยใช้ข้อมูลรายวิชาเพื่อให้ AI รู้บริบท
 */
const buildSystemInstruction = (subjectData, currentMarkdown = '') => {
  return `
คุณคือ AI Agent ผู้เชี่ยวชาญด้านการออกแบบหลักสูตรและการจัดการเรียนการสอน 
หน้าที่ของคุณคือช่วยเหลือคุณครูในการร่าง ปรับปรุง และออกแบบโครงสร้างเนื้อหาหลักสูตร (Syllabus) 

ข้อมูลรายวิชาที่คุณกำลังดูแลอยู่:
- รหัส/ชื่อวิชา: ${subjectData?.subject_code || ''} ${subjectData?.subject_name_th || ''} (${subjectData?.subject_name_en || ''})
- จุดประสงค์รายวิชา: ${subjectData?.objectives || 'ไม่มีข้อมูล'}
- สมรรถนะรายวิชา: ${subjectData?.competencies || 'ไม่มีข้อมูล'}
- คำอธิบายรายวิชา: ${subjectData?.description || 'ไม่มีข้อมูล'}

---
เนื้อหา Markdown ของหลักสูตรที่อยู่ในกล่องข้อความของผู้ใช้ ณ ปัจจุบัน:
\`\`\`markdown
${currentMarkdown || '(ยังไม่มีเนื้อหา)'}
\`\`\`
---

กฎการทำงาน (สำคัญมาก):
1. **การสนทนาทั่วไป**: หากผู้ใช้ถามคำถาม ขอคำปรึกษา หรือหาข้อมูล ให้คุณตอบกลับด้วยข้อความปกติ อธิบายให้ชัดเจนและเป็นกันเอง
2. **การอัปเดตหลักสูตรอัตโนมัติ**: หากผู้ใช้สั่งให้คุณ "ร่าง", "แก้ไข", "เพิ่ม", "ลบ" หรือ "ปรับปรุง" เนื้อหาหลักสูตร (เช่น "ช่วยแบ่งเป็น 18 สัปดาห์", "แก้ไขบทที่ 1 ให้หน่อย", "เพิ่มเรื่องนี้ลงไป") 
   - ให้คุณคิดและเขียนเนื้อหาหลักสูตร "ฉบับสมบูรณ์ที่แก้ไขแล้ว" ขึ้นมาใหม่ทั้งหมด
   - คุณ **ต้อง** นำเนื้อหาฉบับสมบูรณ์นั้น ครอบด้วยแท็ก <UPDATE_SYLLABUS> ... </UPDATE_SYLLABUS> เสมอ
   - ระบบจะทำการดึงข้อความในแท็กนี้ไปอัปเดตในกล่องข้อความของผู้ใช้ให้โดยอัตโนมัติ 
   - ตัวอย่างการตอบกลับ:
     รับทราบครับ ผมได้ทำการเพิ่มเนื้อหาให้แล้วครับ
     <UPDATE_SYLLABUS>
     # โครงสร้างเนื้อหาหลักสูตร
     ... (เนื้อหาทั้งหมดที่แก้ไขแล้ว) ...
     </UPDATE_SYLLABUS>
     มีส่วนไหนอยากให้ปรับเพิ่มเติมอีกไหมครับ?

คำแนะนำการจัดรูปแบบ:
- ใช้ Markdown ในการจัดรูปแบบเสมอ (Heading, List, Table)
- โครงสร้างที่แนะนำ: สัปดาห์ที่ / ชื่อหน่วยการเรียนรู้ / จุดประสงค์ / กิจกรรม / จำนวนชั่วโมง
`;
};

/**
 * แชตกับ AI โดยส่งประวัติการแชตและข้อความล่าสุด
 * @param {Object} subjectData - ข้อมูลรายวิชาสำหรับบริบท
 * @param {String} currentMarkdown - ข้อความ Markdown ปัจจุบัน
 * @param {Array} history - ประวัติแชต [{ role: 'user' | 'model', parts: [{ text: '...' }] }]
 * @param {String} message - ข้อความล่าสุดที่ผู้ใช้พิมพ์
 * @returns {String} ข้อความตอบกลับจาก AI
 */
export const chatWithSyllabusAI = async (subjectData, currentMarkdown, history, message, retryCount = 0) => {
  if (!apiKey) {
    throw new Error('ไม่พบ API Key กรุณาตั้งค่า VITE_GEMINI_API_KEY ในไฟล์ .env ของโปรเจกต์ (เช่น VITE_GEMINI_API_KEY=AIzaSy...) แล้วรีสตาร์ทเซิร์ฟเวอร์');
  }

  // Fallback models in case the latest is experiencing high demand
  const modelsToTry = ['gemini-flash-latest', 'gemini-3.7-flash', 'gemini-3.5-flash', 'gemini-2.5-flash'];
  const currentModelStr = modelsToTry[retryCount] || modelsToTry[0];

  try {
    const model = genAI.getGenerativeModel({ 
      model: currentModelStr,
      systemInstruction: buildSystemInstruction(subjectData, currentMarkdown)
    });

    const chat = model.startChat({
      history: history,
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error(`Gemini API Error with ${currentModelStr}:`, error);
    
    // If it's a 503 error (High demand) and we have more fallback models to try
    if (error.message.includes('503') && retryCount < modelsToTry.length - 1) {
      console.log(`Model ${currentModelStr} is busy, retrying with ${modelsToTry[retryCount + 1]}...`);
      return chatWithSyllabusAI(subjectData, currentMarkdown, history, message, retryCount + 1);
    }
    
    if (error.message.includes('503')) {
      throw new Error('เซิร์ฟเวอร์ AI มีผู้ใช้งานหนาแน่นมากชั่วคราว (High Demand) กรุณารอสักครู่แล้วลองใหม่อีกครั้งครับ');
    }
    
    throw new Error('เกิดข้อผิดพลาดในการเชื่อมต่อกับ AI: ' + error.message);
  }
};

/**
 * giftParser.js
 * ===================================================================
 * ตัวแปลงรูปแบบข้อสอบ GIFT (Moodle GIFT Format)
 * รองรับ:
 *  - คำถามแบบหลายตัวเลือก (Multiple Choice)
 *  - การฝังรูปภาพไอคอนด้วย Base64 (Data URI) เช่น src="data:image/..." หรือ src\="data:image/..."
 *  - การใส่รูปภาพด้วยลิงก์ URL เช่น src="https://..." หรือ src\="https://..."
 *  - การรองรับแท็ก [html] และการ Escape เครื่องหมาย \= ภายในตัวเลือก
 *  - ฉลาดพอที่จะแยกแยะเครื่องหมาย = ใน attribute HTML/Base64 ออกจากตัวแบ่งตัวเลือก GIFT
 *  - การระบุชื่อข้อสอบด้วย ::Title::
 *  - ป้องกันการตัดข้อความที่มี // ใน URL หรือรหัส Base64
 */

export const parseQuestions = (text) => {
  if (!text || typeof text !== 'string') return [];

  const lines = text.split(/\r?\n/);
  const noComments = [];

  for (let line of lines) {
    // Only strip lines that start with // (GIFT comment lines)
    // NEVER strip // inside URLs (http:// or https://) or Base64 data URIs!
    if (/^\s*\/\//.test(line)) {
      continue;
    }
    noComments.push(line);
  }

  const cleanText = noComments.join('\n');

  // Regex to match question text and body { ... }, allowing escaped braces \{ and \}
  const questionRegex = /((?:[^{]|\\\{)+)\{((?:[^}]|\\\})+)\}/g;
  let match;
  const parsed = [];

  while ((match = questionRegex.exec(cleanText)) !== null) {
    let qText = match[1].trim();

    // 1. Check and extract GIFT title ::Title::
    let title = '';
    const titleMatch = qText.match(/^::(.*?)::\s*([\s\S]*)$/);
    if (titleMatch) {
      title = titleMatch[1].trim();
      qText = titleMatch[2].trim() || title;
    }

    // 2. Strip leading [html] tag if present
    qText = qText.replace(/^\[html\]\s*/i, '');

    // 3. Unescape GIFT characters in question text
    qText = qText.replace(/\\([=~{}#:"])/g, '$1');

    // 4. Extract first image URL / Data URI if present as fallback
    const imgMatch = qText.match(/<img[^>]+src=["']([^"']+)["'][^>]*>|!\[.*?\]\((.*?)\)/i);
    const extractedImageUrl = imgMatch ? (imgMatch[1] || imgMatch[2]) : null;

    const body = match[2].trim();
    let currentToken = '';
    let isCorrect = false;
    const choices = [];
    let correctAnswerIndex = 0;

    let insideTag = false;
    let quoteChar = null;

    for (let i = 0; i < body.length; i++) {
      const char = body[i];

      // Handle escaped characters (\=, \~, \#, \{, \}, \:, \", \\)
      if (char === '\\' && i + 1 < body.length && ['=', '~', '#', '{', '}', ':', '"', '\\'].includes(body[i + 1])) {
        currentToken += body[i + 1];
        i++;
        continue;
      }

      // Track HTML tag boundaries < ... >
      if (char === '<' && !quoteChar) {
        insideTag = true;
      } else if (char === '>' && !quoteChar) {
        insideTag = false;
      }

      // Track quotes inside tags or attributes " ... " or ' ... '
      if ((char === '"' || char === "'") && insideTag) {
        if (!quoteChar) {
          quoteChar = char;
        } else if (quoteChar === char) {
          quoteChar = null;
        }
      }

      // Delimiters (= for correct, ~ for incorrect) are ONLY valid outside HTML tags and quotes
      const isChoiceDelimiter = (char === '=' || char === '~') && !insideTag && !quoteChar;

      if (isChoiceDelimiter) {
        if (currentToken.trim()) {
          const choiceText = currentToken.trim().replace(/^\[html\]\s*/i, '');
          choices.push({ text: choiceText, is_correct: isCorrect });
          if (isCorrect) correctAnswerIndex = choices.length - 1;
        }
        currentToken = '';
        isCorrect = (char === '=');
      } else {
        currentToken += char;
      }
    }

    if (currentToken.trim()) {
      const choiceText = currentToken.trim().replace(/^\[html\]\s*/i, '');
      choices.push({ text: choiceText, is_correct: isCorrect });
      if (isCorrect) correctAnswerIndex = choices.length - 1;
    }

    if (qText && choices.length > 0) {
      parsed.push({
        title: title || undefined,
        question_text: qText,
        choices: choices,
        correct_answer_index: correctAnswerIndex,
        image_url: extractedImageUrl || null
      });
    }
  }

  return parsed;
};

/**
 * Check if text contains media (img tag, base64 data uri, markdown image)
 */
export const hasMedia = (text) => {
  if (!text || typeof text !== 'string') return false;
  return /<img[\s\S]*?>|!\[.*?\]\(.*?\)|\bdata:image\//i.test(text);
};

/**
 * Extract all image sources from text
 */
export const extractImages = (text) => {
  if (!text || typeof text !== 'string') return [];
  const results = [];
  const imgTagRegex = /<img\s+[^>]*src=["']([^"']+)["'][^>]*>/gi;
  let match;
  while ((match = imgTagRegex.exec(text)) !== null) {
    results.push(match[1]);
  }
  const mdImgRegex = /!\[.*?\]\((.*?)\)/g;
  while ((match = mdImgRegex.exec(text)) !== null) {
    results.push(match[1]);
  }
  return results;
};

/**
 * Example GIFT content demonstrating text, inline icons, and diagrams
 */
export const sampleGiftWithImages = `// ==============================================================
// ตัวอย่างรูปแบบข้อสอบ GIFT รองรับรูปภาพ (Moodle GIFT Format with Images)
// ==============================================================

// 1. ข้อสอบทั่วไป
ข้อใดคือเมืองหลวงของประเทศไทย?{
=กรุงเทพมหานคร
~เชียงใหม่
~ภูเก็ต
~ขอนแก่น
}

// 2. ข้อสอบที่มีไอคอนในตัวเลือก (ใช้ URL หรือ Base64)
// หมายเหตุ: เครื่องหมาย = ในแอตทริบิวต์ HTML จะใส่ Backslash นำหน้าเป็น \\= หรือไม่ใส่ก็ได้ ระบบรองรับทั้งสองแบบ
ข้อใดคือวิธีในการบันทึกที่อยู่ของเว็บไซต์ในบุ๊กมาร์กที่ง่ายที่สุด?{
=[html]คลิก <img src\\="https://api.iconify.design/lucide:star.svg" height\\="20" alt\\="ดาว"> (รูปดาวที่แถบที่อยู่)
~[html]คลิก <img src\\="https://api.iconify.design/lucide:sidebar.svg" height\\="20" alt\\="แถบด้านข้าง"> (รูปแถบด้านข้าง)
~[html]คลิก <img src\\="https://api.iconify.design/lucide:more-vertical.svg" height\\="20" alt\\="สามจุด"> (รูปสามจุด)
~[html]กด Ctrl + t
}

// 3. ข้อสอบที่มีรูปภาพแผนผังหรือไดอะแกรมประกอบโจทย์
::อุปกรณ์เครือข่าย::[html]จากภาพด้านล่างนี้ คืออุปกรณ์เครือข่ายชนิดใด?<br><img src\\="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=500" alt\\="Network Router">{
=เราเตอร์ (Router)
~สวิตช์ (Switch)
~ฮับ (Hub)
~แอกเซสพอยต์ (Access Point)
}
`;

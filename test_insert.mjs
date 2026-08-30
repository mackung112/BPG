import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ohpuurdgpeimbgjdrdze.supabase.co';
const supabaseKey = 'sb_publishable_CXqYkX_G9oISMkTYEqJqPw_aXrOAzPV';
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data, error } = await supabase
    .from('curriculum_subjects')
    .insert([
      {
        subject_code: '21910-1003',
        subject_name: 'การเขียนโปรแกรมคอมพิวเตอร์เบื้องต้น',
        subject_name_en: 'Basic Computer Programming',
        theory_hours: 1,
        practical_hours: 2,
        credits: 2,
        reference_standard: 'มาตรฐานคุณวุฒิวิชาชีพ สถาบันคุณวุฒิวิชาชีพ (องค์การมหาชน) อาชีพนักพัฒนาระบบ ระดับ',
        learning_outcomes: 'เขียนโปรแกรมด้วยภาษาคอมพิวเตอร์ได้อย่างเป็นระบบ ด้วยความละเอียด รอบคอบ',
        objectives: 'เพื่อให้\n1. เข้าใจหลักการเขียนโปรแกรมคอมพิวเตอร์\n2. มีทักษะในการวิเคราะห์ ออกแบบผังงาน รหัสเทียม และการพัฒนาโปรแกรม\n3. มีความสามารถประยุกต์ใช้คำสั่งการทำงานคอมพิวเตอร์เบื้องต้น\n4. มีเจตคติและกิจนิสัยที่ดีในการปฏิบัติงานด้วยความละเอียด รอบคอบ',
        competencies: '1. แสดงความรู้เกี่ยวกับการเขียนโปรแกรมคอมพิวเตอร์ตามหลักการ\n2. ออกแบบผังงาน เขียนรหัสเทียมตามหลักการ\n3. เขียนคำสั่งการทำงานโปรแกรมด้วยภาษาคอมพิวเตอร์ตามหลักการและกระบวนการ\n4. ประยุกต์ใช้คำสั่งการทำงานคอมพิวเตอร์เบื้องต้นในงานธุรกิจ',
        description: 'ศึกษาและปฏิบัติเกี่ยวกับหลักการเขียนโปรแกรมคอมพิวเตอร์ การแก้ปัญหาการทำงาน การวิเคราะห์ปัญหา การกำหนดขั้นตอนการทำงาน (Algorithm) ด้วยภาษาคอมพิวเตอร์ การเขียนผังงาน (Flowchart) การเขียน รหัสเทียม (Pseudocode) หลักการออกแบบโปรแกรม และปฏิบัติการเขียนโปรแกรมด้วยภาษาคอมพิวเตอร์'
      }
    ])
    .select();

  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Success:', data);
  }
}
run();

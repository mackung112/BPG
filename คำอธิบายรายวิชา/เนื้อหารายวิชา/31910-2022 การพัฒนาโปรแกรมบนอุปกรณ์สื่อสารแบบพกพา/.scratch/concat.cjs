const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname);
const targetFile = 'd:/BPG/คำอธิบายรายวิชา/เนื้อหารายวิชา/31910-2022 การพัฒนาโปรแกรมบนอุปกรณ์สื่อสารแบบพกพา/interactive_web/ch02-figma-wireframing.html';

const parts = [
  'part1_head_hero.html',
  'part2_fundamentals_figma.html',
  'part3_anatomy_archetypes.html',
  'part4_simulator_collab.html',
  'part5_checklist_rubric_faq_nav_script.html'
];

let finalHtml = '';
for (const p of parts) {
  const pPath = path.join(dir, p);
  const content = fs.readFileSync(pPath, 'utf8');
  finalHtml += content + '\n';
}

fs.writeFileSync(targetFile, finalHtml, 'utf8');

const stats = fs.statSync(targetFile);
console.log('Successfully concatenated', parts.length, 'parts!');
console.log('Final file path:', targetFile);
console.log('Final file size:', (stats.size / 1024).toFixed(2), 'KB (Bytes:', stats.size, ')');

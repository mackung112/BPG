const fs = require('fs');
const path = require('path');

const p1 = require('./ch10_parts/part1_head_hero.cjs');
const p2 = require('./ch10_parts/part2_theory_hardware_scan.cjs');
const p3 = require('./ch10_parts/part3_signature_audit.cjs');
const p4 = require('./ch10_parts/part4_workshops_archetypes.cjs');
const p5 = require('./ch10_parts/part5_interactive_widgets.cjs');
const p6 = require('./ch10_parts/part6_collab_troubleshoot_rubric_faq.cjs');

const fullHtml = p1 + p2 + p3 + p4 + p5 + p6;

const targetFile = 'd:/BPG/คำอธิบายรายวิชา/เนื้อหารายวิชา/31910-2022 การพัฒนาโปรแกรมบนอุปกรณ์สื่อสารแบบพกพา/interactive_web/ch10-barcode-qr-signature.html';

fs.writeFileSync(targetFile, fullHtml, 'utf8');

const stats = fs.statSync(targetFile);
console.log('Chapter 10 interactive web page generated successfully!');
console.log('Target Path:', targetFile);
console.log('File Size in Bytes:', stats.size);
console.log('File Size in KB:', (stats.size / 1024).toFixed(2), 'KB');

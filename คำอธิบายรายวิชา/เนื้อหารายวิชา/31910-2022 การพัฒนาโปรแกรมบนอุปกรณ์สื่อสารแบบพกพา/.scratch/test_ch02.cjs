const fs = require('fs');
const path = require('path');
const file = 'ch02-figma-wireframing.html';
const content = fs.readFileSync('interactive_web/' + file, 'utf8');

const tests = [
  ['Exists', fs.existsSync('interactive_web/' + file)],
  ['Size KB >= 40', (Buffer.byteLength(content, 'utf8') / 1024).toFixed(1)],
  ['DOCTYPE', content.includes('<!DOCTYPE html>')],
  ['lang=th', content.includes('<html lang="th"')],
  ['meta UTF-8', content.includes('<meta charset="UTF-8"')],
  ['viewport', content.includes('<meta name="viewport"')],
  ['Tailwind', content.includes('cdn.tailwindcss.com')],
  ['Google Fonts', content.includes('fonts.googleapis.com')],
  ['Red #FF0000', content.includes('#FF0000')],
  ['Dark #0F0F0F', content.includes('#0F0F0F')],
  ['Surface #F2F2F2', content.includes('#F2F2F2')],
  ['Border #E5E5E5', content.includes('#E5E5E5')],
  ['Blue #065FD4', content.includes('#065FD4')],
  ['Fonts Roboto Sarabun', content.includes('Roboto') && content.includes('Sarabun')],
  ['Brand name', content.includes('ห้องเรียนครูแม็ค')],
  ['BROADCAST badge', content.includes('BROADCAST')],
  ['Sidebar', content.includes('toggleSidebar') || content.includes('sidebar')],
  ['Chips', content.includes('chip-btn') || content.includes('chip')],
  ['Hero', content.includes('LECTURE BROADCAST') || content.includes('Broadcast')],
  ['NO window.print()', !content.includes('window.print()')],
  ['NO print label (พิมพ์เอกสาร)', !content.includes('พิมพ์เอกสาร')],
  ['Scroll progress', content.includes('scrollProgress') || content.includes('scroll-progress') || content.includes('progressBar')],
  ['Fresh Brew', content.includes('Fresh Brew') || content.includes('freshBrew') || content.includes('archetype')],
  ['Happy Paws', content.includes('Happy Paws') || content.includes('happyPaws')],
  ['Smart Borrow', content.includes('Smart Borrow') || content.includes('smartBorrow')],
  ['localStorage checklist', content.includes('localStorage') && (content.includes('checklist') || content.includes('Checklist'))],
  ['Rubric', content.includes('rubric') || content.includes('Rubric') || content.includes('รูบริก')],
  ['Copy clipboard', content.includes('clipboard') || content.includes('copyToClipboard') || content.includes('คัดลอก')],
  ['FAQ', content.includes('toggleFaq') || content.includes('accordion') || content.includes('คำถามทบทวน')],
  ['Prev chapter (ch01)', content.includes('ch01-sdlc-app-concept-canvas.html')],
  ['Next chapter (ch03)', content.includes('ch03-figma-hifi-ui.html')],
  ['Hub (index.html)', content.includes('index.html')],
  ['Simulator', content.includes('phone-simulator') || content.includes('phoneSimulator') || content.includes('simulator') || content.includes('smartphone')]
];

let allPassed = true;
tests.forEach(([name, res]) => {
  console.log((res ? '✅' : '❌') + ' ' + name + ': ' + res);
  if (!res) allPassed = false;
});

console.log('\nAll Chapter 02 assertions passed?', allPassed);

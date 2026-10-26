import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const COURSE_DIR = path.resolve('คำอธิบายรายวิชา/เนื้อหารายวิชา/31910-0002_องค์ประกอบศิลป์สำหรับงานกราฟิก');

const CHAPTER_FILES = [
  '1_31910_0002.html',
  '2_31910_0002.html',
  '3_space_31910_0002.html',
  '4_focal_point_emphasis_31910_0002.html',
  '5_placement_grouping_31910_0002.html',
  '6_31910_0002.html',
  '7_31910_0002.html'
];

const CHAPTER_BASELINES = {
  '1_31910_0002.html': 154800,
  '2_31910_0002.html': 184892,
  '3_space_31910_0002.html': 199386,
  '4_focal_point_emphasis_31910_0002.html': 208575,
  '5_placement_grouping_31910_0002.html': 217678,
  '6_31910_0002.html': 228062,
  '7_31910_0002.html': 216157
};

describe('Ticket 01: E2E Navigation & Bidirectional Chaining Test Suite (Course 31910-0002)', () => {

  it('All 7 original chapter files must exist and be accessible', () => {
    for (const file of CHAPTER_FILES) {
      const fullPath = path.join(COURSE_DIR, file);
      assert.equal(fs.existsSync(fullPath), true, `File missing: ${file}`);
    }
  });

  it('Master Hub (index.html) must exist and render course portal links to all 7 chapters', () => {
    const indexPath = path.join(COURSE_DIR, 'index.html');
    assert.equal(fs.existsSync(indexPath), true, 'index.html must exist');

    const html = fs.readFileSync(indexPath, 'utf8');
    assert.match(html, /31910-0002/, 'Hub must include course code 31910-0002');
    assert.match(html, /องค์ประกอบศิลป์สำหรับงานกราฟิก/, 'Hub must include course title');
    assert.match(html, /นายธิติวุฒิ จันทร์โสม/, 'Hub must include instructor name');
    assert.match(html, /วิทยาลัยการอาชีพบ้านโป่ง/, 'Hub must include institution name');

    // Hub must link to all 7 chapters
    for (const file of CHAPTER_FILES) {
      const linkRegex = new RegExp(`href=["']\\.?/?${file}["']`);
      assert.match(html, linkRegex, `index.html must contain a link to ${file}`);
    }

    // Hub must contain Resume Learning / LocalStorage script
    assert.match(html, /bpg_course_31910_0002_state|resume/i, 'Hub must contain progress / resume script');
  });

  it('Bidirectional Chaining: Chapter 1 forward to Chapter 2 and back to index.html', () => {
    const ch1Path = path.join(COURSE_DIR, '1_31910_0002.html');
    const ch1 = fs.readFileSync(ch1Path, 'utf8');

    // Forward link to Chapter 2
    assert.match(ch1, /href=["']\.\/2_31910_0002\.html["']|href=["']2_31910_0002\.html["']/, 'Chapter 1 must link forward to Chapter 2');

    // Back / Hub link to index.html
    assert.match(ch1, /href=["']\.\/index\.html["']|href=["']index\.html["']/, 'Chapter 1 must link back to index.html');
  });

  it('Bidirectional Chaining: Chapters 2 through 6 link backward to N-1 and forward to N+1', () => {
    for (let i = 1; i < CHAPTER_FILES.length - 1; i++) {
      const currentFile = CHAPTER_FILES[i];
      const prevFile = CHAPTER_FILES[i - 1];
      const nextFile = CHAPTER_FILES[i + 1];

      const filePath = path.join(COURSE_DIR, currentFile);
      const content = fs.readFileSync(filePath, 'utf8');

      const prevRegex = new RegExp(`href=["'](?:\\.\\/)?${prevFile}["']`);
      const nextRegex = new RegExp(`href=["'](?:\\.\\/)?${nextFile}["']`);
      const hubRegex = /href=["'](?:\.\/)?index\.html["']/;

      assert.match(content, prevRegex, `${currentFile} must link backward to ${prevFile}`);
      assert.match(content, nextRegex, `${currentFile} must link forward to ${nextFile}`);
      assert.match(content, hubRegex, `${currentFile} must link to index.html`);
    }
  });

  it('Bidirectional Chaining: Chapter 7 links backward to Chapter 6 and forward to course completion / index.html', () => {
    const ch7Path = path.join(COURSE_DIR, '7_31910_0002.html');
    const ch7 = fs.readFileSync(ch7Path, 'utf8');

    const prevRegex = /href=["'](?:\.\/)?6_31910_0002\.html["']/;
    const hubRegex = /href=["'](?:\.\/)?index\.html["']/;

    assert.match(ch7, prevRegex, 'Chapter 7 must link backward to Chapter 6');
    assert.match(ch7, hubRegex, 'Chapter 7 must link to index.html');
  });

  it('Header navigation: Brand in all 7 chapters must point to index.html', () => {
    for (const file of CHAPTER_FILES) {
      const content = fs.readFileSync(path.join(COURSE_DIR, file), 'utf8');
      assert.doesNotMatch(
        content,
        /<header[\s\S]*?<a[^>]*href=["']#hero-stage["']/i,
        `${file} header brand must not point to #hero-stage`
      );
      assert.match(
        content,
        /<header[\s\S]*?<a[^>]*href=["'](?:\.\/)?index\.html["']/i,
        `${file} header brand must point to index.html`
      );
    }
  });

  it('Content Non-Regression: Character counts must not decrease (Zero Content Lost)', () => {
    for (const file of CHAPTER_FILES) {
      const content = fs.readFileSync(path.join(COURSE_DIR, file), 'utf8');
      const baseline = CHAPTER_BASELINES[file];
      assert.ok(
        content.length >= baseline,
        `${file} content was reduced! Current: ${content.length}, Baseline: ${baseline}`
      );
    }
  });

  it('Content Non-Regression: Critical structural anchor IDs must remain intact', () => {
    const criticalIds = ['intro', 'hero-stage'];
    for (const file of CHAPTER_FILES) {
      const content = fs.readFileSync(path.join(COURSE_DIR, file), 'utf8');
      for (const id of criticalIds) {
        const idRegex = new RegExp(`id=["']${id}["']`, 'i');
        assert.match(content, idRegex, `${file} missing critical section id: ${id}`);
      }
    }
  });
});

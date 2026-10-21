import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

// Import courses from src/data.js
import courses from '../src/data.js';

describe('Home Page Course Integration & HTML Embed Test Suite', () => {

  const targetCourseIds = ['31910-0002', '31910-2022', '31910-2026'];

  it('All 3 courses are present in coursesData (src/data.js)', () => {
    for (const id of targetCourseIds) {
      const course = courses.find(c => c.id === id);
      assert.ok(course, `Course ${id} must exist in coursesData`);
      assert.equal(course.level, 'ปวส.', `Course ${id} level must be ปวส.`);
      assert.ok(course.title && course.title.trim().length > 0, `Course ${id} must have a title`);
      assert.ok(course.description && course.description.trim().length > 0, `Course ${id} must have a description`);
      assert.ok(course.icon && course.icon.trim().length > 0, `Course ${id} must have an icon`);
      assert.ok(Array.isArray(course.chapters) && course.chapters.length > 0, `Course ${id} must have chapters`);
    }
  });

  it('All 3 courses have id starting with "3" and appear in "หมวดวิชา ปวส." on Home page', () => {
    const psvCourses = courses.filter(c => c.id.charAt(0) === '3');
    for (const id of targetCourseIds) {
      const found = psvCourses.find(c => c.id === id);
      assert.ok(found, `Course ${id} must be in the ปวส. list on the home page`);
    }
  });

  it('Course 31910-0002 has 8 units and all corresponding HTML files exist in public/courses/31910-0002/', () => {
    const course = courses.find(c => c.id === '31910-0002');
    assert.equal(course.chapters.length, 8);

    const publicDir = path.resolve('public/courses/31910-0002');
    assert.ok(fs.existsSync(publicDir), 'Directory public/courses/31910-0002 must exist');

    for (const chapter of course.chapters) {
      for (const lesson of chapter.lessons) {
        assert.ok(lesson.content.startsWith('[html:'), `Lesson ${lesson.id} content must be an [html:...] marker`);
        const htmlPath = lesson.content.replace(/^\[html:/, '').replace(/\]$/, '');
        // htmlPath is e.g. /courses/31910-0002/1_31910_0002.html
        const relativeToPublic = htmlPath.replace(/^\//, '');
        const fullDiskPath = path.resolve('public', relativeToPublic);
        assert.ok(fs.existsSync(fullDiskPath), `HTML file must exist on disk: ${fullDiskPath}`);
      }
    }
  });

  it('Course 31910-2022 has 16 units and all corresponding HTML files exist in public/courses/31910-2022/', () => {
    const course = courses.find(c => c.id === '31910-2022');
    assert.equal(course.chapters.length, 16);

    const publicDir = path.resolve('public/courses/31910-2022');
    assert.ok(fs.existsSync(publicDir), 'Directory public/courses/31910-2022 must exist');

    for (const chapter of course.chapters) {
      for (const lesson of chapter.lessons) {
        assert.ok(lesson.content.startsWith('[html:'), `Lesson ${lesson.id} content must be an [html:...] marker`);
        const htmlPath = lesson.content.replace(/^\[html:/, '').replace(/\]$/, '');
        const relativeToPublic = htmlPath.replace(/^\//, '');
        const fullDiskPath = path.resolve('public', relativeToPublic);
        assert.ok(fs.existsSync(fullDiskPath), `HTML file must exist on disk: ${fullDiskPath}`);
      }
    }
  });

  it('Course 31910-2026 has 6 units and all corresponding HTML files exist in public/courses/31910-2026/', () => {
    const course = courses.find(c => c.id === '31910-2026');
    assert.equal(course.chapters.length, 6);

    const publicDir = path.resolve('public/courses/31910-2026');
    assert.ok(fs.existsSync(publicDir), 'Directory public/courses/31910-2026 must exist');

    for (const chapter of course.chapters) {
      for (const lesson of chapter.lessons) {
        assert.ok(lesson.content.startsWith('[html:'), `Lesson ${lesson.id} content must be an [html:...] marker`);
        const htmlPath = lesson.content.replace(/^\[html:/, '').replace(/\]$/, '');
        const relativeToPublic = htmlPath.replace(/^\//, '');
        const fullDiskPath = path.resolve('public', relativeToPublic);
        assert.ok(fs.existsSync(fullDiskPath), `HTML file must exist on disk: ${fullDiskPath}`);
      }
    }
  });

});

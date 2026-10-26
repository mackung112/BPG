import pyCourse from './data/21910-1003_pyCourse.js';
import wordCourse from './data/21910-2004_wordCourse.js';
import osCourse from './data/21910-2001_osCourse.js';
import osMaintenanceCourse from './data/31910-0001_osMaintenanceCourse.js';
import digitalTechCourse from './data/30001-1003_digitalTechCourse.js';
import dataAnalyticsCourse from './data/31910-1003_dataAnalyticsCourse.js';
import multimediaCourse from './data/31910-2018_multimediaCourse.js';
import artCourse from './data/31910-0002_artCourse.js';
import mobileAppCourse from './data/31910-2022_mobileAppCourse.js';
import webDesignCourse from './data/31910-2026_webDesignCourse.js';

// รายวิชาที่เปิดสอนในภาคเรียนปัจจุบัน (ภาคเรียนที่ 2/2569) ตามเล่มรวมหลักสูตรและภาระงานสอน
export const CURRENT_SEMESTER_COURSE_IDS = [
    '21910-2002', // อินเทอร์เน็ตในงานธุรกิจดิจิทัล
    '20000-2002', // กิจกรรมลูกเสือวิสามัญ 2
    '21910-2013', // ระบบเครือข่ายคอมพิวเตอร์
    '21910-2019', // การติดตั้งและบริการระบบคอมพิวเตอร์
    '31910-2022', // การพัฒนาโปรแกรมบนอุปกรณ์สื่อสารแบบพกพา
    '31910-2026', // โปรแกรมกราฟิกสำหรับการออกแบบเว็บไซต์
    '31910-0002', // องค์ประกอบศิลป์สำหรับงานกราฟิก
    '20001-1005', // การใช้เทคโนโลยีดิจิทัลเพื่ออาชีพ
];

const courses = [
    pyCourse,
    wordCourse,
    osCourse,
    osMaintenanceCourse,
    digitalTechCourse,
    dataAnalyticsCourse,
    multimediaCourse,
    artCourse,
    mobileAppCourse,
    webDesignCourse
];

export default courses;

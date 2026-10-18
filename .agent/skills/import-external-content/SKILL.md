---
name: import-external-content
description: นำไฟล์ React/HTML ที่ครูแม็คสร้างมาเข้าระบบ LMS เรียกใช้เมื่อผู้ใช้ต้องการนำเข้าไฟล์เนื้อหาที่สร้างมาเอง
---

# คู่มือนำเข้าเนื้อหาจากภายนอก

---

## รองรับ 2 รูปแบบ

### 1. ไฟล์ `.jsx` (React Component)
- **วาง**ที่ `src/components/interactive/<วิชา>/<prefix><X>_<Y>.jsx`
- **Marker**: `[<prefix><X>_<Y>]` ใส่ในฟิลด์ `content`
- ระบบ `import.meta.glob` จะตรวจจับอัตโนมัติ

### 2. ไฟล์ `.html` (HTML ไฟล์เดียว)
- **วาง**ที่ `src/components/interactive/<วิชา>/<filename>.html`
- **Marker**: `[html:<filename>]` ใส่ในฟิลด์ `content`
- ระบบจะฝังผ่าน `<iframe>` อัตโนมัติ ปรับความสูงตามเนื้อหา
- **ห้ามแปลง HTML เป็น React** — ฝังตรงเท่านั้น

---

## ขั้นตอนการนำเข้า

1. **รับไฟล์จากผู้ใช้** — ตรวจว่าเป็น `.jsx` หรือ `.html`
2. **วางไฟล์** ใน `src/components/interactive/<วิชา>/`
3. **เพิ่มข้อมูลใน Course Data**:
   - เพิ่ม lesson object ในไฟล์ `src/data/<prefix>Course.js`
   - ระบุ `content` เป็น marker ที่ถูกต้อง
4. **ตรวจสอบ** — รัน `npm run build` ให้ผ่าน

---

## ตัวอย่างข้อมูล Lesson

```javascript
{
    id: "3.1",
    title: "3.1 ชื่อบทเรียน",
    mainTitle: "ชื่อบทเรียน",
    subTitle: "(English Title)",
    description: "คำอธิบาย",
    content: "[html:my_lesson]",   // สำหรับ .html
    // หรือ
    content: "[py3_1]",            // สำหรับ .jsx
    hideHeader: true               // (ทางเลือก) ซ่อน header ถ้าไฟล์มี header เอง
}
```

---

## ข้อควรระวัง

- ชื่อไฟล์ HTML ห้ามมีช่องว่างหรืออักขระพิเศษ
- ไฟล์ HTML ที่ต้องการ auto-resize ให้เพิ่ม script นี้ในไฟล์:
  ```html
  <script>
    window.parent.postMessage({ type: 'resize', height: document.documentElement.scrollHeight }, '*');
  </script>
  ```

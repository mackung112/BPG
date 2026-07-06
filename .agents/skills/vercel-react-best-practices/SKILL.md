---
name: vercel-react-best-practices
description: แนวทางการเพิ่มประสิทธิภาพ React และ Next.js จาก Vercel Engineering ใช้เมื่อเขียน รีวิว หรือปรับปรุงโค้ด React/Next.js เพื่อให้ได้ประสิทธิภาพสูงสุด โดยเฉพาะงานที่เกี่ยวกับ React components, Next.js pages, การดึงข้อมูล, การจัดการ Bundle และการปรับปรุงประสิทธิภาพ
license: MIT
metadata:
  author: vercel
  version: "1.0.0"
---

# แนวทางปฏิบัติที่ดีที่สุดสำหรับ React จาก Vercel (Vercel React Best Practices)

คู่มือฉบับสมบูรณ์สำหรับการปรับปรุงประสิทธิภาพ (Performance Optimization) ของแอปพลิเคชัน React และ Next.js ดูแลโดยทีม Vercel ประกอบด้วยกฎ 70 ข้อใน 8 หมวดหมู่ เรียงลำดับตามความสำคัญเพื่อใช้เป็นแนวทางในการรีแฟคเตอร์และการสร้างโค้ดอัตโนมัติ

## เมื่อใดควรใช้แนวทางนี้
ให้อ้างอิงถึงแนวทางนี้เมื่อ:
- กำลังเขียน React Components หรือ Next.js pages ใหม่
- นำการดึงข้อมูลไปใช้งาน (Client หรือ Server-side)
- กำลังรีวิวโค้ดเพื่อหาปัญหาประสิทธิภาพ
- กำลังรีแฟคเตอร์โค้ด React/Next.js เดิมที่มีอยู่
- กำลังเพิ่มประสิทธิภาพขนาดไฟล์ (Bundle size) หรือระยะเวลาโหลด

## หมวดหมู่กฎเรียงตามความสำคัญ

| ความสำคัญ | หมวดหมู่ | ผลกระทบ | คำนำหน้า |
|----------|----------|--------|--------|
| 1 | การขจัดปัญหาคอขวด (Eliminating Waterfalls) | วิกฤต (CRITICAL) | `async-` |
| 2 | การปรับขนาด Bundle (Bundle Size Optimization) | วิกฤต (CRITICAL) | `bundle-` |
| 3 | ประสิทธิภาพฝั่งเซิร์ฟเวอร์ (Server-Side Performance) | สูง (HIGH) | `server-` |
| 4 | การดึงข้อมูลฝั่งไคลเอนต์ (Client-Side Data Fetching) | ปานกลาง-สูง | `client-` |
| 5 | การเพิ่มประสิทธิภาพการเรนเดอร์ซ้ำ (Re-render Optimization) | ปานกลาง (MEDIUM) | `rerender-` |
| 6 | ประสิทธิภาพการแสดงผล (Rendering Performance) | ปานกลาง (MEDIUM) | `rendering-` |
| 7 | ประสิทธิภาพของ JavaScript (JavaScript Performance) | ต่ำ-ปานกลาง | `js-` |
| 8 | รูปแบบขั้นสูง (Advanced Patterns) | ต่ำ (LOW) | `advanced-` |

## อ้างอิงแบบด่วน (Quick Reference)

### 1. การขจัดปัญหาคอขวด (Eliminating Waterfalls) - CRITICAL
- `async-cheap-condition-before-await` - ตรวจสอบเงื่อนไขแบบซิงก์ราคาถูกก่อนที่จะ await ค่าที่มีค่าใช้จ่ายสูง
- `async-defer-await` - ย้ายคำสั่ง await เข้าไปในเงื่อนไขที่มีการใช้งานจริงๆ เท่านั้น
- `async-parallel` - ใช้ Promise.all() สำหรับการทำงานที่เป็นอิสระต่อกัน
- `async-dependencies` - ใช้ better-all สำหรับการขึ้นต่อกันเพียงบางส่วน (partial dependencies)
- `async-api-routes` - เริ่ม promises ให้เร็ว และค่อย await ทีหลังใน API routes
- `async-suspense-boundaries` - ใช้ Suspense เพื่อสตรีมเนื้อหา

### 2. การปรับขนาด Bundle (Bundle Size Optimization) - CRITICAL
- `bundle-barrel-imports` - นำเข้าโดยตรง หลีกเลี่ยงไฟล์ barrel
- `bundle-analyzable-paths` - ใช้รูปแบบเส้นทางการนำเข้าแบบคงที่เพื่อหลีกเลี่ยงการทำให้ bundle บวม
- `bundle-dynamic-imports` - ใช้ next/dynamic สำหรับคอมโพเนนต์ที่หนัก
- `bundle-defer-third-party` - โหลดเครื่องมือวิเคราะห์/เก็บบันทึกหลังจาก Hydration เสร็จ
- `bundle-conditional` - โหลดโมดูลเฉพาะเมื่อฟีเจอร์ถูกเรียกใช้งานเท่านั้น
- `bundle-preload` - โหลดข้อมูลล่วงหน้าเมื่อ hover/focus เพื่อความรวดเร็ว

### 3. ประสิทธิภาพฝั่งเซิร์ฟเวอร์ (Server-Side Performance) - HIGH
- `server-auth-actions` - ตรวจสอบการรับรองตัวตนบนการดำเนินการของเซิร์ฟเวอร์ เช่น API routes
- `server-cache-react` - ใช้ React.cache() สำหรับลดการคำนวณซ้ำในระดับคำขอ
- `server-cache-lru` - ใช้ LRU cache สำหรับข้ามการจำกัดแคชต่อคำขอ
- `server-dedup-props` - หลีกเลี่ยงการ Serialize ข้อมูลซ้ำใน RSC props
- `server-hoist-static-io` - ดึงไฟล์คงที่ (Fonts, Logos) ไปไว้ที่ระดับโมดูล
- `server-no-shared-module-state` - หลีกเลี่ยงตัวแปรคำขอแบบ mutable ระดับโมดูลใน RSC/SSR
- `server-serialization` - จำกัดการส่งข้อมูลข้ามไปยังคอมโพเนนต์ของไคลเอนต์
- `server-parallel-fetching` - ปรับโครงสร้างคอมโพเนนต์ให้เป็นการดึงข้อมูลแบบขนาน
- `server-parallel-nested-fetching` - ดึงข้อมูลซ้อนกันด้วย Promise.all
- `server-after-nonblocking` - ใช้ after() สำหรับการทำงานที่ไม่บล็อกหน้าจอ

### 4. การดึงข้อมูลฝั่งไคลเอนต์ (Client-Side Data Fetching) - MEDIUM-HIGH
- `client-swr-dedup` - ใช้ SWR สำหรับช่วยป้องกันคำขอที่ซ้ำกันอัตโนมัติ
- `client-event-listeners` - ลดตัวดักฟังอีเวนต์แบบทั่วโลก (Global event listeners)
- `client-passive-event-listeners` - ใช้ตัวดักฟังแบบ passive สำหรับการเลื่อน
- `client-localstorage-schema` - ระบุเวอร์ชันและลดขนาดข้อมูล localStorage

### 5. การเพิ่มประสิทธิภาพการเรนเดอร์ซ้ำ (Re-render Optimization) - MEDIUM
- `rerender-defer-reads` - ไม่ subscribe กับ State ที่ถูกใช้แค่ใน Callbacks
- `rerender-memo` - แยกโค้ดที่หนักไปไว้ในคอมโพเนนต์แบบ Memo
- `rerender-memo-with-default-value` - เลื่อนค่า Props ปริยาย (default) ขึ้นด้านบน
- `rerender-dependencies` - ใช้ชนิดตัวแปรพื้นฐานในเอฟเฟกต์ Dependencies
- `rerender-derived-state` - Subscribe เฉพาะผลลัพธ์ boolean แทนค่าแบบดิบๆ
- `rerender-derived-state-no-effect` - แปลง State ในระหว่างการเรนเดอร์ ไม่ใช่ใน Effects
- `rerender-functional-setstate` - ใช้ Functional setState เพื่อให้ callbacks เสถียร
- `rerender-lazy-state-init` - ส่ง Function ให้ useState ถ้าค่านั้นใช้ทรัพยากรเยอะ
- `rerender-simple-expression-in-memo` - อย่าใช้ Memo กับค่าชนิดตัวแปรพื้นฐานที่ซับซ้อนน้อย
- `rerender-split-combined-hooks` - แยก Hooks ที่มี dependencies แบบอิสระต่อกัน
- `rerender-move-effect-to-event` - ย้ายลอจิกโต้ตอบไปที่ Event Handlers
- `rerender-transitions` - ใช้ startTransition กับคำสั่งที่ไม่ได้รีบ
- `rerender-use-deferred-value` - ชะลอคำสั่งการเรนเดอร์เพื่อให้ปุ่มตอบสนองได้ทัน
- `rerender-use-ref-transient-values` - ใช้ Ref กับค่าที่มีการอัปเดตบ่อยๆ และหายวับไป
- `rerender-no-inline-components` - อย่าประกาศคอมโพเนนต์ซ้อนในคอมโพเนนต์

### 6. ประสิทธิภาพการแสดงผล (Rendering Performance) - MEDIUM
- `rendering-animate-svg-wrapper` - เคลื่อนไหวกล่อง (div) ที่คลุม SVG แทนตัว SVG เอง
- `rendering-content-visibility` - ใช้ content-visibility กับลิสต์ที่ยาวๆ
- `rendering-hoist-jsx` - นำ JSX คงที่ออกมานอกคอมโพเนนต์
- `rendering-svg-precision` - ลดทอนความแม่นยำของพิกัดของ SVG
- `rendering-hydration-no-flicker` - ใช้สคริปต์ในบรรทัดเพื่อป้องกันการกระพริบระหว่างทำ Hydration
- `rendering-hydration-suppress-warning` - ซ่อนคำเตือนความไม่สอดคล้องกันที่คาดเดาได้
- `rendering-activity` - ใช้ Activity component เพื่อแสดง/ซ่อนหน้าจอ
- `rendering-conditional-render` - ใช้เงื่อนไข Ternary แทนตัวกระทำ &&
- `rendering-usetransition-loading` - ใช้ useTransition เป็นระบบสถานะโหลด (loading state)
- `rendering-resource-hints` - ใช้ React DOM resource hints เพื่อโหลตข้อมูลล่วงหน้า
- `rendering-script-defer-async` - ใช้คำสั่ง defer หรือ async บนสคริปต์

### 7. ประสิทธิภาพของ JavaScript (JavaScript Performance) - LOW-MEDIUM
- `js-batch-dom-css` - จัดกลุ่มการเปลี่ยนหน้าจอแบบ DOM/CSS (cssText หรือ classes)
- `js-index-maps` - ใช้ Map สำหรับการค้นหาซ้ำหลายๆ รอบ
- `js-cache-property-access` - เก็บค่าไว้ในตัวแปรก่อนถ้าจะใช้การดึงออบเจ็กต์บ่อยๆ ในลูป
- `js-cache-function-results` - ใช้ระดับโมดูล Map แคชผลการคำนวณล่วงหน้า
- `js-cache-storage` - แคช Local/SessionStorage ในหน่วยความจำเพื่อการเข้าถึงที่เร็วขึ้น
- `js-combine-iterations` - รวมฟังก์ชัน filter/map ให้ทำงานทีเดียว
- `js-length-check-first` - ตรวจสอบความยาวของ Array ก่อนการตรวจสอบอื่นๆ 
- `js-early-exit` - รีบออกจากฟังก์ชันก่อนถ้าไม่จำเป็น
- `js-hoist-regexp` - ประกาศ RegExp นอกระบบลูป
- `js-min-max-loop` - วนลูปเองดีกว่าการจัดเรียง array ใหม่ทั้งหมด
- `js-set-map-lookups` - ใช้ Map หรือ Set เพราะค้นหา O(1)
- `js-tosorted-immutable` - ใช้ toSorted() เพื่องานที่ไม่เปลี่ยนแปลง (immutable)
- `js-flatmap-filter` - ใช้ flatMap แทนเพื่อให้ฟิลเตอร์และแปลงไปพร้อมกัน
- `js-request-idle-callback` - เลื่อนงานที่ไม่สำคัญรอเบราว์เซอร์ว่าง (Idle Time)

### 8. รูปแบบขั้นสูง (Advanced Patterns) - LOW
- `advanced-effect-event-deps` - ไม่ใส่ `useEffectEvent` ไว้ใน Dependencies
- `advanced-event-handler-refs` - จัดเก็บ Event handlers เอาไว้ในตัวแปรแบบ ref
- `advanced-init-once` - สร้างสิ่งต่างๆ หนึ่งครั้งเมื่อโหลดแอป
- `advanced-use-latest` - ใช้ useLatest สำหรับ callback แบบอ้างอิงนิ่งๆ (Stable callback refs)

## วิธีการใช้งาน
สามารถอ่านไฟล์เฉพาะแต่ละกฎเพื่อดูคำอธิบายที่ละเอียดและตัวอย่างโค้ดได้ที่:

```
rules/async-parallel.md
rules/bundle-barrel-imports.md
```

เนื้อหาในแต่ละไฟล์ประกอบด้วย:
- คำอธิบายสั้นๆ เกี่ยวกับสาเหตุว่าทำไมถึงมีความสำคัญ
- ตัวอย่างโค้ดที่ผิดพลาดพร้อมคำอธิบาย
- ตัวอย่างโค้ดที่ถูกต้องพร้อมคำอธิบาย
- บริบทและเอกสารอ้างอิงเพิ่มเติม

## เอกสารฉบับสมบูรณ์
สำหรับการอ่านกฎทั้งหมดในเอกสารฉบับเดียว ให้ไปที่ `AGENTS.md`

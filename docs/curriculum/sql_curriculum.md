# หลักสูตร: ภาษาสอบถามข้อมูลเชิงโครงสร้างเบื้องต้น (21901-2001)

> เครื่องมือที่ใช้: MySQL + MySQL Workbench

## Unit 1: งานจัดการฐานข้อมูล

- 1.1 พื้นฐานฐานข้อมูล
- 1.2 ประเภทฐานข้อมูล
- 1.3 การเลือก DBMS
- 1.4 แนะนำภาษา MySQL และโปรแกรม MySQL Workbench

## Unit 2: ภาษานิยามข้อมูล (Data Definition Language - DDL)

- 2.1 ชนิดข้อมูล (Data Types)ที่สำคัญใน MySQL
  - 2.1.1 INT
  - 2.1.2 VARCHAR
  - 2.1.3 DATE
  - 2.1.4 DATETIME
  - 2.1.5 BOOLEAN
  - 2.1.6 FLOAT
  - 2.1.7 DECIMAL
  - 2.1.8 TEXT
- 2.2 การกำหนดข้อจำกัดความสมบูรณ์ของข้อมูล
  - 2.2.1 Primary Key
  - 2.2.2 Foreign Key
  - 2.2.3 Not Null
  - 2.2.4 Unique
  - 2.2.5 Auto Increment
- 2.3 คำสั่งสร้างฐานข้อมูลและตาราง
  - 2.3.1 CREATE DATABASE
  - 2.3.2 CREATE TABLE
- 2.4 คำสั่งแก้ไขโครงสร้างตาราง
  - 2.4.1 ALTER TABLE
- 2.5 คำสั่งลบฐานข้อมูลและลบตาราง
  - 2.5.1 DROP DATABASE
  - 2.5.2 DROP TABLE
- 2.6 คำสั่งล้างข้อมูลในตาราง
  - 2.6.1 TRUNCATE TABLE

## Unit 3: ภาษาจัดการข้อมูล (Data Manipulation Language - DML)

- 3.1 คำสั่งเพิ่มข้อมูลลงในตาราง(INSERT INTO)
- 3.2 การเพิ่มข้อมูลหลายรายการพร้อมกัน (Multiple INSERT)
- 3.3 การจัดการและทำความเข้าใจกับค่าว่าง (NULL Values)
- 3.4 คำสั่งแก้ไขปรับปรุงข้อมูล (UPDATE)
- 3.5 เงื่อนไขและการตรวจสอบความถูกต้องก่อนการแก้ไขข้อมูล
- 3.6 คำสั่งลบข้อมูล (DELETE)
- 3.7 เงื่อนไขและการประเมินผลกระทบก่อนการลบข้อมูล

## Unit 4: ภาษาเรียกค้นข้อมูลและฟังก์ชันเบื้องต้น (Basic Data Query & Functions)

- 4.1 พื้นฐานคำสั่งดึงข้อมูล
  - 4.1.1 Syntax SELECT
  - 4.1.2 ตัวอย่างการใช้ SELECT
  - 4.1.3 Syntax SELECT + FROM
  - 4.1.4 ตัวอย่างการใช้ SELECT + FROM
- 4.2 การดึงข้อมูลแบบไม่ซ้ำกัน (DISTINCT)
  - 4.2.1 Syntax DISTINCT
  - 4.2.2 ตัวอย่างการใช้ DISTINCT
- 4.3 การใช้ตัวดำเนินการทางตรรกะและเปรียบเทียบ
  - 4.3.1 ตารางเปลียบเทียบตัวดำเนินการ AND, OR, NOT, =, <, >, <=, >=, <>
  - 4.3.2 ตัวอย่างการใช้ AND, OR, NOT, =, <, >, <=, >=, <>
- 4.4 การกรองข้อมูลด้วยเงื่อนไข (WHERE, IN, BETWEEN)
  - 4.4.1 Syntax WHERE
  - 4.4.2 ตัวอย่างการใช้ WHERE
  - 4.4.3 Syntax IN
  - 4.4.4 ตัวอย่างการใช้ IN
  - 4.4.5 Syntax BETWEEN
  - 4.4.6 ตัวอย่างการใช้ BETWEEN
- 4.5 การค้นหาข้อมูลตามรูปแบบที่กำหนด (LIKE)
  - 4.5.1 Syntax LIKE
  - 4.5.2 ตัวอย่างการใช้ LIKE
- 4.6 การจัดเรียงลำดับข้อมูลและการจำกัดจำนวนผลลัพธ์ (ORDER BY, LIMIT)
  - 4.6.1 Syntax ORDER BY
  - 4.6.2 ตัวอย่างการใช้ ORDER BY
  - 4.6.3 Syntax LIMIT
  - 4.6.4 ตัวอย่างการใช้ LIMIT
- 4.7 ฟังก์ชันจัดการข้อความ (UPPER, LOWER, CONCAT, SUBSTRING)
  - 4.7.1 Syntax UPPER
  - 4.7.2 ตัวอย่างการใช้ UPPER
  - 4.7.3 Syntax LOWER
  - 4.7.4 ตัวอย่างการใช้ LOWER
  - 4.7.5 Syntax CONCAT
  - 4.7.6 ตัวอย่างการใช้ CONCAT
  - 4.7.7 Syntax SUBSTRING
  - 4.7.8 ตัวอย่างการใช้ SUBSTRING
- 4.8 ฟังก์ชันจัดการวันที่และเวลา (NOW, DATE_ADD, DATEDIFF)
  - 4.8.1 Syntax NOW
  - 4.8.2 ตัวอย่างการใช้ NOW
  - 4.8.3 Syntax DATE_ADD
  - 4.8.4 ตัวอย่างการใช้ DATE_ADD
  - 4.8.5 Syntax DATEDIFF
  - 4.8.6 ตัวอย่างการใช้ DATEDIFF
- 4.9 ฟังก์ชันเงื่อนไขเบื้องต้น (IF, CASE WHEN)
  - 4.9.1 Syntax IF
  - 4.9.2 ตัวอย่างการใช้ IF
  - 4.9.3 Syntax CASE WHEN
  - 4.9.4 ตัวอย่างการใช้ CASE WHEN

## Unit 5: ภาษาเรียกค้นข้อมูลขั้นสูง (Advanced Data Query)

- 5.1 ฟังก์ชันทางคณิตศาสตร์และฟังก์ชันสรุปผล (SUM, AVG, COUNT, MAX, MIN)
  - 5.1.1 Syntax SUM
  - 5.1.2 ตัวอย่างการใช้ SUM
  - 5.1.3 Syntax AVG
  - 5.1.4 ตัวอย่างการใช้ AVG
  - 5.1.5 Syntax COUNT
  - 5.1.6 ตัวอย่างการใช้ COUNT
  - 5.1.7 Syntax MAX
  - 5.1.8 ตัวอย่างการใช้ MAX
  - 5.1.9 Syntax MIN
  - 5.1.10 ตัวอย่างการใช้ MIN
- 5.2 การจัดกลุ่มข้อมูล (GROUP BY)
  - 5.2.1 Syntax GROUP BY
  - 5.2.2 ตัวอย่างการใช้ GROUP BY
- 5.3 การกรองข้อมูลหลังจากการจัดกลุ่ม (HAVING)
  - 5.3.1 Syntax HAVING
  - 5.3.2 ตัวอย่างการใช้ HAVING
- 5.4 การเชื่อมโยงข้อมูลจากหลายตารางแบบสมบูรณ์ (INNER JOIN)
  - 5.4.1 Syntax INNER JOIN
  - 5.4.2 ตัวอย่างการใช้ INNER JOIN
- 5.5 การเชื่อมโยงข้อมูลแบบรักษาข้อมูลตารางหลัก (LEFT JOIN, RIGHT JOIN)
  - 5.5.1 Syntax LEFT JOIN
  - 5.5.2 ตัวอย่างการใช้ LEFT JOIN
  - 5.5.3 Syntax RIGHT JOIN
  - 5.5.4 ตัวอย่างการใช้ RIGHT JOIN
- 5.6 การใช้คำสั่งสอบถามข้อมูลย่อย (Subqueries)
  - 5.6.1 Syntax Subqueries
  - 5.6.2 ตัวอย่างการใช้ Subqueries
- 5.7 การนำผลลัพธ์จากการสอบถามมารวมกัน (UNION, UNION ALL)
  - 5.7.1 Syntax UNION
  - 5.7.2 ตัวอย่างการใช้ UNION
  - 5.7.3 Syntax UNION ALL
  - 5.7.4 ตัวอย่างการใช้ UNION ALL

## Unit 6: การควบคุมข้อมูลและทรานแซกชัน (DCL & TCL)

- 6.1 แนวคิดเบื้องต้นเกี่ยวกับความปลอดภัยของฐานข้อมูล
- 6.2 การสร้างและจัดการบัญชีผู้ใช้งาน (CREATE USER)
  - 6.2.1 Syntax CREATE USER
  - 6.2.2 ตัวอย่างการใช้ CREATE USER
- 6.3 การให้สิทธิ์การใช้งานฐานข้อมูล (GRANT)
  - 6.3.1 Syntax GRANT
  - 6.3.2 ตัวอย่างการใช้ GRANT
- 6.4 การยกเลิกสิทธิ์การใช้งานฐานข้อมูล (REVOKE)
  - 6.4.1 Syntax REVOKE
  - 6.4.2 ตัวอย่างการใช้ REVOKE
- 6.5 แนวคิดของคุณสมบัติทรานแซกชัน (ACID Properties)
- 6.6 การควบคุมการทำงานของทรานแซกชัน (START TRANSACTION, COMMIT)
  - 6.6.1 Syntax START TRANSACTION
  - 6.6.2 ตัวอย่างการใช้ START TRANSACTION
  - 6.6.3 Syntax COMMIT
  - 6.6.4 ตัวอย่างการใช้ COMMIT
- 6.7 การยกเลิกการทำงานของทรานแซกชัน (ROLLBACK)
  - 6.7.1 Syntax ROLLBACK
  - 6.7.2 ตัวอย่างการใช้ ROLLBACK

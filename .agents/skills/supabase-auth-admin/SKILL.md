---
name: supabase-auth-admin
description: คำแนะนำการตั้งค่าระบบ Authentication ของ Supabase และการจัดการสิทธิ์ Admin (Super Admin)
---

# คู่มือการทำระบบ Auth และ Admin ด้วย Supabase

Skill นี้ใช้สำหรับการสร้างและจัดการระบบ Authentication ด้วย Supabase โดยมีการกำหนดสิทธิ์ผู้ดูแลระบบ (Admin) และผู้ดูแลระบบสูงสุด (Super Admin)

## โครงสร้างสิทธิ์
1. **Super Admin**: `mackung112@gmail.com`
   - มีสิทธิ์สูงสุดแต่เพียงผู้เดียว
   - สามารถ เพิ่ม / ลบ / แก้ไข Admin คนอื่นๆ ได้
2. **Admin**: ผู้ใช้ที่ได้รับการแต่งตั้งจาก Super Admin
   - สามารถจัดการข้อมูลทั่วไปในระบบได้ แต่ไม่สามารถจัดการ Admin คนอื่นได้
3. **User**: ผู้ใช้ทั่วไป

## การตั้งค่าฐานข้อมูล (Database Schema)
เพื่อรองรับระบบสิทธิ์ ต้องมีตาราง `admins` หรือเพิ่ม column `role` ในตาราง `users`

ตัวอย่างตาราง `admins`:
```sql
create table public.admins (
  id uuid references auth.users not null primary key,
  email text not null,
  role text not null default 'admin', -- 'super_admin' or 'admin'
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- เพิ่ม Super Admin เริ่มต้น (รันหลังจาก user สมัครสมาชิกแล้ว)
insert into public.admins (id, email, role)
values ('<USER_ID_OF_MACKUNG112>', 'mackung112@gmail.com', 'super_admin');
```

## Row Level Security (RLS) Policies
ต้องสร้าง Policy ใน Supabase เพื่อป้องกันการเข้าถึงข้อมูลโดยไม่ได้รับอนุญาต

**ตัวอย่าง Policy สำหรับตาราง admins:**
- **Read**: Admin และ Super Admin สามารถอ่านรายชื่อได้
- **Insert/Update/Delete**: เฉพาะ Super Admin (`mackung112@gmail.com`) เท่านั้นที่ทำได้

```sql
-- ฟังก์ชันเช็คว่าเป็น Super Admin หรือไม่
create or replace function public.is_super_admin()
returns boolean as $$
begin
  return exists (
    select 1 from public.admins 
    where id = auth.uid() and role = 'super_admin'
  );
end;
$$ language plpgsql security definer;

-- Policy ให้อ่านได้เฉพาะ admin และ super admin
create policy "Admins can view admins" on public.admins
  for select using ( auth.uid() in (select id from public.admins) );

-- Policy ให้แก้ไข/ลบ/เพิ่ม ได้เฉพาะ Super Admin
create policy "Super Admins can manage admins" on public.admins
  for all using ( public.is_super_admin() );
```

## การจัดการผ่าน Frontend (React/Vite)
เมื่อ Agent ต้องเขียนโค้ดสำหรับจัดการ Admin ใน Frontend ให้ปฏิบัติตามแนวทางนี้:

1. **การตรวจสอบสิทธิ์ (Authorization):**
   ดึงข้อมูล user ปัจจุบันจาก `supabase.auth.getUser()` และตรวจสอบในตาราง `admins` ว่ามี `role === 'super_admin'` หรือไม่ ก่อนที่จะแสดง UI สำหรับเพิ่ม/ลบ Admin

2. **การเพิ่ม Admin ใหม่:**
   - วิธีที่ง่ายที่สุดคือให้คนนั้นสมัครสมาชิก (Sign up) เข้ามาก่อน แล้ว Super Admin ค่อยเพิ่มอีเมลนั้นลงตาราง `admins` 
   - หรือใช้ Edge Function ของ Supabase เพื่อเรียกใช้ `supabase.auth.admin.inviteUserByEmail()`

3. **กฎการแก้ไขโค้ด:**
   - ซ่อนปุ่มหรือเมนู "จัดการ Admin" หากผู้ใช้ปัจจุบันไม่ใช่ Super Admin (`mackung112@gmail.com`)
   - แจ้งเตือนผู้ใช้ (Toast) ทุกครั้งที่การดำเนินการสำเร็จหรือล้มเหลว
   - ใช้ UI Component จาก Design System ของโปรเจกต์เสมอ

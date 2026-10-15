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

-- ฟังก์ชันเปลี่ยนรหัสผ่านผู้ใช้โดย Super Admin (bcrypt hash)
create or replace function public.admin_change_user_password(
  target_user_id uuid,
  new_password text
)
returns void
language plpgsql
security definer
set search_path = public, auth, extensions
as $$
begin
  -- 1. ตรวจสอบสิทธิ์ผู้เรียก: ต้องเป็น Super Admin เท่านั้น
  if not public.is_super_admin() then
    raise exception 'ไม่มีสิทธิ์ดำเนินการ: เฉพาะ Super Admin เท่านั้นที่สามารถเปลี่ยนรหัสผ่านได้';
  end if;

  -- 2. ตรวจสอบความยาวรหัสผ่าน
  if length(new_password) < 6 then
    raise exception 'รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร';
  end if;

  -- 3. อัปเดตและเข้ารหัสรหัสผ่านด้วย bcrypt (crypt + gen_salt('bf'))
  -- และยืนยันอีเมลให้อัตโนมัติ (email_confirmed_at) ป้องกันปัญหาติดค้างสถานะยังไม่ยืนยัน
  update auth.users
  set 
    encrypted_password = extensions.crypt(new_password, extensions.gen_salt('bf')),
    email_confirmed_at = coalesce(email_confirmed_at, now()),
    updated_at = now()
  where id = target_user_id;

  -- 4. ตรวจสอบว่าพบผู้ใช้หรือไม่
  if not found then
    raise exception 'ไม่พบบัญชีผู้ใช้นี้ในระบบ';
  end if;
end;
$$;

grant execute on function public.admin_change_user_password(uuid, text) to authenticated;

-- ฟังก์ชันสร้างบัญชีผู้ใช้/แอดมินใหม่โดย Super Admin (Bypass email signup restrictions)
create or replace function public.admin_create_user(
  new_email text,
  new_password text,
  new_first_name text,
  new_role text default 'admin'
)
returns jsonb
language plpgsql
security definer
set search_path = public, auth, extensions
as $$
declare
  new_user_id uuid := gen_random_uuid();
  encrypted_pw text;
begin
  if not public.is_super_admin() then
    raise exception 'ไม่มีสิทธิ์ดำเนินการ: เฉพาะ Super Admin เท่านั้นที่สามารถสร้างผู้ดูแลระบบได้';
  end if;

  if length(new_password) < 6 then
    raise exception 'รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร';
  end if;

  new_email := lower(trim(new_email));
  new_first_name := trim(new_first_name);

  if exists (select 1 from auth.users where email = new_email) then
    raise exception 'อีเมลนี้มีอยู่ในระบบแล้ว';
  end if;

  encrypted_pw := extensions.crypt(new_password, extensions.gen_salt('bf'));

  insert into auth.users (
    instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
    raw_app_meta_data, raw_user_meta_data, created_at, updated_at
  ) values (
    '00000000-0000-0000-0000-000000000000',
    new_user_id, 'authenticated', 'authenticated', new_email, encrypted_pw, now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    jsonb_build_object('first_name', new_first_name), now(), now()
  );

  insert into auth.identities (
    id, user_id, identity_data, provider, provider_id, last_sign_in_at, created_at, updated_at
  ) values (
    new_user_id::text, new_user_id,
    jsonb_build_object('sub', new_user_id::text, 'email', new_email),
    'email', new_user_id::text, now(), now(), now()
  );

  insert into public.admins (id, email, first_name, role, created_at)
  values (new_user_id, new_email, new_first_name, new_role, now());

  return jsonb_build_object('id', new_user_id, 'email', new_email, 'first_name', new_first_name, 'role', new_role);
end;
$$;

grant execute on function public.admin_create_user(text, text, text, text) to authenticated;
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

-- ==============================================================================
-- ฟังก์ชันสำหรับ Super Admin ในการสร้างบัญชีผู้ดูแลระบบ (Admin / Teacher)
-- ป้องกันปัญหา "Email signups are disabled" และยืนยันอีเมลให้อัตโนมัติทันที
-- ==============================================================================

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
  -- 1. ตรวจสอบสิทธิ์ผู้เรียก: ต้องเป็น Super Admin เท่านั้น
  if not public.is_super_admin() then
    raise exception 'ไม่มีสิทธิ์ดำเนินการ: เฉพาะ Super Admin เท่านั้นที่สามารถสร้างผู้ดูแลระบบได้';
  end if;

  -- 2. ตรวจสอบความถูกต้องของข้อมูล
  if length(new_password) < 6 then
    raise exception 'รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร';
  end if;

  new_email := lower(trim(new_email));
  new_first_name := trim(new_first_name);

  if exists (select 1 from auth.users where email = new_email) then
    raise exception 'อีเมลนี้มีอยู่ในระบบแล้ว';
  end if;

  -- 3. เข้ารหัสผ่านด้วย bcrypt
  encrypted_pw := extensions.crypt(new_password, extensions.gen_salt('bf'));

  -- 4. บันทึกผู้ใช้ใหม่ลงใน auth.users (ยืนยันอีเมล email_confirmed_at ทันที)
  insert into auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at
  ) values (
    '00000000-0000-0000-0000-000000000000',
    new_user_id,
    'authenticated',
    'authenticated',
    new_email,
    encrypted_pw,
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    jsonb_build_object('first_name', new_first_name),
    now(),
    now()
  );

  -- 5. บันทึกข้อมูล identity ลงใน auth.identities
  insert into auth.identities (
    id,
    user_id,
    identity_data,
    provider,
    provider_id,
    last_sign_in_at,
    created_at,
    updated_at
  ) values (
    new_user_id::text,
    new_user_id,
    jsonb_build_object('sub', new_user_id::text, 'email', new_email),
    'email',
    new_user_id::text,
    now(),
    now(),
    now()
  );

  -- 6. บันทึกสิทธิ์ลงใน public.admins
  insert into public.admins (
    id,
    email,
    first_name,
    role,
    created_at
  ) values (
    new_user_id,
    new_email,
    new_first_name,
    new_role,
    now()
  );

  return jsonb_build_object(
    'id', new_user_id,
    'email', new_email,
    'first_name', new_first_name,
    'role', new_role
  );
end;
$$;

-- ให้สิทธิ์ authenticated user เรียกใช้งานฟังก์ชันนี้ได้
grant execute on function public.admin_create_user(text, text, text, text) to authenticated;

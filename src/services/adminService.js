import { supabase } from '../lib/supabase';

export const getAdmins = async () => {
  const { data, error } = await supabase
    .from('admins')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const createAdmin = async (authClient, newEmail, newPassword, newFirstName, newRole) => {
  const sanitizedEmail = newEmail.trim().toLowerCase();
  const sanitizedName = newFirstName.trim();

  // 1. Try creating user via PostgreSQL RPC function (admin_create_user)
  // This bypasses "Email signups are disabled" and auto-confirms email directly.
  try {
    const { data: rpcData, error: rpcError } = await supabase.rpc('admin_create_user', {
      new_email: sanitizedEmail,
      new_password: newPassword,
      new_first_name: sanitizedName,
      new_role: newRole
    });

    if (!rpcError && rpcData) {
      return rpcData;
    }

    // If RPC failed due to user-specific error (like email duplicate or validation), throw it directly
    if (rpcError && rpcError.message && !rpcError.message.includes('Could not find the function') && !rpcError.code?.includes('PGRST202')) {
      throw rpcError;
    }
  } catch (rpcErr) {
    if (!rpcErr.message?.includes('Could not find the function') && !rpcErr.code?.includes('PGRST202')) {
      throw rpcErr;
    }
    // If function doesn't exist yet, fallback to authClient.auth.signUp
    console.warn('admin_create_user RPC not found in Supabase, falling back to client signUp...');
  }

  // 2. Fallback to authClient.auth.signUp
  const { data: authData, error: authError } = await authClient.auth.signUp({
    email: sanitizedEmail,
    password: newPassword,
    options: {
      data: {
        first_name: sanitizedName,
      }
    }
  });

  if (authError) {
    if (authError.message?.toLowerCase().includes('already registered')) {
      throw new Error('อีเมลนี้มีอยู่ในระบบแล้ว');
    }
    if (authError.message?.includes('disabled') || authError.code === 'email_provider_disabled') {
      throw new Error('ระบบ Supabase ปิดรับการสมัครสมาชิก (Email Signups Disabled) กรุณาติดตั้งฟังก์ชัน admin_create_user ใน Supabase SQL Editor หรือเปิด Allow new users to sign up ใน Supabase Dashboard');
    }
    throw authError;
  }

  if (authData?.user) {
    const { error: insertError } = await supabase.from('admins').insert([{
      id: authData.user.id,
      email: sanitizedEmail,
      first_name: sanitizedName,
      role: newRole
    }]);

    if (insertError) throw insertError;
    return authData.user;
  }
};

export const updateAdmin = async (id, first_name, role) => {
  const { error } = await supabase
    .from('admins')
    .update({ first_name, role })
    .eq('id', id);

  if (error) throw error;
};

export const deleteAdmin = async (id) => {
  const { error } = await supabase
    .from('admins')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

export const changeAdminPassword = async (targetUserId, newPassword) => {
  const { data, error } = await supabase.rpc('admin_change_user_password', {
    target_user_id: targetUserId,
    new_password: newPassword
  });

  if (error) throw error;
  return data;
};

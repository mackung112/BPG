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
  const { data: authData, error: authError } = await authClient.auth.signUp({
    email: newEmail,
    password: newPassword,
    options: {
      data: {
        first_name: newFirstName,
      }
    }
  });

  if (authError) {
    if (authError.message.includes('already registered')) {
      throw new Error('อีเมลนี้มีอยู่ในระบบแล้ว');
    }
    throw authError;
  }

  if (authData?.user) {
    const { error: insertError } = await supabase.from('admins').insert([{
      id: authData.user.id,
      email: newEmail,
      first_name: newFirstName,
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

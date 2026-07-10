import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { createClient } from '@supabase/supabase-js';
import { ShieldAlert, Trash2, ShieldCheck, Mail, Lock } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

// Create a secondary client just for creating users so it doesn't log the current admin out
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const authClient = createClient(supabaseUrl, supabaseAnonKey, { 
  auth: { 
    persistSession: false, 
    autoRefreshToken: false,
    storageKey: 'supabase.admin_creation.token'
  } 
});

export default function AdminManagement() {
  const { isSuperAdmin } = useAuth();
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newFirstName, setNewFirstName] = useState('');
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    if (isSuperAdmin) {
      fetchAdmins();
    }
  }, [isSuperAdmin]);

  const fetchAdmins = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('admins').select('*').order('created_at', { ascending: false });
    if (!error && data) {
      setAdmins(data);
    }
    setLoading(false);
  };

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    if (!newEmail || !newPassword || !newFirstName) return;
    setCreating(true);

    try {
      // 1. Sign up the user (this might require email confirmation depending on Supabase settings)
      // Note: In a real production environment with email confirmation ON, the admin must verify their email.
      // If email confirmation is OFF, this creates the user immediately.
      const { data: authData, error: authError } = await authClient.auth.signUp({
        email: newEmail,
        password: newPassword,
      });

      if (authError) {
        if (authError.message.includes('already registered')) {
          throw new Error('อีเมลนี้มีอยู่ในระบบแล้ว');
        }
        throw authError;
      }

      if (authData?.user) {
        // 2. Insert into admins table
        const { error: insertError } = await supabase.from('admins').insert([{
          id: authData.user.id,
          email: newEmail,
          first_name: newFirstName,
          role: 'admin'
        }]);

        if (insertError) throw insertError;
        
        alert('สร้างบัญชีผู้สอนสำเร็จ!');
        setNewEmail(''); setNewPassword(''); setNewFirstName('');
        fetchAdmins();
      }
    } catch (err) {
      alert('เกิดข้อผิดพลาด: ' + err.message);
    }
    setCreating(false);
  };

  const handleDeleteAdmin = async (id, role) => {
    if (role === 'super_admin') {
      alert('ไม่สามารถลบ Super Admin ได้');
      return;
    }
    if (!confirm('ยืนยันการลบผู้สอนท่านนี้ (การลบที่นี่จะไม่ลบบัญชีใน auth.users แต่จะลบสิทธิ์ admin ออกไป)?')) return;

    const { error } = await supabase.from('admins').delete().eq('id', id);
    if (!error) {
      fetchAdmins();
    } else {
      alert('เกิดข้อผิดพลาด: ' + error.message);
    }
  };

  if (!isSuperAdmin) {
    return <div className="p-8 text-center text-red-500 font-bold">ไม่มีสิทธิ์เข้าถึงหน้านี้</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
          <ShieldAlert className="w-8 h-8 text-rose-600" /> จัดการแอดมิน (Super Admin Only)
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-rose-100/50 lg:col-span-1">
          <h2 className="text-lg font-bold flex items-center gap-2 mb-4 text-rose-600">
            <ShieldCheck className="w-5 h-5" /> สร้างบัญชีผู้สอนใหม่
          </h2>
          <form onSubmit={handleCreateAdmin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">ชื่อผู้สอน</label>
              <input required value={newFirstName} onChange={e=>setNewFirstName(e.target.value)} type="text" className="w-full px-3 py-2 border rounded-lg" placeholder="เช่น ครูสมชาย" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">อีเมล</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
                <input required value={newEmail} onChange={e=>setNewEmail(e.target.value)} type="email" className="w-full pl-9 pr-3 py-2 border rounded-lg" placeholder="email@example.com" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">รหัสผ่าน (ขั้นต่ำ 6 ตัว)</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
                <input required minLength={6} value={newPassword} onChange={e=>setNewPassword(e.target.value)} type="password" className="w-full pl-9 pr-3 py-2 border rounded-lg" placeholder="••••••••" />
              </div>
            </div>
            <button disabled={creating} type="submit" className="w-full bg-rose-600 text-white font-bold py-2 rounded-lg hover:bg-rose-700 disabled:opacity-50">
              {creating ? 'กำลังสร้าง...' : 'สร้างบัญชี'}
            </button>
            <p className="text-xs text-gray-400 mt-2 text-center">หากระบบตั้งค่า Confirm Email ไว้ ผู้สอนต้องกดยืนยันอีเมลก่อนเข้าใช้งาน</p>
          </form>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 lg:col-span-2 overflow-hidden">
          <div className="p-4 border-b border-gray-100 bg-gray-50">
            <h2 className="font-bold text-gray-700">รายชื่อผู้ดูแลระบบทั้งหมด</h2>
          </div>
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-3 border-b">ชื่อผู้สอน</th>
                <th className="px-4 py-3 border-b">อีเมล</th>
                <th className="px-4 py-3 border-b">ระดับสิทธิ์</th>
                <th className="px-4 py-3 border-b text-right">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr><td colSpan="4" className="text-center py-8 text-gray-500">กำลังโหลด...</td></tr>
              ) : (
                admins.map(a => (
                  <tr key={a.id} className="hover:bg-gray-50/50">
                    <td className="px-4 py-3 font-medium text-gray-900">{a.first_name || '-'}</td>
                    <td className="px-4 py-3 text-gray-600">{a.email}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-md font-medium text-xs ${a.role === 'super_admin' ? 'bg-rose-100 text-rose-700' : 'bg-indigo-100 text-indigo-700'}`}>
                        {a.role === 'super_admin' ? 'Super Admin' : 'Admin'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      {a.role !== 'super_admin' && (
                        <button onClick={() => handleDeleteAdmin(a.id, a.role)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

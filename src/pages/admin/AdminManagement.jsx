import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { createClient } from '@supabase/supabase-js';
import { 
  ShieldAlert, 
  Trash2, 
  ShieldCheck, 
  Mail, 
  Lock, 
  User, 
  Pencil, 
  Search, 
  Plus, 
  X, 
  Check, 
  Crown, 
  Shield, 
  AlertCircle,
  RefreshCw,
  Key,
  Eye,
  EyeOff
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

// Create a secondary client just for creating users so it doesn't log the current admin out
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder_key';
const authClient = createClient(supabaseUrl, supabaseAnonKey, { 
  auth: { 
    persistSession: false, 
    autoRefreshToken: false,
    storageKey: 'supabase.admin_creation.token'
  } 
});

export default function AdminManagement() {
  const { user, isSuperAdmin } = useAuth();
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  // Create Modal State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newFirstName, setNewFirstName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRole, setNewRole] = useState('admin');
  const [creating, setCreating] = useState(false);

  // Edit Modal State
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [editFirstName, setEditFirstName] = useState('');
  const [editRole, setEditRole] = useState('admin');
  const [updating, setUpdating] = useState(false);

  // Change Password Modal State (Super Admin)
  const [passwordModalAdmin, setPasswordModalAdmin] = useState(null);
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [confirmAdminPassword, setConfirmAdminPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  // Delete Confirm State
  const [deletingAdmin, setDeletingAdmin] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Toast Notification
  const [toast, setToast] = useState(null);

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  useEffect(() => {
    if (isSuperAdmin) {
      fetchAdmins();
    }
  }, [isSuperAdmin]);

  const fetchAdmins = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('admins')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setAdmins(data);
    } else if (error) {
      showToast('error', 'โหลดข้อมูลไม่สำเร็จ: ' + error.message);
    }
    setLoading(false);
  };

  // 1. Create Admin
  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    if (!newEmail || !newPassword || !newFirstName) {
      showToast('error', 'กรุณากรอกข้อมูลให้ครบทุกช่อง');
      return;
    }
    setCreating(true);

    try {
      // 1.1 Sign up the user with secondary client
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
        // 1.2 Insert into admins table
        const { error: insertError } = await supabase.from('admins').insert([{
          id: authData.user.id,
          email: newEmail,
          first_name: newFirstName,
          role: newRole
        }]);

        if (insertError) throw insertError;
        
        showToast('success', `สร้างบัญชี "${newFirstName}" (${newRole === 'super_admin' ? 'Super Admin' : 'Admin'}) สำเร็จ!`);
        setNewEmail(''); 
        setNewPassword(''); 
        setNewFirstName('');
        setNewRole('admin');
        setIsCreateModalOpen(false);
        fetchAdmins();
      }
    } catch (err) {
      showToast('error', 'เกิดข้อผิดพลาด: ' + err.message);
    } finally {
      setCreating(false);
    }
  };

  // 2. Open Edit Modal
  const handleOpenEdit = (admin) => {
    setEditingAdmin(admin);
    setEditFirstName(admin.first_name || '');
    setEditRole(admin.role || 'admin');
  };

  // 2.1 Update Admin
  const handleUpdateAdmin = async (e) => {
    e.preventDefault();
    if (!editingAdmin) return;
    if (!editFirstName.trim()) {
      showToast('error', 'กรุณากรอกชื่อผู้สอน');
      return;
    }

    setUpdating(true);
    try {
      const { error } = await supabase
        .from('admins')
        .update({
          first_name: editFirstName.trim(),
          role: editRole
        })
        .eq('id', editingAdmin.id);

      if (error) throw error;

      showToast('success', `อัปเดตข้อมูล "${editFirstName}" สำเร็จ!`);
      setEditingAdmin(null);
      fetchAdmins();
    } catch (err) {
      showToast('error', 'เกิดข้อผิดพลาดในการแก้ไข: ' + err.message);
    } finally {
      setUpdating(false);
    }
  };

  // 3. Delete Admin
  const handleConfirmDelete = async () => {
    if (!deletingAdmin) return;

    if (deletingAdmin.id === user?.id) {
      showToast('error', 'ไม่สามารถลบบัญชีของตัวเองได้');
      setDeletingAdmin(null);
      return;
    }

    setDeleting(true);
    try {
      const { error } = await supabase
        .from('admins')
        .delete()
        .eq('id', deletingAdmin.id);

      if (error) throw error;

      showToast('success', `ลบสิทธิ์แอดมิน "${deletingAdmin.first_name || deletingAdmin.email}" สำเร็จ!`);
      setDeletingAdmin(null);
      fetchAdmins();
    } catch (err) {
      showToast('error', 'เกิดข้อผิดพลาดในการลบ: ' + err.message);
    } finally {
      setDeleting(false);
    }
  };

  // 4. Change Password (Super Admin Only)
  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!passwordModalAdmin) return;
    if (!newAdminPassword || newAdminPassword.length < 6) {
      showToast('error', 'รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร');
      return;
    }
    if (newAdminPassword !== confirmAdminPassword) {
      showToast('error', 'รหัสผ่านทั้งสองช่องไม่ตรงกัน');
      return;
    }

    setChangingPassword(true);
    try {
      const { data, error } = await supabase.rpc('admin_change_user_password', {
        target_user_id: passwordModalAdmin.id,
        new_password: newAdminPassword
      });

      if (error) throw error;

      showToast('success', `เปลี่ยนรหัสผ่านสำหรับ "${passwordModalAdmin.first_name || passwordModalAdmin.email}" สำเร็จแล้ว!`);
      setPasswordModalAdmin(null);
      setNewAdminPassword('');
      setConfirmAdminPassword('');
    } catch (err) {
      showToast('error', 'เปลี่ยนรหัสผ่านไม่สำเร็จ: ' + err.message);
    } finally {
      setChangingPassword(false);
    }
  };

  if (!isSuperAdmin) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-8 max-w-md text-center">
          <ShieldAlert className="w-12 h-12 text-rose-600 mx-auto mb-3" />
          <h2 className="text-xl font-bold text-rose-900 mb-2">ไม่มีสิทธิ์เข้าถึงหน้านี้</h2>
          <p className="text-sm text-rose-700 leading-relaxed">
            หน้านี้สงวนสิทธิ์เฉพาะ **Super Admin** เท่านั้น กรุณาเข้าสู่ระบบด้วยบัญชีผู้ดูแลระบบสูงสุด
          </p>
        </div>
      </div>
    );
  }

  // Filter admins
  const filteredAdmins = admins.filter(admin => {
    const matchesSearch = 
      (admin.first_name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (admin.email || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || admin.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const superAdminCount = admins.filter(a => a.role === 'super_admin').length;
  const adminCount = admins.filter(a => a.role === 'admin').length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-2xl backdrop-blur-md border transition-all duration-300 ${
          toast.type === 'success' 
            ? 'bg-emerald-900/90 border-emerald-500/40 text-emerald-100 shadow-emerald-950/20' 
            : 'bg-rose-900/90 border-rose-500/40 text-rose-100 shadow-rose-950/20'
        }`}>
          {toast.type === 'success' ? <Check className="w-5 h-5 text-emerald-400 shrink-0" /> : <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />}
          <span className="text-sm font-medium">{toast.message}</span>
          <button onClick={() => setToast(null)} className="ml-2 hover:opacity-75">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/80 backdrop-blur-xl p-6 rounded-2xl border border-zinc-200/80 shadow-sm">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-rose-500 to-indigo-600 rounded-xl text-white shadow-md shadow-rose-500/20">
              <Crown className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">
                จัดการผู้ดูแลระบบ (Super Admin)
              </h1>
              <p className="text-sm text-zinc-500 mt-0.5">
                ควบคุมสิทธิ์ สร้าง ลบ และแก้ไขข้อมูลผู้สอนและแอดมินทั้งหมดในระบบ
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchAdmins}
            disabled={loading}
            className="p-2.5 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-xl transition-all border border-zinc-200 cursor-pointer"
            title="รีเฟรชข้อมูล"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-md shadow-indigo-600/20 hover:scale-[1.02] active:scale-98 transition-all cursor-pointer"
          >
            <Plus className="w-5 h-5" />
            <span>สร้างแอดมินใหม่</span>
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-zinc-200/80 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-zinc-900">{admins.length}</div>
            <div className="text-xs font-medium text-zinc-500">ผู้ดูแลระบบทั้งหมด</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-zinc-200/80 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-rose-50 text-rose-600 rounded-xl">
            <Crown className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-zinc-900">{superAdminCount}</div>
            <div className="text-xs font-medium text-zinc-500">Super Admin (สูงสุด)</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-zinc-200/80 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-sky-50 text-sky-600 rounded-xl">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-zinc-900">{adminCount}</div>
            <div className="text-xs font-medium text-zinc-500">Admin (ผู้สอนทั่วไป)</div>
          </div>
        </div>
      </div>

      {/* Table & Controls Section */}
      <div className="bg-white rounded-2xl border border-zinc-200/80 shadow-sm overflow-hidden">
        {/* Filter bar */}
        <div className="p-4 border-b border-zinc-100 flex flex-col sm:flex-row gap-3 items-center justify-between bg-zinc-50/50">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ค้นหาตามชื่อ หรือ อีเมล..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-zinc-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setRoleFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                roleFilter === 'all' 
                  ? 'bg-zinc-900 text-white shadow-sm' 
                  : 'bg-white text-zinc-600 hover:bg-zinc-100 border border-zinc-200'
              }`}
            >
              ทั้งหมด ({admins.length})
            </button>
            <button
              onClick={() => setRoleFilter('super_admin')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                roleFilter === 'super_admin' 
                  ? 'bg-rose-600 text-white shadow-sm' 
                  : 'bg-white text-zinc-600 hover:bg-zinc-100 border border-zinc-200'
              }`}
            >
              Super Admin ({superAdminCount})
            </button>
            <button
              onClick={() => setRoleFilter('admin')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                roleFilter === 'admin' 
                  ? 'bg-indigo-600 text-white shadow-sm' 
                  : 'bg-white text-zinc-600 hover:bg-zinc-100 border border-zinc-200'
              }`}
            >
              Admin ({adminCount})
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-100 bg-zinc-50/80 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                <th className="px-6 py-4">ชื่อผู้สอน / แอดมิน</th>
                <th className="px-6 py-4">อีเมลใช้งาน</th>
                <th className="px-6 py-4">ระดับสิทธิ์</th>
                <th className="px-6 py-4">วันที่เพิ่มในระบบ</th>
                <th className="px-6 py-4 text-right">การจัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 text-sm">
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center py-12 text-zinc-400">
                    <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-indigo-500" />
                    กำลังโหลดข้อมูลผู้ดูแลระบบ...
                  </td>
                </tr>
              ) : filteredAdmins.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-12 text-zinc-400">
                    <User className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    ไม่พบข้อมูลผู้ดูแลระบบที่ค้นหา
                  </td>
                </tr>
              ) : (
                filteredAdmins.map((admin) => {
                  const isCurrentSuper = admin.role === 'super_admin';
                  const isSelf = admin.id === user?.id;

                  return (
                    <tr key={admin.id} className="hover:bg-indigo-50/30 transition-colors">
                      <td className="px-6 py-4 font-semibold text-zinc-900 flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm ${
                          isCurrentSuper 
                            ? 'bg-rose-100 text-rose-700 border border-rose-200' 
                            : 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                        }`}>
                          {admin.first_name ? admin.first_name.charAt(0).toUpperCase() : 'A'}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span>{admin.first_name || 'ไม่ระบุชื่อ'}</span>
                            {isSelf && (
                              <span className="text-[11px] bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded-full font-medium border border-zinc-200">
                                บัญชีปัจจุบัน
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-zinc-600 font-mono text-xs">
                        <div className="flex items-center gap-2">
                          <Mail className="w-3.5 h-3.5 text-zinc-400" />
                          <span>{admin.email}</span>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        {isCurrentSuper ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-100/80 text-rose-700 border border-rose-200/80 shadow-xs">
                            <Crown className="w-3.5 h-3.5 text-rose-600" />
                            Super Admin
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-100/80 text-indigo-700 border border-indigo-200/80 shadow-xs">
                            <Shield className="w-3.5 h-3.5 text-indigo-600" />
                            Admin
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4 text-zinc-500 text-xs">
                        {admin.created_at 
                          ? new Date(admin.created_at).toLocaleDateString('th-TH', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })
                          : '-'
                        }
                      </td>

                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Change Password Button (Super Admin) */}
                          <button
                            onClick={() => {
                              setPasswordModalAdmin(admin);
                              setNewAdminPassword('');
                              setConfirmAdminPassword('');
                              setShowPassword(false);
                            }}
                            className="p-2 text-zinc-600 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all cursor-pointer"
                            title="เปลี่ยนรหัสผ่านให้ผู้ใช้นี้"
                          >
                            <Key className="w-4 h-4" />
                          </button>

                          {/* Edit Button */}
                          <button
                            onClick={() => handleOpenEdit(admin)}
                            className="p-2 text-zinc-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all cursor-pointer"
                            title="แก้ไขข้อมูล"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>

                          {/* Delete Button */}
                          <button
                            onClick={() => setDeletingAdmin(admin)}
                            disabled={isSelf}
                            className={`p-2 rounded-lg transition-all ${
                              isSelf 
                                ? 'opacity-30 cursor-not-allowed text-zinc-400' 
                                : 'text-zinc-600 hover:text-rose-600 hover:bg-rose-50 cursor-pointer'
                            }`}
                            title={isSelf ? 'ไม่สามารถลบบัญชีตัวเองได้' : 'ลบสิทธิ์แอดมิน'}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE ADMIN MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-zinc-100 space-y-5 animate-scale-up">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-rose-50 text-rose-600 rounded-xl">
                  <Plus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-zinc-900">สร้างบัญชีผู้ดูแลใหม่</h3>
                  <p className="text-xs text-zinc-500">กรอกข้อมูลผู้สอนเพื่อเพิ่มสิทธิ์ในระบบ</p>
                </div>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-2 text-zinc-400 hover:text-zinc-600 rounded-xl hover:bg-zinc-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateAdmin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1.5">ชื่อ-นามสกุล / ชื่อผู้สอน</label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-3 text-zinc-400" />
                  <input
                    required
                    value={newFirstName}
                    onChange={(e) => setNewFirstName(e.target.value)}
                    type="text"
                    className="w-full pl-10 pr-4 py-2.5 text-sm border border-zinc-200 rounded-xl focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition-all"
                    placeholder="เช่น ครูสมชาย ใจดี"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1.5">อีเมลสำหรับเข้าสู่ระบบ</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-3 text-zinc-400" />
                  <input
                    required
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    type="email"
                    className="w-full pl-10 pr-4 py-2.5 text-sm border border-zinc-200 rounded-xl focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition-all"
                    placeholder="teacher@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1.5">รหัสผ่านเริ่มต้น (ขั้นต่ำ 6 ตัวอักษร)</label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-3 text-zinc-400" />
                  <input
                    required
                    minLength={6}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    type="password"
                    className="w-full pl-10 pr-4 py-2.5 text-sm border border-zinc-200 rounded-xl focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1.5">เลือกระดับสิทธิ์</label>
                <div className="grid grid-cols-2 gap-3">
                  <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                    newRole === 'admin' 
                      ? 'border-indigo-500 bg-indigo-50/50 text-indigo-900 font-semibold' 
                      : 'border-zinc-200 hover:bg-zinc-50 text-zinc-600'
                  }`}>
                    <input
                      type="radio"
                      name="newRole"
                      value="admin"
                      checked={newRole === 'admin'}
                      onChange={() => setNewRole('admin')}
                      className="text-indigo-600 focus:ring-indigo-500"
                    />
                    <div className="text-xs">
                      <div className="font-bold">Admin</div>
                      <div className="text-[11px] text-zinc-500">ผู้สอน / คุมสอบ</div>
                    </div>
                  </label>

                  <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                    newRole === 'super_admin' 
                      ? 'border-rose-500 bg-rose-50/50 text-rose-900 font-semibold' 
                      : 'border-zinc-200 hover:bg-zinc-50 text-zinc-600'
                  }`}>
                    <input
                      type="radio"
                      name="newRole"
                      value="super_admin"
                      checked={newRole === 'super_admin'}
                      onChange={() => setNewRole('super_admin')}
                      className="text-rose-600 focus:ring-rose-500"
                    />
                    <div className="text-xs">
                      <div className="font-bold">Super Admin</div>
                      <div className="text-[11px] text-zinc-500">สิทธิ์สูงสุด</div>
                    </div>
                  </label>
                </div>
              </div>

              <div className="pt-3 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="flex-1 py-2.5 border border-zinc-200 text-zinc-700 font-semibold rounded-xl hover:bg-zinc-50 transition-colors"
                >
                  ยกเลิก
                </button>
                <button
                  disabled={creating}
                  type="submit"
                  className="flex-1 py-2.5 bg-gradient-to-r from-rose-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-rose-700 hover:to-indigo-700 disabled:opacity-50 shadow-md transition-all cursor-pointer"
                >
                  {creating ? 'กำลังสร้าง...' : 'ยืนยันสร้างบัญชี'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT ADMIN MODAL */}
      {editingAdmin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-zinc-100 space-y-5 animate-scale-up">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
                  <Pencil className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-zinc-900">แก้ไขข้อมูลผู้ดูแลระบบ</h3>
                  <p className="text-xs text-zinc-500">แก้ไขชื่อหรือปรับระดับสิทธิ์การใช้งาน</p>
                </div>
              </div>
              <button
                onClick={() => setEditingAdmin(null)}
                className="p-2 text-zinc-400 hover:text-zinc-600 rounded-xl hover:bg-zinc-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateAdmin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1.5">อีเมล (ไม่สามารถเปลี่ยนได้)</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-3 text-zinc-400" />
                  <input
                    disabled
                    value={editingAdmin.email}
                    type="email"
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-zinc-100/70 border border-zinc-200 rounded-xl text-zinc-500 cursor-not-allowed font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1.5">ชื่อผู้สอน / ชื่อแอดมิน</label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-3 text-zinc-400" />
                  <input
                    required
                    value={editFirstName}
                    onChange={(e) => setEditFirstName(e.target.value)}
                    type="text"
                    className="w-full pl-10 pr-4 py-2.5 text-sm border border-zinc-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                    placeholder="ระบุชื่อผู้สอน"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1.5">ระดับสิทธิ์ (Role)</label>
                <div className="grid grid-cols-2 gap-3">
                  <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                    editRole === 'admin' 
                      ? 'border-indigo-500 bg-indigo-50/50 text-indigo-900 font-semibold' 
                      : 'border-zinc-200 hover:bg-zinc-50 text-zinc-600'
                  }`}>
                    <input
                      type="radio"
                      name="editRole"
                      value="admin"
                      checked={editRole === 'admin'}
                      onChange={() => setEditRole('admin')}
                      className="text-indigo-600 focus:ring-indigo-500"
                    />
                    <div className="text-xs">
                      <div className="font-bold">Admin</div>
                      <div className="text-[11px] text-zinc-500">ผู้สอน / คุมสอบ</div>
                    </div>
                  </label>

                  <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                    editRole === 'super_admin' 
                      ? 'border-rose-500 bg-rose-50/50 text-rose-900 font-semibold' 
                      : 'border-zinc-200 hover:bg-zinc-50 text-zinc-600'
                  }`}>
                    <input
                      type="radio"
                      name="editRole"
                      value="super_admin"
                      checked={editRole === 'super_admin'}
                      onChange={() => setEditRole('super_admin')}
                      className="text-rose-600 focus:ring-rose-500"
                    />
                    <div className="text-xs">
                      <div className="font-bold">Super Admin</div>
                      <div className="text-[11px] text-zinc-500">สิทธิ์สูงสุด</div>
                    </div>
                  </label>
                </div>
              </div>

              <div className="pt-3 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setEditingAdmin(null)}
                  className="flex-1 py-2.5 border border-zinc-200 text-zinc-700 font-semibold rounded-xl hover:bg-zinc-50 transition-colors"
                >
                  ยกเลิก
                </button>
                <button
                  disabled={updating}
                  type="submit"
                  className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl disabled:opacity-50 shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
                >
                  {updating ? 'กำลังบันทึก...' : 'บันทึกการแก้ไข'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CHANGE PASSWORD MODAL (SUPER ADMIN ONLY) */}
      {passwordModalAdmin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-zinc-100 space-y-5 animate-scale-up">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
                  <Key className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-zinc-900">เปลี่ยนรหัสผ่านผู้ใช้</h3>
                  <p className="text-xs text-zinc-500 font-mono">{passwordModalAdmin.email}</p>
                </div>
              </div>
              <button
                onClick={() => setPasswordModalAdmin(null)}
                className="p-2 text-zinc-400 hover:text-zinc-600 rounded-xl hover:bg-zinc-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-amber-50/70 border border-amber-200 p-3 rounded-2xl text-xs text-amber-900 leading-relaxed">
              🔑 <strong>สิทธิ์ Super Admin:</strong> คุณสามารถตั้งรหัสผ่านใหม่ให้กับ <strong>{passwordModalAdmin.first_name || passwordModalAdmin.email}</strong> ได้ทันที โดยไม่ต้องใช้รหัสผ่านเดิม
            </div>

            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1.5">รหัสผ่านใหม่ (อย่างน้อย 6 ตัวอักษร) *</label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-3 text-zinc-400" />
                  <input
                    required
                    type={showPassword ? 'text' : 'password'}
                    value={newAdminPassword}
                    onChange={(e) => setNewAdminPassword(e.target.value)}
                    minLength={6}
                    className="w-full pl-10 pr-10 py-2.5 text-sm border border-zinc-200 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all font-mono"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-zinc-400 hover:text-zinc-600 p-0.5"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1.5">ยืนยันรหัสผ่านใหม่อีกครั้ง *</label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-3 text-zinc-400" />
                  <input
                    required
                    type={showPassword ? 'text' : 'password'}
                    value={confirmAdminPassword}
                    onChange={(e) => setConfirmAdminPassword(e.target.value)}
                    minLength={6}
                    className="w-full pl-10 pr-4 py-2.5 text-sm border border-zinc-200 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all font-mono"
                    placeholder="••••••••"
                  />
                </div>
                {newAdminPassword && confirmAdminPassword && newAdminPassword !== confirmAdminPassword && (
                  <p className="text-xs text-rose-600 font-medium mt-1">⚠️ รหัสผ่านทั้งสองช่องไม่ตรงกัน</p>
                )}
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setPasswordModalAdmin(null)}
                  className="flex-1 py-2.5 border border-zinc-200 text-zinc-700 font-semibold rounded-xl hover:bg-zinc-50 transition-colors cursor-pointer"
                >
                  ยกเลิก
                </button>
                <button
                  disabled={changingPassword || (newAdminPassword && confirmAdminPassword && newAdminPassword !== confirmAdminPassword)}
                  type="submit"
                  className="flex-1 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-xl disabled:opacity-50 shadow-md shadow-amber-600/20 transition-all cursor-pointer"
                >
                  {changingPassword ? 'กำลังเปลี่ยนรหัสผ่าน...' : 'บันทึกรหัสผ่านใหม่'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deletingAdmin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-zinc-100 space-y-5 animate-scale-up">
            <div className="p-3 bg-rose-100 text-rose-600 rounded-2xl w-fit">
              <Trash2 className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-zinc-900">ยืนยันการลบสิทธิ์ผู้ดูแลระบบ?</h3>
              <p className="text-sm text-zinc-600 mt-2 leading-relaxed">
                คุณกำลังจะลบสิทธิ์แอดมินของ <strong className="text-zinc-900 font-semibold">{deletingAdmin.first_name || deletingAdmin.email}</strong> ออกจากระบบ (ผู้ใช้นี้จะไม่สามารถเข้าถึงหน้า Admin ได้อีกต่อไป)
              </p>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setDeletingAdmin(null)}
                className="flex-1 py-2.5 border border-zinc-200 text-zinc-700 font-semibold rounded-xl hover:bg-zinc-50 transition-colors"
              >
                ยกเลิก
              </button>
              <button
                disabled={deleting}
                onClick={handleConfirmDelete}
                className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-xl disabled:opacity-50 shadow-md shadow-rose-600/20 transition-all cursor-pointer"
              >
                {deleting ? 'กำลังลบ...' : 'ยืนยันการลบ'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

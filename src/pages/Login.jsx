import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogIn, GraduationCap, Users, ArrowRight, Lock, Key, Mail } from 'lucide-react';

export default function Login() {
  const [activeTab, setActiveTab] = useState('student'); // 'student' or 'admin'
  const { loginStudent, loginAdmin, user, isAdmin, studentSession } = useAuth();
  const navigate = useNavigate();

  // Student Form State
  const [studentId, setStudentId] = useState('');
  const [secretCode, setSecretCode] = useState('');

  // Admin Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Auto-redirect if already logged in
  useEffect(() => {
    if (user && isAdmin) {
      navigate('/admin');
    } else if (studentSession) {
      navigate(`/exam-lobby/${studentSession.session_id}`);
    }
  }, [user, studentSession, navigate, isAdmin]);

  const handleStudentLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const sessionId = await loginStudent(studentId, secretCode);
      navigate(`/exam-lobby/${sessionId}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await loginAdmin(email, password);
      navigate('/admin');
    } catch (err) {
      setError('อีเมลหรือรหัสผ่านไม่ถูกต้อง');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-[-10%] left-[-10%] w-[45vw] h-[45vw] rounded-full bg-indigo-200/25 blur-[130px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[10%] w-[38vw] h-[38vw] rounded-full bg-rose-200/20 blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="max-w-md w-full bg-white/80 backdrop-blur-xl rounded-[32px] shadow-2xl border border-white/50 p-8 relative z-10">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200 mb-4 transform -rotate-3">
            <GraduationCap className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-purple-600 tracking-tight">
            เข้าสู่ระบบ
          </h1>
          <p className="text-gray-500 text-sm mt-2">ห้องเรียนครูแม็ค แพลตฟอร์มการเรียนรู้</p>
        </div>

        {/* Custom Tabs */}
        <div className="flex p-1 bg-gray-100 rounded-2xl mb-8 relative">
          <div
            className={`absolute top-1 bottom-1 left-1 w-[calc(50%-0.25rem)] bg-white rounded-xl shadow-sm transition-transform duration-300 ease-out ${
              activeTab === 'admin' ? 'translate-x-[calc(100%+0.125rem)]' : 'translate-x-0'
            }`}
          />
          <button
            onClick={() => { setActiveTab('student'); setError(null); }}
            className={`flex-1 py-3 text-sm font-bold flex items-center justify-center gap-2 relative z-10 transition-colors ${
              activeTab === 'student' ? 'text-indigo-700' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Users className="w-4 h-4" /> นักเรียนเข้าสอบ
          </button>
          <button
            onClick={() => { setActiveTab('admin'); setError(null); }}
            className={`flex-1 py-3 text-sm font-bold flex items-center justify-center gap-2 relative z-10 transition-colors ${
              activeTab === 'admin' ? 'text-indigo-700' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Lock className="w-4 h-4" /> ผู้สอน (Admin)
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl text-sm font-semibold text-red-600 flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
            {error}
          </div>
        )}

        {/* Student Form */}
        {activeTab === 'student' && (
          <form onSubmit={handleStudentLogin} className="space-y-5 animate-in fade-in slide-in-from-left-4">
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-700 pl-1">รหัสนักเรียน</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Users className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  required
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-medium"
                  placeholder="กรอกรหัสนักเรียนของคุณ"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-700 pl-1">รหัสลับสอบ (Secret Code)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Key className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  required
                  value={secretCode}
                  onChange={(e) => setSecretCode(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-medium"
                  placeholder="รับรหัสจากครูผู้สอน"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-4 px-4 border border-transparent rounded-2xl shadow-lg shadow-indigo-200 text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              {loading ? 'กำลังตรวจสอบ...' : 'เข้าสู่ห้องสอบ'} <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        )}

        {/* Admin Form */}
        {activeTab === 'admin' && (
          <form onSubmit={handleAdminLogin} className="space-y-5 animate-in fade-in slide-in-from-right-4">
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-700 pl-1">อีเมลผู้สอน</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-medium"
                  placeholder="admin@example.com"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-700 pl-1">รหัสผ่าน</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-medium"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-4 px-4 border border-transparent rounded-2xl shadow-lg shadow-gray-200 text-sm font-bold text-white bg-gray-900 hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-70 disabled:cursor-not-allowed transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ (Admin)'} <LogIn className="w-5 h-5" />
            </button>
          </form>
        )}
        
        <div className="mt-8 text-center text-xs text-gray-400 font-medium">
          ระบบการเรียนรู้และจัดการสอบ ห้องเรียนครูแม็ค
        </div>
      </div>
    </div>
  );
}

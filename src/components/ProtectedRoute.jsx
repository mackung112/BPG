import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Loader2 } from 'lucide-react';

export default function ProtectedRoute({ children, requireAdmin = false, requireSuperAdmin = false }) {
  const { user, isAdmin, isSuperAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4 text-indigo-600">
          <Loader2 className="w-10 h-10 animate-spin" />
          <p className="font-semibold text-gray-500">กำลังตรวจสอบสิทธิ์...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }

  if (requireSuperAdmin && !isSuperAdmin) {
    // Requires super admin, but user is not
    return <Navigate to="/admin" replace />;
  }

  if (requireAdmin && !isAdmin) {
    // Requires admin, but user is not
    return <Navigate to="/" replace />;
  }

  return children;
}

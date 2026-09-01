/**
 * LoadingFallback — Branded loading skeleton
 * แสดงทันทีขณะรอ React.lazy() โหลด chunk
 * ใช้ pure CSS — ไม่ต้องรอ dependency ใดๆ
 */
export default function LoadingFallback() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 flex flex-col items-center justify-center z-50">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200 animate-pulse">
          <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path d="M12 14l9-5-9-5-9 5 9 5z" />
            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
          </svg>
        </div>
        <span className="font-extrabold text-xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-purple-600 tracking-tight">
          ห้องเรียนครูแม็ค
        </span>
      </div>

      {/* Loading spinner */}
      <div className="relative w-10 h-10 mb-4">
        <div className="absolute inset-0 rounded-full border-[3px] border-indigo-100" />
        <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-indigo-600 animate-spin" />
      </div>

      <p className="text-sm text-slate-400 font-medium">กำลังโหลด...</p>
    </div>
  );
}

/**
 * PageLoadingFallback — Skeleton แบบ inline (ไม่เต็มจอ)
 * ใช้สำหรับ lazy component ภายในหน้าที่โหลดแล้ว
 */
export function PageLoadingFallback() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="relative w-8 h-8 mb-3">
        <div className="absolute inset-0 rounded-full border-[3px] border-indigo-100" />
        <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-indigo-600 animate-spin" />
      </div>
      <p className="text-sm text-slate-400 font-medium">กำลังโหลด...</p>
    </div>
  );
}

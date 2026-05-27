import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function BottomNav() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path || (path !== '/' && location.pathname.startsWith(path))
    ? 'text-[var(--primary)]' 
    : 'text-gray-500 hover:text-gray-700';

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 z-50 pb-[env(safe-area-inset-bottom)] shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      <div className="flex justify-around items-center h-16">
        <Link to="/" className={`flex flex-col items-center gap-1 transition-transform ${isActive('/')}`}>
          <span className="text-xl leading-none">🏠</span> 
          <span className="text-[10px] font-medium">Trang chủ</span>
        </Link>

        <Link to="/search" className={`flex flex-col items-center gap-1 transition-transform ${isActive('/search')}`}>
          <span className="text-xl leading-none">🔍</span>
          <span className="text-[10px] font-medium">Tìm kiếm</span>
        </Link>

        <Link to="/my-esims" className={`flex flex-col items-center gap-1 transition-transform ${isActive('/my-esims')}`}>
          <span className="text-xl leading-none">📱</span>
          <span className="text-[10px] font-medium">eSIM của tôi</span>
        </Link>

        <Link to="/profile" className={`flex flex-col items-center gap-1 transition-transform ${isActive('/profile')}`}>
          <span className="text-xl leading-none">👤</span>
          <span className="text-[10px] font-medium">Tài khoản</span>
        </Link>
      </div>
    </div>
  );
}

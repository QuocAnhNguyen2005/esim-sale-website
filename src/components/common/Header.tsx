import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import AuthModal from './AuthModal';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';

export default function Header() {
  const [showAuth, setShowAuth] = useState<'login' | 'register' | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
  const userName = typeof window !== 'undefined' ? localStorage.getItem('userName') || 'Người dùng' : '';
  const dropdownRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(dropdownRef, () => setIsMenuOpen(false));

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
    window.location.reload();
  };

  return (
    <>
    <header className="glass sticky top-0 z-50 transition-colors duration-300 border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[76px] flex items-center justify-between gap-8">
        
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 shrink-0">
          <div className="flex items-end gap-0.5">
            <div className="w-2.5 h-5 bg-indigo-600 rounded-full transform -rotate-12"></div>
            <div className="w-2.5 h-7 bg-indigo-500 rounded-full transform -rotate-12"></div>
            <div className="w-2.5 h-9 bg-indigo-400 rounded-full transform -rotate-12"></div>
          </div>
          <span className="font-black text-xl text-gray-900 tracking-tight">Global<span className="text-indigo-600">eSIM</span></span>
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-7 font-semibold text-sm text-slate-700">
          <Link to="/" className="hover:text-[var(--primary)] transition-colors">Điểm Đến</Link>
          <a href="/#devices" className="hover:text-[var(--primary)] transition-colors">Thiết bị tương thích</a>
          <a href="/#activation" className="hover:text-[var(--primary)] transition-colors">Cách kích hoạt</a>
          <Link to="/b2b-portal" className="flex items-center gap-1.5 text-[var(--primary)] hover:text-[var(--primary-hover)] transition-colors bg-[var(--primary)]/10 px-3 py-1.5 rounded-lg">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
            B2B Partner
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4 shrink-0">
          {!token ? (
            <div className="hidden md:flex items-center gap-2">
              <button onClick={() => setShowAuth('login')} className="text-sm font-semibold text-gray-700 hover:text-indigo-600 transition-colors">Đăng nhập</button>
              <span className="text-gray-300">|</span>
              <button onClick={() => setShowAuth('register')} className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">Đăng ký</button>
            </div>
          ) : (
            <div className="relative hidden md:block" ref={dropdownRef}>
              {/* Nút bấm hiển thị Avatar */}
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center gap-2 hover:bg-gray-100 p-1.5 pr-3 rounded-full transition focus:outline-none"
              >
                <div className="w-8 h-8 bg-[var(--primary)] rounded-full text-white flex items-center justify-center font-bold">
                  {userName[0]}
                </div>
                <span className="font-semibold text-gray-700 text-sm">Hi, {userName}</span>
              </button>

              {/* Bảng Menu Dropdown */}
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl ring-1 ring-black ring-opacity-5 z-50 overflow-hidden transform origin-top-right transition-all">
                  <div className="p-4 border-b border-gray-100 bg-gray-50">
                    <p className="text-sm font-medium text-gray-900">{userName}</p>
                    <p className="text-xs text-gray-500 truncate">quocanh@email.com</p>
                  </div>
                  <div className="py-2">
                    <Link to="/my-esims" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 text-sm font-bold text-[var(--primary)] hover:bg-[var(--primary-light)]">
                      eSIM của tôi
                    </Link>
                    <Link to="/history" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Lịch sử giao dịch
                    </Link>
                    <Link to="/settings" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Cài đặt tài khoản
                    </Link>
                  </div>
                  <div className="py-2 border-t border-gray-100">
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium transition-colors">
                      Đăng xuất
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Language & Currency Dropdown Stub */}
          <div className="hidden md:flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium cursor-pointer">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
            VI | VNĐ
          </div>

          {/* Dark Mode Toggle */}
          <button 
            onClick={() => document.documentElement.classList.toggle('dark')} 
            className="p-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            title="Chế độ Tối/Sáng"
          >
            <svg className="w-5 h-5 hidden dark:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            <svg className="w-5 h-5 block dark:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
          </button>

          <Link to="/checkout" className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
            <span className="absolute -top-0.5 -right-0.5 bg-indigo-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">0</span>
          </Link>
        </div>
      </div>
    </header>
    
    {/* Status Bar */}
    {token && (
      <div className="bg-amber-50 border-b border-amber-200 py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-center text-sm">
          <span className="text-amber-800 mr-2">⚠️ eSIM <strong>Nhật Bản</strong> của bạn sẽ hết hạn sau 2 ngày - </span>
          <button className="text-indigo-600 font-bold hover:underline focus:outline-none">Gia hạn ngay</button>
        </div>
      </div>
    )}

    {/* Auth Modal */}
    {showAuth && (
      <AuthModal defaultMode={showAuth} onClose={() => setShowAuth(null)} />
    )}
    </>
  );
}

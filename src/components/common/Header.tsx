import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthModal from './AuthModal';

export default function Header() {
  const [showAuth, setShowAuth] = useState<'login' | 'register' | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
  const userName = typeof window !== 'undefined' ? localStorage.getItem('userName') || 'Người dùng' : '';

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
    window.location.reload();
  };

  return (
    <>
    <header className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[72px] flex items-center justify-between gap-8">
        
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
        <nav className="hidden md:flex items-center gap-7 font-medium text-sm text-gray-700">
          <Link to="/" className="hover:text-indigo-600 transition-colors">Điểm Đến</Link>
          <Link to="/#devices" className="hover:text-indigo-600 transition-colors">Thiết bị tương thích</Link>
          <Link to="/#activation" className="hover:text-indigo-600 transition-colors">Cách kích hoạt</Link>
          <Link to="/#faq" className="hover:text-indigo-600 transition-colors">Câu hỏi thường gặp</Link>
          <Link to="/#reviews" className="hover:text-indigo-600 transition-colors">Đánh giá</Link>
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
            <div className="relative">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-indigo-600 transition-colors focus:outline-none"
              >
                <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                  {userName[0]}
                </div>
                <span className="hidden md:inline">Hi, {userName}</span>
                <svg className={`w-4 h-4 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
              
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                  <Link to="/my-esims" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">eSIM của tôi</Link>
                  <Link to="/history" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">Lịch sử giao dịch</Link>
                  <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">Cài đặt tài khoản</Link>
                  <div className="border-t border-gray-100 my-1"></div>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">Đăng xuất</button>
                </div>
              )}
            </div>
          )}

          <button className="hidden md:flex items-center gap-1.5 text-sm text-gray-600 hover:text-indigo-600 transition-colors font-medium">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
            VI
          </button>
          <Link to="/checkout" className="relative p-2 text-gray-600 hover:text-indigo-600 transition-colors">
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

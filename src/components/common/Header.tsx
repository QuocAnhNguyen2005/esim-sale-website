import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
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
          <a href="#" className="hover:text-indigo-600 transition-colors">Thiết bị tương thích</a>
          <a href="#" className="hover:text-indigo-600 transition-colors">Cách kích hoạt</a>
          <a href="#" className="hover:text-indigo-600 transition-colors">Câu hỏi thường gặp</a>
          <a href="#" className="hover:text-indigo-600 transition-colors">Đánh giá</a>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="hidden md:flex items-center gap-2">
            <Link to="/my-esims" className="text-sm font-semibold text-gray-700 hover:text-indigo-600 transition-colors">Đăng nhập</Link>
            <span className="text-gray-300">|</span>
            <Link to="/" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">Đăng ký</Link>
          </div>
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
  );
}

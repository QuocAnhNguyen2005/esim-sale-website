import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/common/Header';

export default function ProfileMobilePage() {
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
    window.location.href = '/';
  };

  const userName = typeof window !== 'undefined' ? localStorage.getItem('userName') || 'Người dùng' : '';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:hidden">
      <Header />
      <div className="flex-1 p-4 pb-24">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Tài khoản</h1>
        
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6 flex items-center gap-4">
          <div className="w-16 h-16 bg-[var(--primary)] rounded-full text-white flex items-center justify-center font-bold text-2xl">
            {userName[0]}
          </div>
          <div>
            <p className="font-bold text-lg text-gray-900">{userName}</p>
            <p className="text-sm text-gray-500">quocanh@email.com</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
          <Link to="/my-esims" className="flex items-center justify-between p-4 border-b border-gray-50 hover:bg-gray-50 active:bg-gray-100">
            <div className="flex items-center gap-3">
              <span className="text-xl">📱</span>
              <span className="font-medium text-gray-700">eSIM của tôi</span>
            </div>
            <span className="text-gray-400">›</span>
          </Link>
          <Link to="/history" className="flex items-center justify-between p-4 border-b border-gray-50 hover:bg-gray-50 active:bg-gray-100">
            <div className="flex items-center gap-3">
              <span className="text-xl">🧾</span>
              <span className="font-medium text-gray-700">Lịch sử giao dịch</span>
            </div>
            <span className="text-gray-400">›</span>
          </Link>
          <Link to="/settings" className="flex items-center justify-between p-4 hover:bg-gray-50 active:bg-gray-100">
            <div className="flex items-center gap-3">
              <span className="text-xl">⚙️</span>
              <span className="font-medium text-gray-700">Cài đặt bảo mật</span>
            </div>
            <span className="text-gray-400">›</span>
          </Link>
        </div>

        <button onClick={handleLogout} className="w-full bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-red-600 font-bold hover:bg-red-50 active:bg-red-100 transition-colors">
          Đăng xuất
        </button>
      </div>
    </div>
  );
}

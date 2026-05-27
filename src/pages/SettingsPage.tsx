import React, { useState } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const SupportSection = ({ userUID }: { userUID: string }) => {
  // Mã hóa tin nhắn sẵn để khách không phải gõ
  const message = encodeURIComponent(`Xin chào, tôi cần hỗ trợ cho tài khoản UID: ${userUID}.`);
  const whatsappNumber = "84987654321"; // Số điện thoại CSKH

  return (
    <div className="mt-8 pt-6 border-t border-gray-100">
      <h3 className="text-lg font-bold text-gray-900 mb-3">Hỗ trợ Khách hàng Khẩn cấp</h3>
      <p className="text-sm text-gray-500 mb-4">Bạn đang gặp sự cố khi đang ở nước ngoài? Đừng lo lắng, hãy nhắn tin ngay cho đội ngũ CSKH 24/7 của chúng tôi.</p>
      <div className="flex flex-wrap gap-4">
        {/* Nút gọi WhatsApp */}
        <a 
          href={`https://wa.me/${whatsappNumber}?text=${message}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25D366] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-sm hover:bg-[#128C7E] transition-colors"
        >
          <span className="text-xl">💬</span> Chat qua WhatsApp
        </a>
      </div>
    </div>
  );
};

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'security'>('profile');
  const userName = typeof window !== 'undefined' ? localStorage.getItem('userName') || '' : '';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow max-w-5xl mx-auto px-4 py-8 md:py-12 w-full flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Tabs */}
        <aside className="w-full md:w-64 shrink-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 hidden md:block">Cài đặt</h1>
          
          <div className="flex md:flex-col gap-2 overflow-x-auto pb-2 scrollbar-hide border-b md:border-b-0 border-gray-200">
            <button 
              onClick={() => setActiveTab('profile')}
              className={`px-4 py-3 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors flex items-center gap-3 text-left ${activeTab === 'profile' ? 'bg-indigo-50 text-[var(--primary)]' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              Hồ sơ cá nhân
            </button>
            <button 
              onClick={() => setActiveTab('security')}
              className={`px-4 py-3 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors flex items-center gap-3 text-left ${activeTab === 'security' ? 'bg-indigo-50 text-[var(--primary)]' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              Bảo mật & Thanh toán
            </button>
          </div>
        </aside>

        {/* Content Area */}
        <div className="flex-1">
          {activeTab === 'profile' && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 animate-in fade-in duration-200">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Thông tin Hồ sơ</h2>
              
              <div className="space-y-5 max-w-lg">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Họ và tên</label>
                  <input type="text" defaultValue={userName} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] transition-all outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Số điện thoại <span className="text-gray-400 font-normal">(Nhận SMS báo sắp hết hạn eSIM)</span></label>
                  <input type="tel" placeholder="+84" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] transition-all outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email liên kết <span className="text-red-500">*</span></label>
                  <input type="email" defaultValue="quocanh@email.com" disabled className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed" />
                  <p className="text-xs text-gray-500 mt-2">Email gắn với định danh UUID và là nơi nhận mã QR gốc. Không thể tự thay đổi.</p>
                </div>
                <div className="pt-4">
                  <button className="px-6 py-3 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-bold rounded-xl transition-colors shadow-sm">
                    Lưu thay đổi
                  </button>
                </div>
              </div>

              {/* Hỗ trợ khách hàng */}
              <SupportSection userUID="UID-DEMO-123" />
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Password Section */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Đổi Mật Khẩu</h2>
                <div className="space-y-4 max-w-lg">
                  <input type="password" placeholder="Mật khẩu hiện tại" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[var(--primary)] transition-all outline-none" />
                  <input type="password" placeholder="Mật khẩu mới" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[var(--primary)] transition-all outline-none" />
                  <button className="px-6 py-3 bg-gray-900 hover:bg-black text-white font-bold rounded-xl transition-colors">
                    Cập nhật mật khẩu
                  </button>
                </div>
              </div>

              {/* Advanced Partner Security */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Bảo mật Tăng cường & Liên kết Ngân hàng</h2>
                <p className="text-sm text-gray-500 mb-6">Các tính năng cao cấp dành riêng cho đối tác hệ sinh thái.</p>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">Quản lý Thẻ liên kết</p>
                        <p className="text-xs text-gray-500">Lưu thẻ Visa/Mastercard mua nhanh</p>
                      </div>
                    </div>
                    <button className="text-sm font-semibold text-[var(--primary)]">Liên kết ngay</button>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" /></svg>
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">Xác thực 2 lớp (2FA)</p>
                        <p className="text-xs text-gray-500">Bảo vệ eSIM chưa kích hoạt</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--primary)]"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

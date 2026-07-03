import React, { useState } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

export default function B2BPortalPage() {
  const [apiKey, setApiKey] = useState('sk_test_51Nx... (Hidden)');
  const [showKey, setShowKey] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--bg-page)] flex flex-col font-['Outfit']">
      <Header />
      
      <main className="flex-grow max-w-7xl mx-auto px-4 py-12 w-full">
        <div className="mb-10">
          <h1 className="text-4xl font-black text-slate-900 mb-2">B2B Partner Portal</h1>
          <p className="text-slate-500">Quản lý API Keys, tài liệu tích hợp (White-label) và thống kê doanh thu đại lý.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Cột trái: API Keys & Stats */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            
            {/* API Key Management */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--primary)] mix-blend-multiply opacity-5 rounded-bl-[100px]"></div>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <svg className="w-6 h-6 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>
                Xác thực API (API Keys)
              </h2>
              
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 mb-6">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Secret Key (Môi trường Test)</label>
                <div className="flex items-center gap-3">
                  <input 
                    type="text" 
                    readOnly 
                    value={showKey ? 'sk_test_51NxM2A3B4C5D6E7F8G9H0I1J2K3L4M5N6O7' : apiKey} 
                    className="flex-1 bg-white border border-slate-200 px-4 py-3 rounded-xl font-mono text-sm text-slate-700 outline-none focus:ring-2 focus:ring-[var(--primary)]"
                  />
                  <button 
                    onClick={() => setShowKey(!showKey)}
                    className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-500 transition-colors"
                  >
                    {showKey ? 'Ẩn' : 'Hiện'}
                  </button>
                  <button className="px-6 py-3 bg-[var(--primary)] text-white font-bold rounded-xl hover:bg-[var(--primary-hover)] transition-colors shadow-md shadow-[var(--primary)]/20">
                    Copy
                  </button>
                </div>
                <p className="text-xs text-amber-600 mt-3 flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                  Tuyệt đối không chia sẻ Secret Key này cho bất kỳ ai.
                </p>
              </div>

              <button className="text-sm font-bold text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors">
                + Tạo API Key mới
              </button>
            </div>

            {/* Thống kê doanh thu */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <p className="text-sm font-bold text-slate-400 mb-1">eSIM Đã bán (Tháng này)</p>
                <h3 className="text-4xl font-black text-slate-800">1,284</h3>
                <p className="text-sm text-green-500 font-bold mt-2">↑ 12% so với tháng trước</p>
              </div>
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <p className="text-sm font-bold text-slate-400 mb-1">Doanh thu chia sẻ</p>
                <h3 className="text-4xl font-black text-[var(--primary)]">$4,520.00</h3>
                <p className="text-sm text-slate-500 font-medium mt-2">Hoa hồng: 15% / đơn</p>
              </div>
            </div>

          </div>

          {/* Cột phải: Tài liệu API */}
          <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-2xl relative">
            <h2 className="text-xl font-bold mb-6">Tài liệu Tích hợp (API Docs)</h2>
            <p className="text-slate-400 text-sm mb-8 leading-relaxed">
              Tích hợp hệ thống phân phối eSIM của chúng tôi trực tiếp vào ứng dụng hoặc website của bạn (White-label). 
              Hệ thống sử dụng RESTful API và trả về JSON.
            </p>
            
            <div className="space-y-4">
              <a href="#" className="flex items-center justify-between p-4 bg-white/10 rounded-2xl hover:bg-white/20 transition-colors border border-white/5">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 bg-blue-500/20 text-blue-400 rounded-lg flex items-center justify-center font-bold text-xs">GET</span>
                  <span className="font-semibold text-sm">Danh sách gói eSIM</span>
                </div>
                <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </a>
              
              <a href="#" className="flex items-center justify-between p-4 bg-white/10 rounded-2xl hover:bg-white/20 transition-colors border border-white/5">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 bg-green-500/20 text-green-400 rounded-lg flex items-center justify-center font-bold text-xs">POST</span>
                  <span className="font-semibold text-sm">Tạo đơn hàng & Cấp phát</span>
                </div>
                <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </a>

              <a href="#" className="flex items-center justify-between p-4 bg-white/10 rounded-2xl hover:bg-white/20 transition-colors border border-white/5">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 bg-purple-500/20 text-purple-400 rounded-lg flex items-center justify-center font-bold text-xs">WEB</span>
                  <span className="font-semibold text-sm">Cấu hình Webhook (Data Usage)</span>
                </div>
                <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </a>
            </div>

            <button className="w-full mt-8 py-4 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-100 transition-colors">
              Đọc toàn bộ API Docs
            </button>
          </div>

        </div>
      </main>
      
      <Footer />
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import InstallModal from '../components/esim/InstallModal';

const MOCK_ESIMS = [
  {
    id: '1', productName: 'Nhật Bản 5GB 7 Ngày', countryName: 'Nhật Bản', flagEmoji: '🇯🇵',
    status: 'CURRENT', iccid: '', created_at: new Date().toISOString(),
    qr_code_url: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=LPA:1$smdp.io$activation_code',
    lpa_string: 'LPA:1$smdp.io$activation_code_here'
  },
  {
    id: '2', productName: 'Thái Lan Không Giới Hạn 8 Ngày', countryName: 'Thái Lan', flagEmoji: '🇹🇭',
    status: 'ACTIVE', iccid: '8984012345678901234', created_at: new Date(Date.now() - 3 * 86400000).toISOString(),
    expires_at: new Date(Date.now() + 5 * 86400000).toISOString(), // Expires in 5 days
    qr_code_url: '', lpa_string: ''
  },
  {
    id: '3', productName: 'Hàn Quốc 10GB 15 Ngày', countryName: 'Hàn Quốc', flagEmoji: '🇰🇷',
    status: 'EXPIRED', iccid: '8982098765432109876', created_at: new Date(Date.now() - 20 * 86400000).toISOString(),
    qr_code_url: '', lpa_string: ''
  }
];

export default function DashboardPage() {
  const [esims, setEsims] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEsim, setSelectedEsim] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState<'CURRENT' | 'ACTIVE' | 'EXPIRED'>('CURRENT');

  useEffect(() => {
    const timer = setTimeout(() => {
      setEsims(MOCK_ESIMS);
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const filteredEsims = esims.filter(e => e.status === activeTab);

  const handleTopUp = (country: string) => {
    alert(`Đang chuyển hướng nạp thêm Data cho eSIM ${country}...`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow max-w-5xl mx-auto px-4 py-8 md:py-12 w-full">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">eSIM của tôi</h1>
        <p className="text-gray-500 mb-8">Quản lý, cài đặt và nạp thêm data cho các gói eSIM của bạn.</p>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button onClick={() => setActiveTab('CURRENT')} className={`px-6 py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'CURRENT' ? 'border-[var(--primary)] text-[var(--primary)]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
            Chưa kích hoạt
          </button>
          <button onClick={() => setActiveTab('ACTIVE')} className={`px-6 py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'ACTIVE' ? 'border-[var(--primary)] text-[var(--primary)]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
            Đang sử dụng
          </button>
          <button onClick={() => setActiveTab('EXPIRED')} className={`px-6 py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'EXPIRED' ? 'border-[var(--primary)] text-[var(--primary)]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
            Đã hết hạn
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col min-h-[250px]">
                <div className="flex justify-between items-start mb-4"><div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div></div>
                <div className="bg-gray-50 rounded-xl p-4 mb-6 space-y-3"><div className="w-full h-12 bg-gray-200 animate-pulse rounded"></div></div>
                <div className="w-full h-12 bg-gray-200 rounded-xl animate-pulse mt-auto"></div>
              </div>
            ))
          ) : filteredEsims.length === 0 ? (
            <div className="col-span-full py-12 text-center text-gray-500">
              Không có eSIM nào trong mục này.
            </div>
          ) : (
            filteredEsims.map((esim) => (
              <div key={esim.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{esim.flagEmoji}</span>
                    <div>
                      <h3 className="font-bold text-gray-900">{esim.countryName}</h3>
                      <p className="text-sm text-gray-500">{esim.productName}</p>
                    </div>
                  </div>
                  {activeTab === 'ACTIVE' && <span className="bg-green-100 text-green-800 text-[10px] font-bold px-2 py-1 rounded-md uppercase">Active</span>}
                  {activeTab === 'CURRENT' && <span className="bg-yellow-100 text-yellow-800 text-[10px] font-bold px-2 py-1 rounded-md uppercase">Mới</span>}
                </div>

                {/* Progress Bar for Active eSIMs */}
                {activeTab === 'ACTIVE' && esim.expires_at && (
                  <div className="mb-6">
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="text-gray-500">Thời gian còn lại</span>
                      <span className="text-green-600">Còn 5 ngày</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full w-[40%]"></div>
                    </div>
                  </div>
                )}

                <div className="bg-gray-50 rounded-xl p-4 mb-6 text-sm">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-500">ICCID</span>
                    <span className="font-mono text-gray-900 font-medium">{esim.iccid || 'Chưa tạo'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Ngày mua</span>
                    <span className="text-gray-900 font-medium">{new Date(esim.created_at).toLocaleDateString('vi-VN')}</span>
                  </div>
                </div>

                <div className="mt-auto flex gap-2">
                  {activeTab === 'CURRENT' && (
                    <button onClick={() => setSelectedEsim(esim)} className="w-full py-3 rounded-xl font-bold transition-colors bg-black text-white hover:bg-gray-800 shadow-sm">
                      Lấy Mã QR Kích Hoạt
                    </button>
                  )}
                  {activeTab === 'ACTIVE' && (
                    <button onClick={() => handleTopUp(esim.countryName)} className="w-full py-3 rounded-xl font-bold transition-colors bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] shadow-sm">
                      Nạp thêm Data (Top-up)
                    </button>
                  )}
                  {activeTab === 'EXPIRED' && (
                    <button onClick={() => handleTopUp(esim.countryName)} className="w-full py-3 rounded-xl font-bold transition-colors bg-gray-100 text-gray-600 hover:bg-gray-200 shadow-sm">
                      Mua lại gói này
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {selectedEsim && <InstallModal esim={selectedEsim} onClose={() => setSelectedEsim(null)} />}
      </main>
      <Footer />
    </div>
  );
}

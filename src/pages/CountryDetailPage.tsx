import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import CheckoutModal from '../components/CheckoutModal';

export default function CountryDetailPage() {
  const { countrySlug } = useParams();
  
  const [selectedData, setSelectedData] = useState('5GB');
  const [selectedDays, setSelectedDays] = useState('7');
  const [showCheckout, setShowCheckout] = useState(false);

  // Parse the slug to a readable name
  const countryName = countrySlug ? countrySlug.replace(/-/g, ' ') : 'Điểm đến';

  // Dummy product for the checkout modal
  const dummyProduct = {
    id: 'esim-1',
    name: `eSIM ${countryName} ${selectedData} ${selectedDays} Ngày`,
    price: 15.00
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow max-w-6xl mx-auto px-4 py-8 md:py-12 w-full">
        {/* 1. Breadcrumbs */}
        <div className="text-sm text-gray-500 mb-6 flex items-center gap-2">
          <Link to="/" className="hover:text-[var(--primary)] transition-colors">Trang chủ</Link>
          <span>&gt;</span>
          <span className="capitalize">Châu Á</span>
          <span>&gt;</span>
          <span className="text-[var(--primary)] font-bold capitalize">{countryName}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* CỘT TRÁI: Thông tin mạng và Quốc gia */}
          <div className="md:col-span-7">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-6xl border rounded-lg shadow-sm bg-white p-2">🌍</span>
              <h1 className="text-4xl font-extrabold text-gray-900 capitalize">eSIM {countryName}</h1>
            </div>
            
            <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-2xl mb-8">
              <h3 className="font-bold text-indigo-900 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Thông tin Mạng Viễn Thông
              </h3>
              <ul className="space-y-3 text-indigo-900 text-sm">
                <li className="flex items-start gap-2"><span>📡</span> <span><strong>Nhà mạng:</strong> Các nhà mạng hàng đầu địa phương</span></li>
                <li className="flex items-start gap-2"><span>⚡</span> <span><strong>Tốc độ:</strong> 5G / 4G LTE tốc độ cao nhất</span></li>
                <li className="flex items-start gap-2"><span>📶</span> <span><strong>Độ phủ sóng:</strong> Toàn bộ lãnh thổ {countryName}</span></li>
                <li className="flex items-start gap-2"><span>📞</span> <span><strong>Loại gói:</strong> Chỉ Data (Không có số điện thoại)</span></li>
              </ul>
            </div>

            {/* Thêm mô tả chi tiết nếu cần */}
            <div className="prose prose-indigo max-w-none text-gray-600 text-sm leading-relaxed mb-10">
              <p>Trải nghiệm kết nối internet không gián đoạn trong suốt chuyến đi của bạn tới <strong>{countryName}</strong> với eSIM du lịch của chúng tôi. Bạn có thể sử dụng dữ liệu ngay khi máy bay hạ cánh mà không cần tìm kiếm cửa hàng bán SIM vật lý.</p>
              <p>Mã QR sẽ được gửi tự động qua Email. Bạn chỉ việc quét và kích hoạt.</p>
            </div>
          </div>

          {/* CỘT PHẢI: Khung lựa chọn gói cước (Luôn dính khi cuộn) */}
          <div className="md:col-span-5 relative">
            <div className="bg-white p-6 rounded-3xl shadow-2xl border border-gray-100 sticky top-24">
              <h3 className="text-xl font-bold mb-6 text-gray-900">Thiết lập gói eSIM của bạn</h3>
              
              {/* Lựa chọn Dung lượng */}
              <div className="mb-6">
                <label className="block text-gray-700 font-bold mb-3 text-sm uppercase tracking-wide">Dung lượng Data</label>
                <div className="grid grid-cols-3 gap-3">
                  {['1GB', '5GB', '10GB', 'Không giới hạn'].map((data) => (
                    <button 
                      key={data}
                      onClick={() => setSelectedData(data)}
                      className={`py-2.5 rounded-xl text-sm font-semibold border-2 transition-all ${
                        selectedData === data ? 'border-[var(--primary)] bg-indigo-50 text-[var(--primary)]' : 'border-gray-100 text-gray-500 hover:border-gray-200 hover:bg-gray-50'
                      } ${data === 'Không giới hạn' ? 'col-span-3' : ''}`}
                    >
                      {data}
                    </button>
                  ))}
                </div>
              </div>

              {/* Lựa chọn Số ngày */}
              <div className="mb-8">
                <label className="block text-gray-700 font-bold mb-3 text-sm uppercase tracking-wide">Thời hạn (Ngày)</label>
                <div className="grid grid-cols-4 gap-3">
                  {['3', '5', '7', '15'].map((days) => (
                    <button 
                      key={days}
                      onClick={() => setSelectedDays(days)}
                      className={`py-2.5 rounded-xl text-sm font-semibold border-2 transition-all ${
                        selectedDays === days ? 'border-[var(--primary)] bg-indigo-50 text-[var(--primary)]' : 'border-gray-100 text-gray-500 hover:border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      {days}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chốt giá và Nút Mua */}
              <div className="border-t border-gray-100 pt-6 flex justify-between items-center mb-6">
                <span className="text-gray-500 font-medium">Tổng thanh toán:</span>
                <span className="text-3xl font-extrabold text-[var(--primary)]">${dummyProduct.price.toFixed(2)}</span>
              </div>
              
              <button 
                onClick={() => setShowCheckout(true)}
                className="w-full bg-[var(--primary)] text-white py-4 rounded-xl font-bold text-lg hover:bg-[var(--primary-hover)] transition-all shadow-lg hover:shadow-indigo-200 active:scale-[0.98]"
              >
                Mua ngay
              </button>
              <p className="text-center text-xs text-gray-400 mt-4 font-medium flex items-center justify-center gap-1.5">
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                Mã QR sẽ được gửi qua email ngay lập tức.
              </p>
            </div>
          </div>
        </div>

        {/* Thanh Mua Hàng dính đáy (Chỉ hiện trên Mobile) */}
        <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.05)] z-40 pb-[env(safe-area-inset-bottom)]">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">{selectedData} - {selectedDays} Ngày</p>
              <p className="text-2xl font-extrabold text-[var(--primary)]">${dummyProduct.price.toFixed(2)}</p>
            </div>
            <button 
              onClick={() => setShowCheckout(true)}
              className="bg-[var(--primary)] text-white px-8 py-3.5 rounded-full font-bold shadow-lg hover:bg-[var(--primary-hover)] active:scale-95 transition-transform"
            >
              Mua ngay
            </button>
          </div>
        </div>
      </main>
      
      <Footer />

      {showCheckout && (
        <CheckoutModal 
          product={dummyProduct} 
          onClose={() => setShowCheckout(false)} 
        />
      )}
    </div>
  );
}

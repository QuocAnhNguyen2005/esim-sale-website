import React, { useState } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

// MOCK DATA GENERATION FOR PAGINATION
const generateMockOrders = (count: number) => {
  const packages = ['Nhật Bản 5GB 7 Ngày', 'Thái Lan Không Giới Hạn', 'Châu Âu 10GB 30 Ngày', 'Singapore 3GB 5 Ngày', 'Trung Quốc 10GB 10 Ngày'];
  const statuses = ['Thành công', 'Đang xử lý', 'Thất bại'];
  return Array.from({ length: count }).map((_, i) => ({
    id: `ORD-2026-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
    date: new Date(Date.now() - Math.random() * 10000000000).toISOString().split('T')[0],
    package: packages[Math.floor(Math.random() * packages.length)],
    total: `$${(Math.random() * 50 + 5).toFixed(2)}`,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    email: 'quocanhnguyen@email.com',
    phone: '+84987654321'
  }));
};

const MOCK_ORDERS = generateMockOrders(35); // 35 items to test pagination

// DATA MASKING UTILS
const maskEmail = (email: string) => {
  const [name, domain] = email.split('@');
  if (!name || !domain) return email;
  return `${name.substring(0, 4)}***@${domain}`;
};

const maskPhone = (phone: string) => {
  if (phone.length < 8) return phone;
  return `${phone.substring(0, 3)} *** *** ${phone.substring(phone.length - 3)}`;
};

export default function HistoryPage() {
  const [filter, setFilter] = useState('all');
  const [visibleCount, setVisibleCount] = useState(10); // LAZY LOADING & PAGINATION
  const [loading, setLoading] = useState(false);

  const handleDownloadPDF = (id: string) => {
    alert(`Đang tải hóa đơn PDF cho đơn hàng ${id}...`);
  };

  const handleReorder = (pkg: string) => {
    alert(`Đã thêm gói "${pkg}" vào giỏ hàng. Chuyển hướng thanh toán...`);
  };

  const loadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleCount(prev => prev + 10);
      setLoading(false);
    }, 800); // Giả lập độ trễ mạng
  };

  const filteredOrders = MOCK_ORDERS.filter(o => {
    if (filter === 'all') return true;
    if (filter === 'success') return o.status === 'Thành công';
    if (filter === 'processing') return o.status === 'Đang xử lý';
    return true;
  });

  const displayedOrders = filteredOrders.slice(0, visibleCount);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow max-w-5xl mx-auto px-4 py-8 md:py-12 w-full">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Lịch sử giao dịch</h1>
        <p className="text-gray-500 mb-8">Quản lý các hóa đơn và giao dịch mua eSIM của bạn.</p>

        {/* Filters */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
          <button onClick={() => { setFilter('all'); setVisibleCount(10); }} className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filter === 'all' ? 'bg-[var(--primary)] text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}>Tất cả</button>
          <button onClick={() => { setFilter('success'); setVisibleCount(10); }} className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filter === 'success' ? 'bg-[var(--primary)] text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}>Thành công</button>
          <button onClick={() => { setFilter('processing'); setVisibleCount(10); }} className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filter === 'processing' ? 'bg-[var(--primary)] text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}>Đang xử lý</button>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                <th className="p-4">Mã Đơn Hàng</th>
                <th className="p-4">Khách Hàng</th>
                <th className="p-4">Tên Gói</th>
                <th className="p-4">Tổng Tiền</th>
                <th className="p-4">Trạng Thái</th>
                <th className="p-4 text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {displayedOrders.map(order => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-mono text-sm text-gray-900">{order.id}<br/><span className="text-xs text-gray-400">{order.date}</span></td>
                  <td className="p-4 text-sm text-gray-600">
                    <div className="font-medium text-gray-800">{maskEmail(order.email)}</div>
                    <div className="text-xs text-gray-500">{maskPhone(order.phone)}</div>
                  </td>
                  <td className="p-4 font-medium text-gray-900">{order.package}</td>
                  <td className="p-4 font-bold text-gray-900">{order.total}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${order.status === 'Thành công' ? 'bg-green-100 text-green-800' : order.status === 'Đang xử lý' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-3">
                    <button onClick={() => handleDownloadPDF(order.id)} className="text-gray-500 hover:text-[var(--primary)] transition-colors" title="Tải Invoice (PDF)">
                      <svg className="w-5 h-5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                    </button>
                    <button onClick={() => handleReorder(order.package)} className="text-sm font-bold text-[var(--primary)] hover:text-[var(--primary-hover)] transition-colors">
                      Mua lại
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {displayedOrders.map(order => (
            <div key={order.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
              <div className="flex justify-between items-center mb-3">
                <span className="font-mono text-xs text-gray-500">{order.id}</span>
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${order.status === 'Thành công' ? 'bg-green-100 text-green-800' : order.status === 'Đang xử lý' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                  {order.status}
                </span>
              </div>
              <h3 className="font-bold text-gray-900 mb-1">{order.package}</h3>
              <div className="text-xs text-gray-500 mb-3 bg-gray-50 p-2 rounded-lg">
                <p>Khách: {maskEmail(order.email)}</p>
                <p>SĐT: {maskPhone(order.phone)}</p>
              </div>
              <div className="flex justify-between text-sm text-gray-600 mb-4">
                <span>{order.date}</span>
                <span className="font-bold text-gray-900">{order.total}</span>
              </div>
              <div className="flex gap-2 border-t border-gray-100 pt-3">
                <button onClick={() => handleDownloadPDF(order.id)} className="flex-1 py-2 rounded-xl bg-gray-50 text-gray-700 font-semibold text-sm hover:bg-gray-100 transition-colors flex items-center justify-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  Hóa đơn
                </button>
                <button onClick={() => handleReorder(order.package)} className="flex-1 py-2 rounded-xl bg-[var(--primary)] text-white font-semibold text-sm hover:bg-[var(--primary-hover)] transition-colors">
                  Mua lại
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination / Load More */}
        {visibleCount < filteredOrders.length && (
          <div className="mt-8 text-center">
            <button 
              onClick={loadMore} 
              disabled={loading}
              className="px-6 py-3 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl shadow-sm hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              {loading ? 'Đang tải thêm...' : `Xem thêm (${filteredOrders.length - visibleCount} giao dịch)`}
            </button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

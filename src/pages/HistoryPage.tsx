import React, { useState } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const MOCK_ORDERS = [
  { id: 'ORD-2026-X7Y', date: '2026-05-20', package: 'Nhật Bản 5GB 7 Ngày', total: '$12.00', status: 'Thành công' },
  { id: 'ORD-2026-A2B', date: '2026-04-15', package: 'Thái Lan Không Giới Hạn', total: '$19.00', status: 'Thành công' },
  { id: 'ORD-2026-M9Q', date: '2026-05-25', package: 'Châu Âu 10GB 30 Ngày', total: '$35.00', status: 'Đang xử lý' },
];

export default function HistoryPage() {
  const [filter, setFilter] = useState('all');

  const handleDownloadPDF = (id: string) => {
    alert(`Đang tải hóa đơn PDF cho đơn hàng ${id}...\n(Tính năng tạo PDF có thể dùng jspdf hoặc react-pdf)`);
  };

  const handleReorder = (pkg: string) => {
    alert(`Đã thêm gói "${pkg}" vào giỏ hàng. Chuyển hướng thanh toán...`);
  };

  const filteredOrders = MOCK_ORDERS.filter(o => {
    if (filter === 'all') return true;
    if (filter === 'success') return o.status === 'Thành công';
    if (filter === 'processing') return o.status === 'Đang xử lý';
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow max-w-5xl mx-auto px-4 py-8 md:py-12 w-full">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Lịch sử giao dịch</h1>
        <p className="text-gray-500 mb-8">Quản lý các hóa đơn và giao dịch mua eSIM của bạn.</p>

        {/* Filters */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
          <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filter === 'all' ? 'bg-[var(--primary)] text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}>Tất cả</button>
          <button onClick={() => setFilter('success')} className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filter === 'success' ? 'bg-[var(--primary)] text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}>Thành công</button>
          <button onClick={() => setFilter('processing')} className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filter === 'processing' ? 'bg-[var(--primary)] text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}>Đang xử lý</button>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                <th className="p-4">Mã Đơn Hàng</th>
                <th className="p-4">Ngày Mua</th>
                <th className="p-4">Tên Gói</th>
                <th className="p-4">Tổng Tiền</th>
                <th className="p-4">Trạng Thái</th>
                <th className="p-4 text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.map(order => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-mono text-sm text-gray-900">{order.id}</td>
                  <td className="p-4 text-sm text-gray-600">{order.date}</td>
                  <td className="p-4 font-medium text-gray-900">{order.package}</td>
                  <td className="p-4 font-bold text-gray-900">{order.total}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${order.status === 'Thành công' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
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
          {filteredOrders.map(order => (
            <div key={order.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
              <div className="flex justify-between items-center mb-3">
                <span className="font-mono text-xs text-gray-500">{order.id}</span>
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${order.status === 'Thành công' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {order.status}
                </span>
              </div>
              <h3 className="font-bold text-gray-900 mb-1">{order.package}</h3>
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
      </main>
      <Footer />
    </div>
  );
}

import React, { useState } from 'react';
import { RefreshCw, Eye, AlertCircle, Send, Wifi, ShieldOff } from 'lucide-react';

const MOCK_ORDERS = [
  { id: 'ORD-A1', status: 'PAID', channel: 'App Ngân hàng', total: '$12.00', date: '2026-05-28', iccid: '89840220019233' },
  { id: 'ORD-A2', status: 'DELIVERED', channel: 'WebGoc', total: '$35.00', date: '2026-05-28', iccid: '89840220054111' },
  { id: 'ORD-B1', status: 'FAILED_API', channel: 'App Ngân hàng', total: '$19.00', date: '2026-05-28', iccid: 'PENDING', errorLog: 'Err_503_Vendor_Timeout' },
];

export default function AdminOrderView() {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">Quản lý Đơn Hàng & ICCID</h2>
          <p className="text-sm text-gray-500 mt-1">CSKH Operations: Xử lý sự cố, cấp phát lại QR và tra cứu dung lượng trực tiếp.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Side: Table */}
        <div className={`flex-1 overflow-hidden transition-all ${selectedOrder ? 'hidden md:block md:w-2/3 border-r border-gray-200' : 'w-full'}`}>
          <div className="border-b border-gray-100 flex gap-1 p-2 bg-gray-50/50 overflow-x-auto">
            <button onClick={() => setActiveTab('all')} className={`px-4 py-2 text-sm font-bold rounded-lg whitespace-nowrap transition-colors ${activeTab === 'all' ? 'bg-white shadow-sm text-indigo-600 border border-gray-200' : 'text-gray-500 hover:text-gray-900'}`}>Tất cả Đơn hàng</button>
            <button onClick={() => setActiveTab('rescue')} className={`px-4 py-2 text-sm font-bold rounded-lg whitespace-nowrap flex items-center gap-2 transition-colors ${activeTab === 'rescue' ? 'bg-red-50 text-red-700 border border-red-100' : 'text-gray-500 hover:text-red-700'}`}>
              Lỗi Cấp Phát (API Failed)
              <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full shadow-sm">1</span>
            </button>
          </div>

          <div className="p-0 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-200">
                  <th className="p-4">Mã Đơn</th>
                  <th className="p-4 hidden sm:table-cell">Ngày GD</th>
                  <th className="p-4">ICCID</th>
                  <th className="p-4">Trạng thái</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {MOCK_ORDERS.filter(o => activeTab === 'all' || (activeTab === 'rescue' && o.status === 'FAILED_API')).map((order) => (
                  <tr key={order.id} className={`text-sm cursor-pointer transition-colors ${selectedOrder?.id === order.id ? 'bg-indigo-50/50' : 'hover:bg-gray-50'}`} onClick={() => setSelectedOrder(order)}>
                    <td className="p-4 font-mono font-bold text-indigo-600">{order.id}</td>
                    <td className="p-4 text-gray-600 hidden sm:table-cell">{order.date}</td>
                    <td className="p-4 font-mono text-gray-500">{order.iccid}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wide uppercase
                        ${order.status === 'PAID' ? 'bg-blue-100 text-blue-800' : order.status === 'DELIVERED' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                      `}>{order.status}</span>
                    </td>
                    <td className="p-4 text-right text-gray-400">
                      <Eye size={16} className="inline-block" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Side: Detail & Quick Actions */}
        {selectedOrder ? (
          <div className="w-full md:w-1/3 bg-gray-50 p-6 flex flex-col gap-6 animate-in slide-in-from-right-8 duration-300">
            <div className="flex justify-between items-center">
              <h3 className="font-black text-lg text-gray-900">Chi tiết: {selectedOrder.id}</h3>
              <button onClick={() => setSelectedOrder(null)} className="md:hidden text-gray-400 hover:text-gray-900">Đóng</button>
            </div>

            {selectedOrder.status === 'FAILED_API' && (
              <div className="bg-red-100 text-red-800 p-4 rounded-xl border border-red-200">
                <div className="flex items-center gap-2 mb-2 font-bold"><AlertCircle size={16}/> Raw Error Log</div>
                <code className="text-xs bg-red-50 p-2 rounded block whitespace-pre-wrap">
                  {`{
  "errorCode": "503",
  "message": "${selectedOrder.errorLog}",
  "vendor": "Airalo"
}`}
                </code>
                <div className="mt-4 flex gap-2">
                  <button className="flex-1 bg-gray-900 text-white text-xs font-bold py-2 rounded-lg flex items-center justify-center gap-1 hover:bg-gray-800"><RefreshCw size={14}/> Force Retry</button>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Công cụ hỗ trợ KH (CSKH)</p>
              
              <button disabled={selectedOrder.status === 'FAILED_API'} className="w-full flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-xl hover:border-indigo-300 hover:shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Send size={16}/></div>
                <div className="text-left"><p className="text-sm font-bold text-gray-900">Gửi lại Mã QR</p><p className="text-xs text-gray-500">Resend Email</p></div>
              </button>

              <button disabled={selectedOrder.status === 'FAILED_API'} className="w-full flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-xl hover:border-green-300 hover:shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                <div className="p-2 bg-green-50 text-green-600 rounded-lg"><Wifi size={16}/></div>
                <div className="text-left"><p className="text-sm font-bold text-gray-900">Tra cứu Data</p><p className="text-xs text-gray-500">Fetch Data Usage (Live)</p></div>
              </button>

              <button className="w-full flex items-center gap-3 p-3 bg-white border border-red-100 rounded-xl hover:bg-red-50 hover:border-red-200 transition-all">
                <div className="p-2 bg-red-100 text-red-600 rounded-lg"><ShieldOff size={16}/></div>
                <div className="text-left"><p className="text-sm font-bold text-red-700">Hủy / Thu hồi eSIM</p><p className="text-xs text-red-500">Fraud prevention revoke</p></div>
              </button>
            </div>
          </div>
        ) : (
          <div className="hidden md:flex w-1/3 bg-gray-50 items-center justify-center text-gray-400 p-6 text-center text-sm">
            Chọn một đơn hàng bên trái để xem chi tiết và sử dụng các công cụ CSKH.
          </div>
        )}

      </div>
    </div>
  );
}

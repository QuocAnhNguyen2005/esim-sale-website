import React, { useState } from 'react';
import { IconUpload, IconRefresh } from './AdminIcons';

const MOCK_ORDERS = [
  { id: 'ORD-A1', status: 'PAID', channel: 'App Ngân hàng', total: '$12.00', date: '2026-05-28' },
  { id: 'ORD-A2', status: 'PAID', channel: 'WebGoc', total: '$35.00', date: '2026-05-28' },
  { id: 'ORD-B1', status: 'FAILED_API', channel: 'App Ngân hàng', total: '$19.00', date: '2026-05-28' },
];

export default function AdminOrderView() {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900">Quản lý Đơn hàng & Đối soát</h2>
        <button className="flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-lg font-bold text-sm hover:bg-indigo-100">
          <IconUpload className="w-4 h-4" />
          Upload Excel (Đối soát)
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-100 flex gap-1 p-2">
          <button onClick={() => setActiveTab('all')} className={`px-4 py-2 text-sm font-bold rounded-lg ${activeTab === 'all' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}>Tất cả Đơn hàng</button>
          <button onClick={() => setActiveTab('rescue')} className={`px-4 py-2 text-sm font-bold rounded-lg flex items-center gap-2 ${activeTab === 'rescue' ? 'bg-red-50 text-red-700' : 'text-gray-500 hover:text-red-700'}`}>
            Cần Xử Lý Gấp (Rescue Flow)
            <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">1</span>
          </button>
          <button onClick={() => setActiveTab('reconcile')} className={`px-4 py-2 text-sm font-bold rounded-lg ${activeTab === 'reconcile' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}>Lệch Đối soát</button>
        </div>

        <div className="p-0 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-200">
                <th className="p-4">Mã Đơn</th>
                <th className="p-4">Ngày giao dịch</th>
                <th className="p-4">Kênh Bán</th>
                <th className="p-4">Tổng tiền</th>
                <th className="p-4">Trạng thái</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {MOCK_ORDERS.filter(o => activeTab === 'all' || (activeTab === 'rescue' && o.status === 'FAILED_API')).map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 text-sm">
                  <td className="p-4 font-mono font-medium text-gray-900">{order.id}</td>
                  <td className="p-4 text-gray-600">{order.date}</td>
                  <td className="p-4 font-medium text-gray-700">{order.channel}</td>
                  <td className="p-4 font-bold text-gray-900">{order.total}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wide uppercase
                      ${order.status === 'PAID' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                    `}>{order.status}</span>
                  </td>
                  <td className="p-4 text-right">
                    {order.status === 'FAILED_API' ? (
                      <div className="flex justify-end gap-2">
                        <button className="px-3 py-1.5 bg-gray-900 text-white text-xs font-bold rounded flex items-center gap-1 hover:bg-gray-800"><IconRefresh className="w-3 h-3" /> Retry API</button>
                        <button className="px-3 py-1.5 bg-red-50 text-red-600 text-xs font-bold rounded hover:bg-red-100">Refund</button>
                      </div>
                    ) : (
                      <button className="text-indigo-600 font-semibold hover:underline">Chi tiết</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Key, Percent, Shield, Trash2, Edit } from 'lucide-react';

const MOCK_PARTNERS = [
  { id: 'B2B-001', name: 'Traveloka VN', email: 'api@traveloka.com', discount: 15, apiKeys: 2, status: 'ACTIVE' },
  { id: 'B2B-002', name: 'Klook', email: 'tech@klook.com', discount: 20, apiKeys: 1, status: 'ACTIVE' },
  { id: 'B2B-003', name: 'Agoda', email: 'partners@agoda.com', discount: 18, apiKeys: 3, status: 'INACTIVE' },
];

export default function AdminB2BView() {
  const [activeTab, setActiveTab] = useState('partners');

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">Quản lý B2B (Đại lý & Đối tác)</h2>
          <p className="text-sm text-gray-500 mt-1">Cấp phát API Key, thu hồi quyền truy cập và thiết lập chiết khấu (Discount Rate).</p>
        </div>
        <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-bold rounded-lg shadow-sm hover:bg-indigo-700 transition-colors">
          + Thêm Đại lý mới
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg"><Shield size={24} /></div>
          <div><p className="text-sm text-gray-500 font-semibold">Tổng API Keys Cấp</p><h3 className="text-2xl font-black text-gray-900">12</h3></div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-green-50 text-green-600 rounded-lg"><Percent size={24} /></div>
          <div><p className="text-sm text-gray-500 font-semibold">Trung bình Chiết khấu</p><h3 className="text-2xl font-black text-gray-900">17.5%</h3></div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-100 flex flex-wrap gap-1 p-2 bg-gray-50/50">
          <button onClick={() => setActiveTab('partners')} className={`px-4 py-2 text-sm font-bold rounded-lg transition-colors ${activeTab === 'partners' ? 'bg-white shadow-sm text-indigo-600 border border-gray-200' : 'text-gray-500 hover:text-gray-900'}`}>Danh sách Đại lý</button>
          <button onClick={() => setActiveTab('apikeys')} className={`px-4 py-2 text-sm font-bold rounded-lg transition-colors ${activeTab === 'apikeys' ? 'bg-white shadow-sm text-indigo-600 border border-gray-200' : 'text-gray-500 hover:text-gray-900'}`}>Lịch sử API Request</button>
        </div>

        {activeTab === 'partners' && (
          <div className="p-0 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-200">
                  <th className="p-4">Mã Đại lý</th>
                  <th className="p-4">Tên Đối tác</th>
                  <th className="p-4">Email Liên hệ</th>
                  <th className="p-4">Chiết khấu (%)</th>
                  <th className="p-4">API Keys</th>
                  <th className="p-4">Trạng thái</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {MOCK_PARTNERS.map((partner) => (
                  <tr key={partner.id} className="hover:bg-gray-50 text-sm">
                    <td className="p-4 font-mono font-medium text-gray-900">{partner.id}</td>
                    <td className="p-4 font-bold text-gray-800">{partner.name}</td>
                    <td className="p-4 text-gray-600">{partner.email}</td>
                    <td className="p-4 font-bold text-indigo-600">{partner.discount}%</td>
                    <td className="p-4">
                      <span className="flex items-center gap-1 text-gray-600 font-mono bg-gray-100 px-2 py-1 rounded text-xs">
                        <Key size={12} /> {partner.apiKeys} Keys
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wide uppercase
                        ${partner.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                      `}>{partner.status}</span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded"><Edit size={16} /></button>
                        <button className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

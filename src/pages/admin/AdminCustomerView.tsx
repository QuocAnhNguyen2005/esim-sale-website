import React, { useState } from 'react';
import { IconSearch } from './AdminIcons';

const MOCK_CUSTOMERS = [
  { id: 'CUST-001', name: 'Nguyễn Quốc Anh', email: 'quoc***@email.com', phone: '+84 987 *** 123', totalSpent: '$150.00', status: 'Active', wallet: '$15.00', history: 5 },
  { id: 'CUST-002', name: 'Trần Văn B', email: 'tran***@email.com', phone: '+84 912 *** 456', totalSpent: '$45.00', status: 'Active', wallet: '$0.00', history: 1 },
  { id: 'CUST-003', name: 'Lê Thị C', email: 'leth***@email.com', phone: '+84 903 *** 789', totalSpent: '$320.00', status: 'Blocked', wallet: '$0.00', history: 12 }
];

export default function AdminCustomerView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<any | null>(null);

  const filtered = MOCK_CUSTOMERS.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Global Search */}
      <div className="relative max-w-2xl mx-auto">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <IconSearch className="w-6 h-6 text-gray-400" />
        </div>
        <input 
          type="text" 
          placeholder="Global Search: Nhập SĐT, Email, ICCID hoặc Support Code..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl shadow-sm text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer List */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
            <h3 className="font-bold text-gray-900">Danh sách Khách hàng</h3>
            <span className="text-xs font-semibold text-gray-500">{filtered.length} kết quả</span>
          </div>
          <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
            {filtered.map(c => (
              <div 
                key={c.id} 
                onClick={() => setSelectedCustomer(c)}
                className={`p-4 flex items-center justify-between cursor-pointer transition-colors ${selectedCustomer?.id === c.id ? 'bg-indigo-50 border-l-4 border-indigo-600' : 'hover:bg-gray-50 border-l-4 border-transparent'}`}
              >
                <div>
                  <h4 className="font-bold text-gray-900">{c.name}</h4>
                  <div className="text-xs text-gray-500 font-mono mt-1">{c.id} • {c.email}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-900">{c.totalSpent}</div>
                  <div className={`inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold ${c.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {c.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer 360 View panel */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col h-full">
          {selectedCustomer ? (
            <>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold text-xl">
                  {selectedCustomer.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{selectedCustomer.name}</h3>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${selectedCustomer.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {selectedCustomer.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-500 font-semibold mb-1">Lịch sử mua</p>
                  <p className="text-lg font-black text-gray-900">{selectedCustomer.history} lần</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-500 font-semibold mb-1">Ví Cashback</p>
                  <p className="text-lg font-black text-green-600">{selectedCustomer.wallet}</p>
                </div>
              </div>

              <div className="space-y-3 flex-1">
                <h4 className="font-bold text-sm text-gray-900 border-b pb-2">SIM đang hoạt động</h4>
                <div className="p-3 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-sm">Nhật Bản 5GB</span>
                    <span className="text-[10px] bg-green-100 text-green-800 px-2 py-0.5 rounded font-bold">ACTIVE</span>
                  </div>
                  <div className="text-xs text-gray-500 space-y-1">
                    <p>ICCID: <span className="font-mono text-gray-900">89840123456789</span></p>
                    <p>Dữ liệu: <strong className="text-gray-900">2.4GB / 5.0GB</strong></p>
                    <p>Mạng: NTT Docomo</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-2 pt-4 border-t border-gray-100">
                <button className="w-full py-2 bg-indigo-50 text-indigo-700 font-bold text-sm rounded-lg hover:bg-indigo-100">Gửi lại Email mã QR</button>
                <button className="w-full py-2 bg-red-50 text-red-700 font-bold text-sm rounded-lg hover:bg-red-100">Khóa eSIM (Báo mất máy)</button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
              Chọn một khách hàng để xem Customer 360
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// MOCK DATA FOR CRM & OPERATIONS
const MOCK_SALES_DATA = [
  { country: 'Nhật Bản', value: 85, color: '#FF4B4B' },
  { country: 'Thái Lan', value: 65, color: '#3B82F6' },
  { country: 'Châu Âu', value: 45, color: '#10B981' },
  { country: 'Hàn Quốc', value: 30, color: '#F59E0B' },
  { country: 'Singapore', value: 20, color: '#8B5CF6' }
];

const MOCK_CUSTOMERS = [
  { id: 'CUST-001', name: 'Nguyễn Quốc Anh', email: 'quoc***@email.com', phone: '+84 987 *** 123', totalSpent: '$150.00', status: 'Active' },
  { id: 'CUST-002', name: 'Trần Văn B', email: 'tran***@email.com', phone: '+84 912 *** 456', totalSpent: '$45.00', status: 'Active' },
  { id: 'CUST-003', name: 'Lê Thị C', email: 'leth***@email.com', phone: '+84 903 *** 789', totalSpent: '$320.00', status: 'Blocked' }
];

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'crm'>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/');
  };

  const handleRevoke = (id: string) => {
    alert(`Đang gọi API thu hồi eSIM của khách hàng ${id} và hoàn tiền (Refund)...`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Admin Topbar */}
      <header className="bg-indigo-900 text-white shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="font-black text-xl tracking-tight">Global<span className="text-indigo-400">eSIM</span> Admin</div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-indigo-200">Admin_Super</span>
            <button onClick={handleLogout} className="text-sm px-4 py-1.5 bg-indigo-800 hover:bg-indigo-700 rounded-lg font-bold transition-colors">
              Đăng xuất
            </button>
          </div>
        </div>
      </header>
      <main className="flex-grow max-w-6xl mx-auto px-4 py-8 md:py-12 w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Portal</h1>
            <p className="text-gray-500">Quản trị vận hành & Chăm sóc khách hàng</p>
          </div>
          <div className="bg-white p-1 rounded-xl shadow-sm border border-gray-200 flex">
            <button onClick={() => setActiveTab('dashboard')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${activeTab === 'dashboard' ? 'bg-[var(--primary)] text-white' : 'text-gray-600 hover:bg-gray-50'}`}>Dashboard</button>
            <button onClick={() => setActiveTab('crm')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${activeTab === 'crm' ? 'bg-[var(--primary)] text-white' : 'text-gray-600 hover:bg-gray-50'}`}>CRM & Khách hàng</button>
          </div>
        </div>

        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                <p className="text-sm text-gray-500 font-semibold mb-1">Tổng Doanh Thu</p>
                <p className="text-3xl font-bold text-gray-900">$24,500.00</p>
                <p className="text-xs text-green-600 font-bold mt-2">+12.5% so với tháng trước</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                <p className="text-sm text-gray-500 font-semibold mb-1">eSIM Đã Bán</p>
                <p className="text-3xl font-bold text-gray-900">1,245</p>
                <p className="text-xs text-green-600 font-bold mt-2">+8.2% so với tháng trước</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                <p className="text-sm text-gray-500 font-semibold mb-1">Tỷ lệ khách quay lại</p>
                <p className="text-3xl font-bold text-gray-900">42%</p>
                <p className="text-xs text-gray-500 font-bold mt-2">Ổn định</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-6">Top Quốc Gia Bán Chạy (Mock SVG Chart)</h3>
              <div className="space-y-4">
                {MOCK_SALES_DATA.map(data => (
                  <div key={data.country} className="flex items-center gap-4">
                    <div className="w-24 text-sm font-medium text-gray-700">{data.country}</div>
                    <div className="flex-1 bg-gray-100 rounded-full h-4 overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${data.value}%`, backgroundColor: data.color }}></div>
                    </div>
                    <div className="w-12 text-right text-sm font-bold text-gray-900">{data.value}%</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'crm' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex flex-col md:flex-row gap-4 justify-between items-center bg-gray-50">
              <h3 className="font-bold text-gray-900">Quản lý Khách hàng</h3>
              <div className="relative w-full md:w-96">
                <input 
                  type="text" 
                  placeholder="Nhập UID, Email hoặc SĐT..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                />
                <svg className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white border-b border-gray-200 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                    <th className="p-4">UID / Khách hàng</th>
                    <th className="p-4">Liên hệ (Masked)</th>
                    <th className="p-4">Tổng chi tiêu</th>
                    <th className="p-4">Trạng thái</th>
                    <th className="p-4 text-right">Hành động (CSKH)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {MOCK_CUSTOMERS.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.id.toLowerCase().includes(searchQuery.toLowerCase())).map(customer => (
                    <tr key={customer.id} className="hover:bg-gray-50">
                      <td className="p-4">
                        <div className="font-bold text-gray-900">{customer.name}</div>
                        <div className="text-xs text-gray-500 font-mono">{customer.id}</div>
                      </td>
                      <td className="p-4 text-sm text-gray-600">
                        <div>{customer.email}</div>
                        <div>{customer.phone}</div>
                      </td>
                      <td className="p-4 font-bold text-gray-900">{customer.totalSpent}</td>
                      <td className="p-4">
                        <span className={`inline-flex px-2 py-1 rounded-md text-xs font-bold ${customer.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {customer.status}
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button className="px-3 py-1.5 text-xs font-bold bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                          Lịch sử
                        </button>
                        <button onClick={() => handleRevoke(customer.id)} className="px-3 py-1.5 text-xs font-bold bg-red-50 text-red-600 rounded-lg hover:bg-red-100">
                          Revoke & Refund
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

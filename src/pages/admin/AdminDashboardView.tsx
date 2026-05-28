import React from 'react';
import { ShieldAlert } from 'lucide-react';

export default function AdminDashboardView() {
  return (
    <div className="space-y-6">
      {/* System Alerts */}
      <div className="bg-red-50 border border-red-200 p-4 rounded-xl flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
        <div>
          <h4 className="text-red-800 font-bold text-sm">System Alert: Vendor API Balance Low</h4>
          <p className="text-red-700 text-sm mt-1">Số dư API tại đối tác Airhub chỉ còn <strong>$142.50</strong>. Ước tính sẽ hết trong 4 giờ tới. Vui lòng nạp thêm tiền ngay.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Doanh Thu Hôm Nay', value: '$2,450', trend: '+15% so với hôm qua', trendUp: true },
          { label: 'eSIM Bán Ra', value: '142', trend: '+8% so với hôm qua', trendUp: true },
          { label: 'Conversion Rate', value: '4.2%', trend: '-0.5% so với tuần trước', trendUp: false },
          { label: 'Kẹt API (Pending)', value: '3', trend: 'Cần xử lý gấp!', trendUp: false, alert: true },
        ].map((stat, i) => (
          <div key={i} className={`bg-white p-5 rounded-xl shadow-sm border ${stat.alert ? 'border-red-300' : 'border-gray-200'}`}>
            <p className="text-sm font-semibold text-gray-500 mb-2">{stat.label}</p>
            <p className="text-2xl font-black text-gray-900">{stat.value}</p>
            <p className={`text-xs font-bold mt-2 ${stat.alert ? 'text-red-600' : stat.trendUp ? 'text-green-600' : 'text-gray-500'}`}>{stat.trend}</p>
          </div>
        ))}
      </div>

      {/* Charts Grid using SVG */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart Mock (Top Countries) */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="font-bold text-gray-900 mb-6">Top 5 Quốc Gia Bán Chạy Nhất</h3>
          <div className="space-y-4">
            {[
              { country: 'Nhật Bản', pct: 85, color: '#4f46e5' },
              { country: 'Thái Lan', pct: 65, color: '#3b82f6' },
              { country: 'Châu Âu', pct: 45, color: '#06b6d4' },
              { country: 'Singapore', pct: 30, color: '#10b981' },
              { country: 'Hàn Quốc', pct: 20, color: '#f59e0b' },
            ].map(d => (
              <div key={d.country} className="flex items-center gap-4 text-sm font-medium">
                <div className="w-24 text-gray-700">{d.country}</div>
                <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${d.pct}%`, backgroundColor: d.color }}></div>
                </div>
                <div className="w-12 text-right text-gray-900">{d.pct}%</div>
              </div>
            ))}
          </div>
        </div>

        {/* Pie Chart Mock (Payment Methods) */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col">
          <h3 className="font-bold text-gray-900 mb-6">Tỷ trọng phương thức thanh toán</h3>
          <div className="flex-1 flex items-center justify-center gap-8">
            {/* Simple CSS Pie Chart representation */}
            <div className="relative w-40 h-40 rounded-full bg-gray-100" style={{ background: 'conic-gradient(#4f46e5 0% 60%, #06b6d4 60% 85%, #f59e0b 85% 100%)' }}>
              <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center flex-col shadow-inner">
                <span className="text-xl font-black text-gray-900">142</span>
                <span className="text-xs font-semibold text-gray-500">Đơn hàng</span>
              </div>
            </div>
            <div className="space-y-3 text-sm font-medium">
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#4f46e5]"></div> <span>App Ngân Hàng (60%)</span></div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#06b6d4]"></div> <span>VNPay (25%)</span></div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#f59e0b]"></div> <span>Credit Card (15%)</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

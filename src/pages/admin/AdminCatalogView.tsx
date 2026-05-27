import React from 'react';

export default function AdminCatalogView() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900">Sản phẩm & Tỷ giá</h2>
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-gray-500">Tỷ giá cấu hình:</span>
          <span className="px-3 py-1.5 bg-yellow-100 text-yellow-800 font-bold rounded-lg text-sm">1 USD = 25,450 VNĐ</span>
          <button className="text-indigo-600 text-sm font-bold hover:underline">Sửa</button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50">
          <h3 className="font-bold text-gray-900">Mapping Sản phẩm với Nhà mạng (Vendor API)</h3>
          <p className="text-sm text-gray-500 mt-1">Đảm bảo mã gói trên Website khớp với ID gói của Airhub/Redtea để tự động cấp phát.</p>
        </div>
        
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-200">
              <th className="p-4">Sản phẩm (Web)</th>
              <th className="p-4">Giá bán (USD)</th>
              <th className="p-4">Vendor Hiện tại</th>
              <th className="p-4">Vendor Product ID</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {[
              { name: 'Nhật Bản 5GB 7 Ngày', price: '$12.00', vendor: 'Airhub', pid: 'JPN-5G-7D', status: 'OK' },
              { name: 'Thái Lan Không Giới Hạn', price: '$19.00', vendor: 'Airhub', pid: 'THA-UL-8D', status: 'OK' },
              { name: 'Châu Âu 10GB 30 Ngày', price: '$35.00', vendor: 'Redtea', pid: 'EUR-10G-30D', status: 'WARNING' },
            ].map((p, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="p-4 font-bold text-gray-900">{p.name}</td>
                <td className="p-4 text-gray-600">{p.price}</td>
                <td className="p-4">
                  <select className="border border-gray-200 rounded px-2 py-1 bg-white text-gray-900 text-sm font-medium" defaultValue={p.vendor}>
                    <option value="Airhub">Airhub API</option>
                    <option value="Redtea">Redtea API</option>
                  </select>
                </td>
                <td className="p-4">
                  <input type="text" defaultValue={p.pid} className="border border-gray-200 rounded px-2 py-1 w-32 font-mono text-xs" />
                </td>
                <td className="p-4 text-right">
                  <button className="px-3 py-1.5 bg-gray-900 text-white rounded font-bold text-xs hover:bg-gray-800">Lưu Mapping</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

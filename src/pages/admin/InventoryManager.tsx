import React, { useState } from 'react';
import { UploadCloud, Search, Filter, AlertCircle, CheckCircle2, X } from 'lucide-react';

// Giả lập dữ liệu Paging
const mockData = Array.from({ length: 15 }).map((_, i) => ({
  id: `esim-row-${i}`,
  iccid: `89840123456789${i.toString().padStart(4, '0')}`,
  status: i % 5 === 0 ? 'SOLD' : (i % 8 === 0 ? 'REVOKED' : 'AVAILABLE'),
  batch: 'BATCH_MAY_2026',
  package: 'Nhật Bản 5GB 7 Ngày',
  importedAt: '2026-05-28 14:00:00'
}));

export default function InventoryManager() {
  const [isImporting, setIsImporting] = useState(false);
  const [importStatus, setImportStatus] = useState<'idle' | 'analyzing' | 'done'>('idle');
  const [importResult, setImportResult] = useState({ valid: 0, duplicate: 0 });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImportStatus('analyzing');
    // Giả lập đọc và phân tích CSV
    setTimeout(() => {
      setImportResult({ valid: 1000, duplicate: 2 });
      setImportStatus('done');
    }, 1500);
  };

  const handleConfirmImport = () => {
    // Gọi API Insert vào Supabase
    setIsImporting(false);
    setImportStatus('idle');
    alert('Đã import thành công 1,000 mã eSIM vào hệ thống!');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">Quản Lý Kho Hàng (Inventory)</h2>
          <p className="text-sm text-gray-500 mt-1">Tổng cộng: <strong className="text-gray-900">12,450</strong> eSIM đang có sẵn.</p>
        </div>
        <button 
          onClick={() => setIsImporting(true)}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl font-bold text-sm shadow-sm transition-all active:scale-95"
        >
          <UploadCloud size={18} />
          Import CSV / Excel
        </button>
      </div>

      {/* Bulk Import Modal */}
      {isImporting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h3 className="font-bold text-lg text-gray-900">Import Hàng Loạt</h3>
              <button onClick={() => { setIsImporting(false); setImportStatus('idle'); }} className="text-gray-400 hover:text-gray-900">
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              {importStatus === 'idle' && (
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors relative">
                  <input type="file" accept=".csv, .xlsx" onChange={handleFileUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                  <UploadCloud size={32} className="text-indigo-500 mb-3" />
                  <p className="text-sm font-semibold text-gray-900">Kéo thả file CSV vào đây</p>
                  <p className="text-xs text-gray-500 mt-1">hoặc click để chọn file từ máy tính</p>
                  <p className="text-xs text-gray-400 mt-4 border-t pt-4">Cột bắt buộc: ICCID, LPA_CODE</p>
                </div>
              )}

              {importStatus === 'analyzing' && (
                <div className="text-center py-8">
                  <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="font-semibold text-gray-900">Đang phân tích dữ liệu...</p>
                  <p className="text-sm text-gray-500 mt-1">Vui lòng không đóng cửa sổ này</p>
                </div>
              )}

              {importStatus === 'done' && (
                <div className="space-y-4">
                  <div className="bg-green-50 text-green-800 p-4 rounded-xl flex items-start gap-3 border border-green-100">
                    <CheckCircle2 className="shrink-0 mt-0.5 text-green-600" size={20} />
                    <div>
                      <h4 className="font-bold">Đã tìm thấy {importResult.valid.toLocaleString()} mã hợp lệ</h4>
                      <p className="text-sm mt-0.5 opacity-90">Sẵn sàng để đưa vào kho.</p>
                    </div>
                  </div>
                  
                  {importResult.duplicate > 0 && (
                    <div className="bg-yellow-50 text-yellow-800 p-4 rounded-xl flex items-start gap-3 border border-yellow-100">
                      <AlertCircle className="shrink-0 mt-0.5 text-yellow-600" size={20} />
                      <div>
                        <h4 className="font-bold">Phát hiện {importResult.duplicate} mã trùng lặp</h4>
                        <p className="text-sm mt-0.5 opacity-90">Hệ thống sẽ tự động bỏ qua các mã này.</p>
                      </div>
                    </div>
                  )}

                  <button 
                    onClick={handleConfirmImport}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-all"
                  >
                    Bắn dữ liệu vào Supabase
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Data Filter */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Tìm theo ICCID..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
          />
        </div>
        <div className="flex gap-2">
          <select className="px-4 py-2 border border-gray-200 rounded-lg text-sm bg-white outline-none focus:border-indigo-500">
            <option value="">Tất cả trạng thái</option>
            <option value="AVAILABLE">AVAILABLE</option>
            <option value="SOLD">SOLD</option>
            <option value="REVOKED">REVOKED</option>
          </select>
          <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 font-medium hover:bg-gray-100 flex items-center gap-2">
            <Filter size={16} /> Lọc
          </button>
        </div>
      </div>

      {/* Data Grid */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-200">
                <th className="p-4 w-12">#</th>
                <th className="p-4">ICCID</th>
                <th className="p-4">Gói cước (Package)</th>
                <th className="p-4">Trạng thái</th>
                <th className="p-4">Lô hàng (Batch)</th>
                <th className="p-4">Ngày nhập</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {mockData.map((row, i) => (
                <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 text-gray-400">{i + 1}</td>
                  <td className="p-4 font-mono font-medium text-gray-900">{row.iccid}</td>
                  <td className="p-4 text-gray-600">{row.package}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold
                      ${row.status === 'AVAILABLE' ? 'bg-green-100 text-green-800' : ''}
                      ${row.status === 'SOLD' ? 'bg-blue-100 text-blue-800' : ''}
                      ${row.status === 'REVOKED' ? 'bg-red-100 text-red-800' : ''}
                    `}>
                      {row.status}
                    </span>
                  </td>
                  <td className="p-4 text-gray-500 text-xs">{row.batch}</td>
                  <td className="p-4 text-gray-500 text-xs">{row.importedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Infinite Scroll / Paging Indicator */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 text-center">
          <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">
            Tải thêm dữ liệu (Limit: 50)...
          </button>
        </div>
      </div>
    </div>
  );
}

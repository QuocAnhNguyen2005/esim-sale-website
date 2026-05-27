import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export default function InstallModal({ esim, onClose }: any) {
  const [activeTab, setActiveTab] = useState<'qr' | 'manual'>('qr');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const parseLPA = (lpa: string = '') => {
    const parts = lpa.split('$');
    return { smdp: parts[1] || 'SM-DP+ missing', code: parts[2] || 'Code missing' };
  };

  const { smdp, code } = parseLPA(esim.lpa_string);

  // Hàm xử lý khi khách bấm nút "Tải PDF Hướng Dẫn"
  const downloadOfflinePDF = () => {
    const receiptElement = document.getElementById('qr-receipt');
    if (!receiptElement) return;

    // Hiển thị trạng thái đang tải (có thể thêm logic state tùy ý)
    const originalText = receiptElement.style.color;
    
    html2canvas(receiptElement, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`eSIM_${esim.countryName || 'Global'}_Instruction.pdf`);
    }).catch(err => {
      console.error("Lỗi khi tạo PDF:", err);
      alert("Không thể tạo PDF lúc này. Vui lòng thử lại sau.");
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900 bg-opacity-60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl relative">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Install eSIM</h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="flex p-2 bg-gray-50 border-b border-gray-100">
          <button onClick={() => setActiveTab('qr')} className={`flex-1 py-2.5 text-sm font-medium rounded-xl transition-all ${activeTab === 'qr' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500'}`}>QR Code</button>
          <button onClick={() => setActiveTab('manual')} className={`flex-1 py-2.5 text-sm font-medium rounded-xl transition-all ${activeTab === 'manual' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500'}`}>Manual Entry</button>
        </div>

        <div className="p-6">
          {activeTab === 'qr' ? (
            <div id="qr-receipt" className="flex flex-col items-center text-center bg-white">
              <h3 className="text-xl font-bold mb-4">eSIM {esim.countryName} - Hướng dẫn Cài đặt</h3>
              <div className="bg-white p-4 rounded-2xl border-2 border-dashed border-gray-200 mb-4 inline-block">
                {esim.qr_code_url ? <img src={esim.qr_code_url} alt="QR Code" className="w-48 h-48 object-contain mx-auto" /> : <div className="w-48 h-48 bg-gray-100 flex items-center justify-center rounded-xl text-gray-400">No QR Code</div>}
              </div>
              <p className="text-sm text-gray-600 font-medium bg-amber-50 text-amber-800 p-3 rounded-lg mb-6">Hãy dùng điện thoại khác để hiển thị mã QR này, hoặc in nó ra giấy để quét.</p>
              
              <button 
                onClick={downloadOfflinePDF}
                className="w-full bg-gray-900 text-white py-3.5 rounded-xl font-bold hover:bg-black transition-colors flex items-center justify-center gap-2 mb-3"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                Tải Hướng Dẫn (PDF)
              </button>
              <button 
                className="w-full bg-black text-white py-3.5 rounded-xl font-bold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                onClick={() => alert("Tính năng thêm vào Apple Wallet cần Backend tích hợp passkit-generator với chứng chỉ Apple Developer.")}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.2 14.8c-.8.4-1.8.8-3.2.8s-2.4-.4-3.2-.8c-.8-.4-1.2-1.2-1.2-2.4 0-1.2.4-2 1.2-2.4.8-.4 1.8-.8 3.2-.8s2.4.4 3.2.8c.8.4 1.2 1.2 1.2 2.4 0 1.2-.4 2-1.2 2.4zm0-6.4c-.8.4-1.8.8-3.2.8s-2.4-.4-3.2-.8c-.8-.4-1.2-1.2-1.2-2.4 0-1.2.4-2 1.2-2.4.8-.4 1.8-.8 3.2-.8s2.4.4 3.2.8c.8.4 1.2 1.2 1.2 2.4 0 1.2-.4 2-1.2 2.4z"/></svg>
                Thêm vào Apple Wallet
              </button>
            </div>
          ) : (
            <div className="flex flex-col space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">SM-DP+ Address</label>
                <div className="flex items-center justify-between bg-gray-50 p-3.5 rounded-xl border border-gray-100">
                  <span className="font-mono text-sm text-gray-800 truncate mr-3">{smdp}</span>
                  <button onClick={() => handleCopy(smdp, 'smdp')} className="text-indigo-600 text-sm font-medium px-3 py-1.5 bg-indigo-50 rounded-lg">{copiedField === 'smdp' ? 'Copied!' : 'Copy'}</button>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Activation Code</label>
                <div className="flex items-center justify-between bg-gray-50 p-3.5 rounded-xl border border-gray-100">
                  <span className="font-mono text-sm text-gray-800 truncate mr-3">{code}</span>
                  <button onClick={() => handleCopy(code, 'code')} className="text-indigo-600 text-sm font-medium px-3 py-1.5 bg-indigo-50 rounded-lg">{copiedField === 'code' ? 'Copied!' : 'Copy'}</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

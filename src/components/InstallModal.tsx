import React, { useState } from 'react';
import { EsimProfile } from '../types/database';

interface InstallModalProps {
  esim: EsimProfile;
  onClose: () => void;
}

export default function InstallModal({ esim, onClose }: InstallModalProps) {
  const [activeTab, setActiveTab] = useState<'qr' | 'manual'>('qr');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [os, setOs] = useState<'ios' | 'android' | 'other'>('other');

  React.useEffect(() => {
    // Device Detection Logic
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
    if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
      setOs('ios');
    } else if (/android/i.test(userAgent)) {
      setOs('android');
    }
  }, []);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // Helper to extract SM-DP+ Address and Activation Code from LPA string
  // Format usually: LPA:1$SM-DP.ADDRESS$ACTIVATION_CODE
  const parseLPA = (lpa: string = '') => {
    const parts = lpa.split('$');
    return {
      smdp: parts[1] || 'SM-DP+ Address missing',
      code: parts[2] || 'Activation code missing'
    };
  };

  const { smdp, code } = parseLPA(esim.lpa_string);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900 bg-opacity-60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Install eSIM</h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex p-2 bg-gray-50 border-b border-gray-100">
          <button
            onClick={() => setActiveTab('qr')}
            className={`flex-1 py-2.5 text-sm font-medium rounded-xl transition-all ${
              activeTab === 'qr' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            QR Code
          </button>
          <button
            onClick={() => setActiveTab('manual')}
            className={`flex-1 py-2.5 text-sm font-medium rounded-xl transition-all ${
              activeTab === 'manual' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Manual Entry
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'qr' ? (
            <div className="flex flex-col items-center text-center">
              <div className="bg-white p-4 rounded-2xl border-2 border-dashed border-gray-200 mb-4 inline-block">
                {esim.qr_code_url ? (
                  <img src={esim.qr_code_url} alt="eSIM QR Code" className="w-48 h-48 object-contain" />
                ) : (
                  <div className="w-48 h-48 bg-gray-100 flex items-center justify-center rounded-xl text-gray-400">No QR Code Available</div>
                )}
              </div>
              
              {/* Wallet Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-3 w-full mb-4">
                <button className="flex-1 flex items-center justify-center gap-2 bg-black text-white px-4 py-2.5 rounded-xl font-semibold text-sm hover:bg-gray-800 transition-colors shadow-md">
                  <svg className="w-5 h-5" viewBox="0 0 384 512" fill="currentColor"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
                  Add to Apple Wallet
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 bg-white text-gray-800 border border-gray-200 shadow-md px-4 py-2.5 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 512 512" fill="currentColor"><path d="M326.6 312.4c-6.8-6.2-19.6-9.8-38.3-9.8-19.4 0-35.1 6.5-47.2 19.6-12 13.1-18.1 29.5-18.1 49.3 0 19.8 6 36.3 18.1 49.3 12 13.1 27.8 19.6 47.2 19.6 18.7 0 31.5-3.6 38.3-9.8v-32.6h-38.3v-23.7h63.8v72.3c-15.5 13-37.1 19.6-64.8 19.6-27.7 0-50.2-8.5-67.7-25.5-17.4-17-26.2-38.9-26.2-65.8 0-26.9 8.8-48.8 26.2-65.8 17.4-17 39.9-25.5 67.7-25.5 27.7 0 49.3 6.5 64.8 19.6l-25.5 28.8zm111.4-131c-5.8 5.7-12.8 8.6-21.1 8.6-8.3 0-15.3-2.9-21.1-8.6-5.8-5.7-8.7-12.5-8.7-20.5s2.9-14.8 8.7-20.5c5.8-5.7 12.8-8.6 21.1-8.6 8.3 0 15.3 2.9 21.1 8.6 5.8 5.7 8.7 12.5 8.7 20.5s-2.9 14.8-8.7 20.5zM229.4 207h30.8v254h-30.8V207zm-113.8 0h30.8v254h-30.8V207zM512 256C512 114.6 397.4 0 256 0S0 114.6 0 256s114.6 256 256 256 256-114.6 256-256z"/></svg>
                  Save to Google Pay
                </button>
              </div>

              <p className="text-sm text-gray-600 font-medium bg-amber-50 text-amber-800 p-3 rounded-lg">
                Please use another device to display this QR code, or print it to scan with your phone's camera.
              </p>
            </div>
          ) : (
            <div className="flex flex-col space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">SM-DP+ Address</label>
                <div className="flex items-center justify-between bg-gray-50 p-3.5 rounded-xl border border-gray-100">
                  <span className="font-mono text-sm text-gray-800 truncate mr-3">{smdp}</span>
                  <button onClick={() => handleCopy(smdp, 'smdp')} className="text-indigo-600 hover:text-indigo-800 text-sm font-medium px-3 py-1.5 bg-indigo-50 rounded-lg transition-colors">
                    {copiedField === 'smdp' ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>
              
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Activation Code</label>
                <div className="flex items-center justify-between bg-gray-50 p-3.5 rounded-xl border border-gray-100">
                  <span className="font-mono text-sm text-gray-800 truncate mr-3">{code}</span>
                  <button onClick={() => handleCopy(code, 'code')} className="text-indigo-600 hover:text-indigo-800 text-sm font-medium px-3 py-1.5 bg-indigo-50 rounded-lg transition-colors">
                    {copiedField === 'code' ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Dynamic Footer Instructions based on OS */}
        <div className="bg-indigo-50 p-5 border-t border-indigo-100">
          <h4 className="font-bold text-indigo-900 mb-2 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Hướng dẫn cài đặt {os === 'ios' ? '(iOS)' : os === 'android' ? '(Android)' : ''}
          </h4>
          
          {os === 'ios' && (
            <ul className="text-sm text-indigo-800 space-y-1 list-disc pl-5">
              <li>Mở <strong>Cài đặt (Settings)</strong> &gt; <strong>Mạng di động (Cellular)</strong>.</li>
              <li>Chọn <strong>Thêm eSIM (Add eSIM)</strong>.</li>
              <li>Chọn "Sử dụng mã QR" hoặc "Nhập chi tiết thủ công".</li>
              <li>Làm theo hướng dẫn trên màn hình.</li>
            </ul>
          )}
          
          {os === 'android' && (
            <ul className="text-sm text-indigo-800 space-y-1 list-disc pl-5">
              <li>Mở <strong>Cài đặt (Settings)</strong> &gt; <strong>Kết nối (Connections)</strong>.</li>
              <li>Chọn <strong>Quản lý SIM (SIM Manager)</strong> &gt; <strong>Thêm eSIM (Add eSIM)</strong>.</li>
              <li>Quét mã QR hoặc nhập thủ công thông tin bên trên.</li>
            </ul>
          )}

          {os === 'other' && (
            <p className="text-sm text-indigo-800">
              Vui lòng xem hướng dẫn chi tiết dành riêng cho hệ điều hành của bạn trong phần Trợ giúp.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

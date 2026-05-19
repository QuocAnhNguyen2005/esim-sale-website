import React, { useState } from 'react';

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
            <div className="flex flex-col items-center text-center">
              <div className="bg-white p-4 rounded-2xl border-2 border-dashed border-gray-200 mb-4 inline-block">
                {esim.qr_code_url ? <img src={esim.qr_code_url} alt="QR Code" className="w-48 h-48 object-contain" /> : <div className="w-48 h-48 bg-gray-100 flex items-center justify-center rounded-xl text-gray-400">No QR Code</div>}
              </div>
              <p className="text-sm text-gray-600 font-medium bg-amber-50 text-amber-800 p-3 rounded-lg">Please use another device to display this QR code, or print it to scan with your phone's camera.</p>
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

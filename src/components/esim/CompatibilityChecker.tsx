import React, { useState } from 'react';

export default function CompatibilityChecker() {
  const [isOpen, setIsOpen] = useState(false);

  const devices = {
    Apple: ['iPhone 15, 15 Plus, 15 Pro, 15 Pro Max', 'iPhone 14, 14 Plus, 14 Pro, 14 Pro Max', 'iPhone 13, 13 mini, 13 Pro, 13 Pro Max', 'iPhone 12, 12 mini, 12 Pro, 12 Pro Max', 'iPhone 11, 11 Pro, 11 Pro Max', 'iPhone XS, XS Max, XR', 'iPhone SE (2020, 2022)'],
    Samsung: ['Galaxy S24, S24+, S24 Ultra', 'Galaxy S23, S23+, S23 Ultra', 'Galaxy S22, S22+, S22 Ultra', 'Galaxy Z Fold 3, 4, 5', 'Galaxy Z Flip 3, 4, 5'],
    Google: ['Pixel 8, 8 Pro', 'Pixel 7, 7 Pro, 7a', 'Pixel 6, 6 Pro, 6a']
  };

  return (
    <div className="mt-6 border border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
      >
        <div className="flex items-center space-x-3 text-indigo-700 font-semibold">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
          <span>Check Device Compatibility</span>
        </div>
        <svg className={`w-5 h-5 text-gray-500 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </button>

      {isOpen && (
        <div className="p-4 border-t border-gray-100 bg-white max-h-80 overflow-y-auto">
          <p className="text-sm text-gray-500 mb-4 font-medium">Please ensure your device is carrier-unlocked and supports eSIM technology.</p>
          
          {Object.entries(devices).map(([brand, models]) => (
            <div key={brand} className="mb-4 last:mb-0">
              <h4 className="font-bold text-gray-900 mb-2">{brand}</h4>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                {models.map((model, idx) => (
                  <li key={idx}>{model}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

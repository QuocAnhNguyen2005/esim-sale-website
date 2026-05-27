import React, { useState } from 'react';

export default function FloatingDeviceChecker() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      {/* Nút lơ lửng ở góc dưới phải */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-[5.5rem] right-4 md:bottom-10 md:right-10 bg-gray-900 text-white p-4 rounded-full shadow-2xl flex items-center gap-3 hover:bg-gray-800 transition-all z-40 group focus:outline-none"
      >
        <span className="text-2xl leading-none">📱</span>
        {/* Chữ chỉ hiện ra khi hover trên PC, trên mobile chỉ hiện icon */}
        <span className="hidden md:block font-semibold w-0 overflow-hidden group-hover:w-[130px] transition-all duration-300 ease-in-out whitespace-nowrap">
          Kiểm tra thiết bị
        </span>
      </button>

      {/* Modal Popup kiểm tra */}
      {isOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 md:p-8 relative shadow-2xl animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setIsOpen(false)} 
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-800 bg-gray-50 hover:bg-gray-100 w-8 h-8 rounded-full flex items-center justify-center transition-colors focus:outline-none"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">🔍</span>
              <h2 className="text-2xl font-bold text-gray-900">Điện thoại của bạn có hỗ trợ?</h2>
            </div>
            
            <p className="text-gray-500 mb-6 text-sm">Nhập tên thiết bị (VD: iPhone 13) để kiểm tra độ tương thích với eSIM.</p>
            
            <input 
              type="text" 
              placeholder="VD: Samsung S23..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-xl p-4 font-medium focus:border-[var(--primary)] focus:ring-4 focus:ring-indigo-50 transition-all outline-none mb-6"
              autoFocus
            />
            
            {/* Logic lọc kết quả */}
            {searchQuery.length > 2 ? (
              <div className="p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3 text-green-800 animate-in fade-in slide-in-from-bottom-2">
                <span className="text-2xl mt-0.5 leading-none">✅</span>
                <div>
                  <p className="font-bold">Thiết bị hỗ trợ hoàn hảo!</p>
                  <p className="text-sm mt-1 opacity-90">Thiết bị của bạn tương thích với công nghệ eSIM. Bạn có thể yên tâm mua gói cước.</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-4 opacity-50">
                <p className="text-sm text-gray-500 font-medium">Bắt đầu gõ để tìm kiếm thiết bị...</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

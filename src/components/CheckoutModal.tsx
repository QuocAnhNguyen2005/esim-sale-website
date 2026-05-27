import React, { useState } from 'react';
import { Product } from '../types/database';

interface CheckoutModalProps {
  product: Product;
  onClose: () => void;
}

export default function CheckoutModal({ product, onClose }: CheckoutModalProps) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
  const userName = typeof window !== 'undefined' ? localStorage.getItem('userName') : null;
  const isVCB = typeof window !== 'undefined' && localStorage.getItem('partner') === 'vcb';
  const [loading, setLoading] = useState(false);

  const handlePayment = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (isVCB) {
        alert('Chuyển hướng đến App VCB (Deep Link)... Quẹt FaceID để thanh toán.');
      } else {
        alert('Chuyển hướng đến cổng thanh toán VNPay/Stripe...');
      }
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900 bg-opacity-60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Thanh toán đơn hàng</h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-100">
            <div className="flex justify-between mb-2">
              <span className="text-gray-500 font-medium text-sm">Gói cước:</span>
              <span className="text-gray-900 font-bold">{product.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 font-medium text-sm">Tổng tiền:</span>
              <span className="text-indigo-600 font-bold text-xl">${product.price.toFixed(2)}</span>
            </div>
          </div>

          {token ? (
            <div className="bg-indigo-50 text-indigo-800 p-4 rounded-xl mb-6 flex items-start gap-3 border border-indigo-100">
              <svg className="w-6 h-6 shrink-0 mt-0.5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <div>
                <p className="font-semibold text-sm">Mua hàng nhanh (Auto-fill)</p>
                <p className="text-xs mt-1">Chào {userName}, hệ thống đã điền sẵn thông tin của bạn. Tiếp tục thanh toán ngay!</p>
              </div>
            </div>
          ) : (
            <div className="mb-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email nhận eSIM <span className="text-red-500">*</span></label>
                <input type="email" placeholder="example@email.com" className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-sm focus:ring-2 focus:ring-indigo-300 transition" />
              </div>
              <p className="text-xs text-gray-500">Đăng nhập để bỏ qua bước nhập email cho lần mua tiếp theo.</p>
            </div>
          )}

          {isVCB && (
            <div className="mb-6 bg-green-50 border border-green-200 p-3 rounded-xl flex items-center justify-between text-green-800">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span className="text-sm font-bold">Giảm 10% cho thẻ Visa/Mastercard (VCB)</span>
              </div>
              <span className="text-sm font-bold">-${(product.price * 0.1).toFixed(2)}</span>
            </div>
          )}

          <button
            onClick={handlePayment}
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-bold text-sm tracking-widest uppercase transition-all shadow-md disabled:opacity-60 flex items-center justify-center"
          >
            {loading ? 'Đang xử lý...' : (isVCB ? 'Mở App VCB Thanh toán' : (token ? 'Thanh toán ngay' : 'Tiếp tục thanh toán'))}
          </button>
        </div>

      </div>
    </div>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const quickLinks = [
    { label: 'Trung Quốc', href: '#' }, { label: 'Hồng Kông', href: '#' },
    { label: 'Singapore', href: '#' }, { label: 'Châu Âu', href: '#' },
    { label: 'Châu Á', href: '#' }, { label: 'eSIM Quốc Tế', href: '#' },
  ];
  const company = [
    { label: 'Chúng tôi trên Báo chí', href: '#' }, { label: 'Giới thiệu về eSIM', href: '#' },
    { label: 'Blog', href: '#' }, { label: 'Liên hệ', href: '#' },
    { label: 'Hướng dẫn thanh toán', href: '#' },
  ];
  const legal = [
    { label: 'Chính sách hoàn tiền', href: '#' }, { label: 'Chính sách giao hàng', href: '#' },
    { label: 'Điều khoản & Điều kiện', href: '#' }, { label: 'Chính sách bảo mật', href: '#' },
    { label: 'Trung tâm trợ giúp', href: '#' },
  ];

  return (
    <footer className="bg-gray-900 text-gray-400 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="flex items-end gap-0.5">
                <div className="w-2 h-4 bg-indigo-500 rounded-full transform -rotate-12"></div>
                <div className="w-2 h-6 bg-indigo-400 rounded-full transform -rotate-12"></div>
                <div className="w-2 h-8 bg-indigo-300 rounded-full transform -rotate-12"></div>
              </div>
              <span className="font-black text-lg text-white">Global<span className="text-indigo-400">eSIM</span></span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed">Kết nối mọi lúc mọi nơi với mức giá phải chăng tại hơn 200 quốc gia.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="font-bold text-white mb-4 text-sm">Điểm đến nổi bật</h5>
            <ul className="space-y-2.5">
              {quickLinks.map((l, i) => <li key={i}><a href={l.href} className="text-sm hover:text-indigo-400 transition-colors">{l.label}</a></li>)}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h5 className="font-bold text-white mb-4 text-sm">Công ty</h5>
            <ul className="space-y-2.5">
              {company.map((l, i) => <li key={i}><a href={l.href} className="text-sm hover:text-indigo-400 transition-colors">{l.label}</a></li>)}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h5 className="font-bold text-white mb-4 text-sm">Pháp lý</h5>
            <ul className="space-y-2.5">
              {legal.map((l, i) => <li key={i}><a href={l.href} className="text-sm hover:text-indigo-400 transition-colors">{l.label}</a></li>)}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">© 2026 Global eSIM. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="https://facebook.com" className="w-8 h-8 bg-gray-800 hover:bg-indigo-600 rounded-full flex items-center justify-center transition-colors">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

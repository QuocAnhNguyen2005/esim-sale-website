import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

type Tab = 'quoc-gia' | 'khu-vuc' | 'viet-nam';

const allCountries = [
  'Nhật Bản', 'Hàn Quốc', 'Thái Lan', 'Singapore', 'Mỹ', 'Pháp',
  'Đức', 'Ý', 'Anh', 'Úc', 'Việt Nam', 'Trung Quốc', 'Hồng Kông',
  'Châu Âu', 'Châu Á', 'Toàn Cầu',
];

interface HeroSearchProps {
  activeTab?: 'quoc-gia' | 'khu-vuc';
  onTabChange?: (tab: 'quoc-gia' | 'khu-vuc') => void;
}

export default function HeroSearch({ activeTab = 'quoc-gia', onTabChange }: HeroSearchProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => {
      if (query.trim().length > 0) {
        setSuggestions(allCountries.filter(c => c.toLowerCase().includes(query.toLowerCase())));
        setShowDropdown(true);
      } else {
        setSuggestions([]);
        setShowDropdown(false);
      }
    }, 500); // 500ms debounce
    return () => clearTimeout(t);
  }, [query]);

  const handleSelect = (name: string) => {
    navigate(`/destination/${name.toLowerCase().replace(/\s+/g, '-')}`);
    setQuery('');
    setShowDropdown(false);
    setIsMobileSearchOpen(false);
  };

  const handleTabClick = (key: Tab) => {
    if (key === 'viet-nam') {
      navigate('/destination/vietnam');
    } else if (onTabChange) {
      onTabChange(key as 'quoc-gia' | 'khu-vuc');
    }
  };

  const tabs: { key: Tab; label: string }[] = [
    { key: 'quoc-gia', label: 'eSIM Quốc Gia' },
    { key: 'khu-vuc', label: 'eSIM Khu Vực' },
    { key: 'viet-nam', label: 'eSIM Việt Nam' },
  ];

  return (
    <section className="relative bg-white overflow-hidden">
      {/* Subtle diagonal background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-white pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-14 pb-0 flex flex-col lg:flex-row items-center gap-10">
        
        {/* === Left Content === */}
        <div className="flex-1 text-left pb-16 lg:pb-24 z-10">
          <p className="text-indigo-500 font-semibold tracking-widest text-sm uppercase mb-3">ESIM QUỐC TẾ</p>
          <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-black text-gray-900 leading-tight mb-5">
            Kết nối{' '}
            <span className="text-[var(--primary)]">mọi lúc mọi nơi</span>
            <br />với mức giá phải chăng
          </h1>
          <p className="text-gray-500 text-base md:text-lg leading-relaxed mb-10 max-w-lg">
            Du lịch thông minh với các gói dữ liệu eSIM có kết nối Internet tốc độ cao tại hơn 200 quốc gia trên thế giới và tiết kiệm chi phí chuyển vùng.
          </p>

          {/* Search bar */}
          <div className={`relative max-w-lg ${isMobileSearchOpen ? 'fixed inset-0 z-[100] bg-white p-4 h-full w-full max-w-none md:relative md:p-0 md:bg-transparent md:h-auto md:z-auto' : ''}`}>
            {isMobileSearchOpen && (
              <div className="flex justify-between items-center mb-4 md:hidden">
                <h2 className="text-xl font-bold">Tìm kiếm điểm đến</h2>
                <button onClick={() => setIsMobileSearchOpen(false)} className="p-2 text-gray-500">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            )}
            <div className={`flex items-center bg-white rounded-full shadow-lg border border-gray-200 overflow-visible ring-2 ring-transparent focus-within:ring-indigo-300 transition-all ${isMobileSearchOpen ? 'shadow-none border-2 border-indigo-500' : ''}`}>
              <div className="pl-5 text-gray-400 shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                onFocus={() => {
                  if (window.innerWidth < 768) setIsMobileSearchOpen(true);
                }}
                placeholder="Tìm kiếm gói dữ liệu cho hơn 200 quốc gia..."
                className="flex-1 px-4 py-4 text-sm text-gray-700 bg-transparent focus:outline-none placeholder-gray-400"
              />
              <button className="m-1.5 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white p-3 rounded-full transition-colors shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>

            {/* Quick tags for mobile */}
            {isMobileSearchOpen && !query && (
              <div className="mt-6 md:hidden">
                <h3 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">Tìm kiếm phổ biến</h3>
                <div className="flex flex-wrap gap-2">
                  {['Nhật Bản', 'Thái Lan', 'Châu Âu', 'Hàn Quốc', 'Singapore'].map(tag => (
                    <button key={tag} onClick={() => handleSelect(tag)} className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-700 active:bg-gray-200">
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Dropdown suggestions */}
            {(showDropdown || isMobileSearchOpen) && suggestions.length > 0 && (
              <div className={`mt-2 bg-white rounded-2xl border border-gray-100 overflow-hidden z-50 ${isMobileSearchOpen ? 'static shadow-none border-0' : 'absolute top-full left-0 right-0 shadow-xl'}`}>
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelect(s)}
                    className="w-full flex items-center gap-3 px-5 py-3.5 hover:bg-indigo-50 transition-colors text-left border-b border-gray-50 last:border-0"
                  >
                    <svg className="w-4 h-4 text-indigo-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" /></svg>
                    <span className="text-gray-800 font-medium text-sm">{s}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* === Right Illustration === */}
        <div className="hidden lg:flex flex-1 justify-end items-end self-stretch relative">
          {/* Blob shape behind */}
          <div className="absolute bottom-0 right-0 w-[480px] h-[480px] bg-indigo-100 rounded-tl-[120px] rounded-br-none" />
          {/* Placeholder until real image added */}
          <div className="relative z-10 w-72 h-96 flex flex-col items-center justify-center">
            <div className="w-40 h-40 bg-white rounded-3xl shadow-2xl flex items-center justify-center mb-4 border-4 border-indigo-100">
              <svg className="w-20 h-20 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm14 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
            </div>
            <span className="text-indigo-400 font-semibold text-sm">eSIM QR Code</span>
          </div>
        </div>
      </div>

      {/* === Tabs === */}
      <div className="relative border-t border-gray-100 bg-white mt-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex">
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => handleTabClick(t.key)}
              className={`px-7 py-5 text-sm font-semibold transition-all border-b-[3px] ${
                activeTab === t.key
                  ? 'border-[var(--primary)] text-[var(--primary)] bg-indigo-50/50'
                  : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-200'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

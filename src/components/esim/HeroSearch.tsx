import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

type Tab = 'quoc-gia' | 'khu-vuc' | 'viet-nam' | 'smart_planner';

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
  const [currentTab, setCurrentTab] = useState<Tab>('quoc-gia');
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  
  // Smart Planner states
  const [itinerary, setItinerary] = useState('');
  const [suggestion, setSuggestion] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Sync external activeTab prop with internal state if needed
    if (activeTab === 'quoc-gia' || activeTab === 'khu-vuc') {
      setCurrentTab(activeTab);
    }
  }, [activeTab]);

  useEffect(() => {
    const t = setTimeout(() => {
      if (query.trim().length > 0) {
        setSuggestions(allCountries.filter(c => c.toLowerCase().includes(query.toLowerCase())));
        setShowDropdown(true);
      } else {
        setSuggestions([]);
        setShowDropdown(false);
      }
    }, 500); 
    return () => clearTimeout(t);
  }, [query]);

  const handleSelect = (name: string) => {
    navigate(`/destination/${name.toLowerCase().replace(/\s+/g, '-')}`);
    setQuery('');
    setShowDropdown(false);
    setIsMobileSearchOpen(false);
  };

  const handleTabClick = (key: Tab) => {
    setCurrentTab(key);
    if (key === 'viet-nam') {
      navigate('/destination/vietnam');
    } else if ((key === 'quoc-gia' || key === 'khu-vuc') && onTabChange) {
      onTabChange(key);
    }
  };

  const handleSmartPlan = () => {
    if (!itinerary.trim()) return;
    setSuggestion('Đang tính toán lộ trình...');
    setTimeout(() => {
      if (itinerary.toLowerCase().includes('thái lan') || itinerary.toLowerCase().includes('singapore')) {
        setSuggestion('💡 Gợi ý tối ưu: Bạn nên mua **Gói eSIM Đông Nam Á** 10GB / 15 Ngày. Sẽ tiết kiệm hơn 30% so với mua lẻ từng nước!');
      } else {
        setSuggestion('💡 Gợi ý tối ưu: Bạn nên mua **Gói eSIM Global (Toàn cầu)** để không lo mất kết nối ở bất cứ đâu!');
      }
    }, 1200);
  };

  const tabs: { key: Tab; label: string }[] = [
    { key: 'quoc-gia', label: 'eSIM Quốc Gia' },
    { key: 'khu-vuc', label: 'eSIM Khu Vực' },
    { key: 'viet-nam', label: 'eSIM Việt Nam' },
    { key: 'smart_planner', label: '✨ Smart Planner' },
  ];

  return (
    <section className="relative w-full bg-slate-900 text-white overflow-hidden py-16 lg:py-24">
      {/* Ambient glowing blobs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[var(--primary)] rounded-full mix-blend-screen filter blur-[128px] opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[var(--accent)] rounded-full mix-blend-screen filter blur-[128px] opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 flex flex-col lg:flex-row items-center gap-10">
        
        {/* === Left Content === */}
        <div className="flex-1 text-left z-10 w-full">
          <p className="text-[var(--accent)] font-bold tracking-widest text-sm uppercase mb-4 drop-shadow-sm">ESIM QUỐC TẾ</p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6">
            <span className="text-gradient">Kết nối</span> mọi lúc<br/>mọi nơi.
          </h1>
          <p className="text-slate-300 text-lg md:text-xl font-light mb-10 max-w-lg">
            Du lịch thông minh với các gói eSIM tại hơn 200 quốc gia. Không còn phí chuyển vùng đắt đỏ.
          </p>

          {/* Search bar & Planner */}
          <div className="relative max-w-xl glass-dark rounded-3xl shadow-2xl overflow-hidden border border-white/10">
            {currentTab === 'smart_planner' ? (
              <div className="p-6 flex flex-col gap-4 bg-white/5">
                <p className="text-sm text-slate-300 font-medium">Nhập lịch trình (VD: "Việt Nam -&gt; Thái Lan -&gt; Singapore trong 10 ngày") và AI sẽ gợi ý gói eSIM rẻ nhất.</p>
                <textarea
                  className="w-full p-4 text-lg rounded-2xl border border-white/10 focus:ring-2 focus:ring-[var(--accent)] bg-white/10 text-white outline-none transition-all placeholder-slate-400 min-h-[100px] backdrop-blur-md"
                  placeholder="Hành trình bay của bạn..."
                  value={itinerary}
                  onChange={(e) => setItinerary(e.target.value)}
                />
                <button 
                  onClick={handleSmartPlan}
                  className="self-end bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white px-6 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity shadow-lg shadow-[var(--primary)]/30"
                >
                  Tư vấn Gói Cước
                </button>
                
                {suggestion && (
                  <div className="mt-2 p-4 bg-[var(--primary)]/20 border border-[var(--primary)]/40 rounded-xl text-white text-sm animate-in fade-in duration-300 backdrop-blur-md">
                    <span className="font-medium" dangerouslySetInnerHTML={{ __html: suggestion.replace(/\*\*(.*?)\*\*/g, '<strong class="text-[var(--accent)]">$1</strong>') }} />
                  </div>
                )}
              </div>
            ) : (
              <div className={`p-2 bg-white/5 relative ${isMobileSearchOpen ? 'fixed inset-0 z-[100] bg-slate-900 p-4 h-full w-full max-w-none md:relative md:p-2 md:bg-white/5 md:h-auto md:z-auto' : ''}`}>
                {isMobileSearchOpen && (
                  <div className="flex justify-between items-center mb-4 md:hidden">
                    <h2 className="text-xl font-bold text-white">Tìm kiếm điểm đến</h2>
                    <button onClick={() => setIsMobileSearchOpen(false)} className="p-2 text-slate-400">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                )}
                
                <div className="flex items-center bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 ring-2 ring-transparent focus-within:ring-[var(--accent)] transition-all">
                  <div className="pl-5 text-slate-400 shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    onFocus={() => { if (window.innerWidth < 768) setIsMobileSearchOpen(true); }}
                    placeholder="Tìm kiếm điểm đến..."
                    className="flex-1 px-4 py-5 text-lg text-white bg-transparent focus:outline-none placeholder-slate-400"
                  />
                  <button className="m-1.5 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white p-4 rounded-xl transition-all shadow-lg hover:shadow-[var(--primary)]/50 shrink-0 hover-lift">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>

                {/* Dropdown suggestions */}
                {(showDropdown || isMobileSearchOpen) && suggestions.length > 0 && (
                  <div className={`mt-2 bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden z-50 ${isMobileSearchOpen ? 'static shadow-none border-0 mt-4' : 'absolute top-full left-0 right-0 shadow-2xl'}`}>
                    {suggestions.map((s, i) => (
                      <button
                        key={i}
                        onClick={() => handleSelect(s)}
                        className="w-full flex items-center gap-3 px-5 py-4 hover:bg-slate-700 transition-colors text-left border-b border-slate-700 last:border-0"
                      >
                        <svg className="w-5 h-5 text-[var(--accent)] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" /></svg>
                        <span className="text-white font-medium text-lg">{s}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            {/* Tabs inside Search Container */}
            <div className="flex border-t border-white/10 bg-slate-900/50 backdrop-blur-xl">
              {tabs.map(t => (
                <button
                  key={t.key}
                  onClick={() => handleTabClick(t.key)}
                  className={`flex-1 py-4 text-sm font-semibold transition-colors duration-200 ${
                    currentTab === t.key
                      ? t.key === 'smart_planner' ? 'text-[var(--accent)] border-b-2 border-[var(--accent)] bg-purple-500/10' : 'text-white border-b-2 border-[var(--accent)] bg-white/5'
                      : t.key === 'smart_planner' ? 'text-purple-300 hover:text-purple-200' : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* === Right Illustration === */}
        <div className="hidden lg:flex flex-1 justify-end items-center relative z-10">
          <div className="relative w-80 h-96 flex flex-col items-center justify-center hover-lift cursor-pointer group">
            <div className="absolute inset-0 bg-gradient-to-tr from-[var(--primary)] to-[var(--accent)] rounded-[40px] transform rotate-3 opacity-20 group-hover:rotate-6 transition-transform"></div>
            <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-[40px] border border-white/20 transform -rotate-3 group-hover:-rotate-6 transition-transform"></div>
            
            <div className="relative z-10 w-48 h-48 bg-white rounded-3xl shadow-2xl flex items-center justify-center mb-6 border-4 border-indigo-100">
              <svg className="w-24 h-24 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm14 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
            </div>
            <span className="relative z-10 text-white font-bold text-lg drop-shadow-md">eSIM QR Code</span>
          </div>
        </div>
      </div>
    </section>
  );
}

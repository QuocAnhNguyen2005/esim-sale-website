import React, { useState } from 'react';

type Tab = 'local' | 'regional' | 'global' | 'smart_planner';

export default function HeroSearch() {
  const [activeTab, setActiveTab] = useState<Tab>('local');
  const [searchQuery, setSearchQuery] = useState('');
  const [itinerary, setItinerary] = useState('');
  const [suggestion, setSuggestion] = useState<string | null>(null);

  const handleSmartPlan = () => {
    if (!itinerary.trim()) return;
    setSuggestion('Đang tính toán lộ trình...');
    setTimeout(() => {
      // Mock logic: Nếu nhắc tới nhiều nước Đông Nam Á
      if (itinerary.toLowerCase().includes('thái lan') || itinerary.toLowerCase().includes('singapore')) {
        setSuggestion('💡 Gợi ý tối ưu: Bạn nên mua **Gói eSIM Đông Nam Á (Asia Regional)** 10GB / 15 Ngày. Sẽ tiết kiệm hơn 30% so với việc mua lẻ từng nước!');
      } else {
        setSuggestion('💡 Gợi ý tối ưu: Bạn nên mua **Gói eSIM Global (Toàn cầu)** để không lo mất kết nối ở bất cứ đâu!');
      }
    }, 1200);
  };

  return (
    <div className="relative w-full bg-slate-900 text-white py-28 px-4 flex flex-col items-center overflow-hidden">
      {/* Ambient glowing blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--primary)] rounded-full mix-blend-screen filter blur-[128px] opacity-40 animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[var(--accent)] rounded-full mix-blend-screen filter blur-[128px] opacity-40 animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      <div className="relative z-10 max-w-3xl w-full text-center mb-10">
        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
          <span className="text-gradient">Stay Connected,</span><br />Anywhere.
        </h1>
        <p className="text-lg md:text-2xl text-slate-300 font-light">
          Instant eSIMs for 200+ countries. No roaming fees.
        </p>
      </div>

      <div className="relative z-10 w-full max-w-2xl glass-dark rounded-3xl shadow-2xl overflow-hidden text-gray-900 border border-white/10">
        {/* Search Bar / Smart Planner Area */}
        <div className="relative p-2 bg-white/5">
          {activeTab === 'smart_planner' ? (
            <div className="p-5 flex flex-col gap-4">
              <p className="text-sm text-slate-300 font-medium">Nhập lịch trình của bạn (VD: "Việt Nam -&gt; Thái Lan -&gt; Singapore trong 10 ngày") và AI sẽ gợi ý gói eSIM tối ưu nhất.</p>
              <textarea
                className="w-full p-4 text-lg rounded-2xl border border-white/10 focus:ring-2 focus:ring-[var(--accent)] bg-white/10 text-white outline-none transition-all placeholder-slate-400 min-h-[100px] backdrop-blur-md"
                placeholder="Hành trình bay của bạn..."
                value={itinerary}
                onChange={(e) => setItinerary(e.target.value)}
              />
              <button 
                onClick={handleSmartPlan}
                className="self-end bg-[var(--primary)] text-white px-6 py-2.5 rounded-lg font-bold hover:bg-[var(--primary-hover)] transition-colors"
              >
                Tư vấn Gói Cước
              </button>
              
              {suggestion && (
                <div className="mt-4 p-4 bg-[var(--primary)]/20 border border-[var(--primary)]/40 rounded-xl text-white text-sm animate-in fade-in duration-300 backdrop-blur-md">
                  <span className="font-medium" dangerouslySetInnerHTML={{ __html: suggestion.replace(/\*\*(.*?)\*\*/g, '<strong class="text-[var(--accent)]">$1</strong>') }} />
                </div>
              )}
            </div>
          ) : (
            <>
              <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                className="w-full pl-14 pr-6 py-5 text-lg rounded-2xl border-none focus:ring-2 focus:ring-[var(--accent)] bg-white/10 text-white outline-none transition-all placeholder-slate-400 backdrop-blur-md"
                placeholder="Where do you want to go?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </>
          )}
        </div>

        {/* Tabs */}
        <div className="flex border-t border-white/10 bg-slate-900/50 backdrop-blur-xl">
          <button
            onClick={() => setActiveTab('local')}
            className={`flex-1 py-4 text-sm font-semibold transition-colors duration-200 ${
              activeTab === 'local' ? 'text-white border-b-2 border-[var(--accent)]' : 'text-slate-400 hover:text-white'
            }`}
          >
            Local eSIMs
          </button>
          <button
            onClick={() => setActiveTab('regional')}
            className={`flex-1 py-4 text-sm font-semibold transition-colors duration-200 ${
              activeTab === 'regional' ? 'text-white border-b-2 border-[var(--accent)]' : 'text-slate-400 hover:text-white'
            }`}
          >
            Regional eSIMs
          </button>
          <button
            onClick={() => setActiveTab('global')}
            className={`flex-1 py-4 text-sm font-semibold transition-colors duration-200 ${
              activeTab === 'global' ? 'text-white border-b-2 border-[var(--accent)]' : 'text-slate-400 hover:text-white'
            }`}
          >
            Global eSIMs
          </button>
          <button
            onClick={() => setActiveTab('smart_planner')}
            className={`flex-1 py-4 text-sm font-semibold transition-colors duration-200 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 ${
              activeTab === 'smart_planner' ? 'text-[var(--accent)] border-b-2 border-[var(--accent)]' : 'text-purple-300 hover:text-purple-200'
            }`}
          >
            ✨ Smart Planner
          </button>
        </div>
      </div>
    </div>
  );
}

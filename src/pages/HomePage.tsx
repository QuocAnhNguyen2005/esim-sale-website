import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import HeroSearch from '../components/esim/HeroSearch';

/* ── Data ── */
const popular = [
  { name: 'Nhật Bản', flag: '🇯🇵', badge: 'Best Seller' }, { name: 'Hàn Quốc', flag: '🇰🇷' },
  { name: 'Thái Lan', flag: '🇹🇭', badge: 'Hot' }, { name: 'Singapore', flag: '🇸🇬' },
  { name: 'Mỹ', flag: '🇺🇸' }, { name: 'Anh', flag: '🇬🇧' },
  { name: 'Pháp', flag: '🇫🇷' }, { name: 'Việt Nam', flag: '🇻🇳' },
  { name: 'Hồng Kông', flag: '🇭🇰' }, { name: 'Trung Quốc', flag: '🇨🇳' },
  { name: 'Đức', flag: '🇩🇪' }, { name: 'Ý', flag: '🇮🇹' },
  { name: 'Úc', flag: '🇦🇺' }, { name: 'Canada', flag: '🇨🇦' },
  { name: 'Tây Ban Nha', flag: '🇪🇸' }, { name: 'Bồ Đào Nha', flag: '🇵🇹' },
  { name: 'Mexico', flag: '🇲🇽' }, { name: 'Brazil', flag: '🇧🇷' },
  { name: 'Ấn Độ', flag: '🇮🇳' }, { name: 'Thổ Nhĩ Kỳ', flag: '🇹🇷' },
];

const regions = [
  { name: 'Châu Âu', icon: '🌍', key: 'chau-au' },
  { name: 'Châu Á', icon: '🌏', key: 'chau-a' },
  { name: 'Châu Phi', icon: '🌍', key: 'chau-phi' },
  { name: 'Quần đảo Caribe', icon: '🏝️', key: 'caribe' },
  { name: 'Toàn Cầu', icon: '🌐', key: 'toan-cau' },
  { name: 'Châu Mỹ Lating', icon: '🌎', key: 'chau-my' },
  { name: 'Trung Đông & Bắc Phi', icon: '🏜️', key: 'trung-dong' },
  { name: 'Bắc Mỹ', icon: '🌎', key: 'bac-my' },
  { name: 'Châu Đại Dương', icon: '🦘', key: 'chau-dai-duong' },
];

const whyChoose = [
  { icon: '💸', title: 'Tránh chi phí chuyển vùng', desc: 'eSIM từ các nhà mạng địa phương giúp bạn tiết kiệm chi phí chuyển vùng quốc tế.' },
  { icon: '🎯', title: 'Trả tiền vừa với nhu cầu', desc: 'Đến Việt Nam một tuần? Hãy mua gói 7 ngày thay vì gói tháng để tiết kiệm chi phí.' },
  { icon: '⚡', title: 'Gói dữ liệu tốc độ cao', desc: 'Tối ưu hóa tốc độ với chuyển đổi liền mạch giữa 5G và 4G LTE, tùy theo tín hiệu.' },
  { icon: '🔒', title: 'Giữ an toàn trực tuyến', desc: 'Tránh được các rủi ro an ninh mạng liên quan đến việc sử dụng WiFi miễn phí.' },
  { icon: '🔌', title: 'Kết nối dễ dàng', desc: 'Không cần đăng ký rắc rối. Chỉ cần cài đặt và kích hoạt trước khi bắt đầu chuyến đi.' },
  { icon: '📱', title: 'Giữ lại thẻ SIM hiện tại', desc: 'Giữ nguyên số hiện tại và duy trì kết nối mà không phải thông báo cho mọi người.' },
];

const reviews = [
  { name: 'Lại Hà', title: 'Dịch vụ chuyên nghiệp', text: 'Giao diện thân thiện giúp khách hàng dễ dàng tìm kiếm các gói cước. Tôi đã có thể đặt hàng eSIM ở bất cứ đâu và đi đến bất kỳ quốc gia nào.' },
  { name: 'Mr. Hello', title: 'Kết nối dữ liệu nhanh và đáng tin cậy', text: 'Kết nối internet nhanh và đáng tin cậy khi ở nước ngoài. Giá cả phải chăng và rất dễ sử dụng. Bộ phận hỗ trợ cũng rất chu đáo.' },
  { name: 'Mark', title: 'eSIM tốt nhất', text: 'Tôi đã mua eSIM cho chuyến đi đến Singapore, eSIM hoạt động tốt và ổn định trong suốt chuyến đi. Dịch vụ khách hàng tuyệt vời!' },
];

/* ── Reusable row item ── */
const RowItem = ({ name, icon, badge }: { name: string; icon: string; badge?: string }) => (
  <Link to={`/destination/${name.toLowerCase().replace(/\s+/g, '-')}`} className="flex items-center justify-between w-full px-5 py-4 bg-white rounded-2xl shadow-sm hover-lift border border-gray-100 transition-all duration-300 group">
    <div className="flex items-center gap-3">
      <span className="text-3xl leading-none drop-shadow-sm">{icon}</span>
      <span className="font-bold text-slate-800 text-sm group-hover:text-[var(--primary)] transition-colors">{name}</span>
      {badge && <span className="ml-1 px-2 py-0.5 text-[10px] font-black text-white bg-gradient-to-r from-red-500 to-pink-500 rounded-full uppercase tracking-wider shadow-sm">{badge}</span>}
    </div>
    <svg className="w-5 h-5 text-slate-400 group-hover:text-[var(--primary)] group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
  </Link>
);

export default function HomePage() {
  const [activeTab, setActiveTab] = React.useState<'quoc-gia' | 'khu-vuc'>('quoc-gia');

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-grow">

        {/* HERO */}
        <HeroSearch />
        
        {/* Destination Toggle */}
        <div className="flex justify-center mt-12 mb-4">
          <div className="bg-slate-100 p-1.5 rounded-xl flex items-center shadow-inner">
            <button 
              onClick={() => setActiveTab('quoc-gia')}
              className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'quoc-gia' ? 'bg-white text-[var(--primary)] shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Quốc gia nổi bật
            </button>
            <button 
              onClick={() => setActiveTab('khu-vuc')}
              className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'khu-vuc' ? 'bg-white text-[var(--primary)] shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              eSIM theo Khu vực
            </button>
          </div>
        </div>

        {/* ── BẢN ĐỒ PHỦ SÓNG TƯƠNG TÁC (INTERACTIVE COVERAGE MAP) ── */}
        <section className="py-20 bg-indigo-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
             {/* Abstract SVG Background simulating a Map Network */}
             <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                <circle cx="20%" cy="30%" r="5" fill="#fff" className="animate-ping" />
                <circle cx="80%" cy="50%" r="4" fill="#fff" className="animate-ping" style={{ animationDelay: '1s' }} />
                <circle cx="50%" cy="70%" r="6" fill="#fff" className="animate-ping" style={{ animationDelay: '2s' }} />
             </svg>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="text-center mb-10">
              <span className="bg-indigo-800 text-indigo-200 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 inline-block border border-indigo-700">Mới</span>
              <h2 className="text-3xl font-extrabold mb-4">Bản đồ Phủ sóng Toàn cầu (5G / 4G)</h2>
              <p className="text-indigo-200 max-w-2xl mx-auto">Kiểm tra vùng phủ sóng và chất lượng mạng tại bất kỳ quốc gia nào trước khi mua. Kết nối trực tiếp với hơn 200+ nhà mạng đối tác (MNOs).</p>
            </div>
            
            <div className="bg-indigo-950/80 backdrop-blur-md border border-indigo-800 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8 shadow-2xl">
              <div className="flex-1 w-full relative">
                {/* Simulated Map Visual */}
                <div className="aspect-video bg-indigo-900/50 rounded-2xl border border-indigo-700 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute text-indigo-500 font-bold opacity-30 text-[10rem]">🗺️</div>
                  <div className="absolute inset-0 bg-gradient-to-t from-indigo-950 to-transparent"></div>
                  
                  {/* Floating Mock Data points */}
                  <div className="absolute top-1/4 left-1/4 bg-white/10 backdrop-blur border border-white/20 p-2 rounded-lg text-xs cursor-pointer hover:bg-white/20 transition-all hover:scale-105">
                    <span className="font-bold text-green-400">● 5G</span> Tokyo, Nhật Bản
                  </div>
                  <div className="absolute bottom-1/3 right-1/4 bg-white/10 backdrop-blur border border-white/20 p-2 rounded-lg text-xs cursor-pointer hover:bg-white/20 transition-all hover:scale-105">
                    <span className="font-bold text-green-400">● 5G</span> Seoul, Hàn Quốc
                  </div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[var(--primary)] shadow-lg shadow-[var(--primary)]/50 p-3 rounded-xl text-sm font-bold animate-pulse cursor-pointer">
                    📍 Nhấp để Khám phá
                  </div>
                </div>
              </div>
              <div className="md:w-1/3 flex flex-col gap-4">
                <h3 className="text-xl font-bold">Trải nghiệm tương tác</h3>
                <ul className="space-y-3 text-sm text-indigo-200">
                  <li className="flex items-start gap-2"><span>🎯</span> Xem chính xác nhà mạng đối tác (Viettel, AIS, Singtel...)</li>
                  <li className="flex items-start gap-2"><span>📶</span> Phân tích chất lượng sóng theo khu vực địa lý</li>
                  <li className="flex items-start gap-2"><span>⚡</span> Tốc độ thực tế từ người dùng (Sắp ra mắt)</li>
                </ul>
                <button className="mt-4 bg-white text-indigo-900 font-bold py-3 rounded-xl hover:bg-indigo-50 transition-colors">
                  Mở Bản Đồ Khám Phá
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── Điểm đến phổ biến ── */}
        {activeTab === 'quoc-gia' && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Các điểm đến phổ biến</h2>
              <p className="text-gray-500">Các eSIM của chúng tôi được tin dùng bởi hàng triệu người trên toàn thế giới</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {popular.map((d, i) => <RowItem key={i} name={d.name} icon={d.flag} badge={d.badge} />)}
            </div>
            <div className="mt-10 text-center">
              <button className="bg-gray-900 hover:bg-gray-700 text-white px-8 py-3.5 rounded-lg font-bold text-sm transition-colors">
                Xem tất cả các điểm đến
              </button>
            </div>
          </div>
        </section>
        )}

        {/* ── eSIM Châu lục ── */}
        {activeTab === 'khu-vuc' && (
        <section className="py-20 bg-[#f8f9fa]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-2">eSIM Châu lục</h2>
              <p className="text-gray-500">Các eSIM của chúng tôi được tin dùng bởi hàng triệu người trên toàn thế giới</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {regions.map((r, i) => <RowItem key={i} name={r.name} icon={r.icon} />)}
            </div>
            <div className="mt-10 text-center">
              <button className="bg-gray-900 hover:bg-gray-700 text-white px-8 py-3.5 rounded-lg font-bold text-sm transition-colors">
                Xem tất cả các điểm đến
              </button>
            </div>
          </div>
        </section>
        )}

        {/* ── Hướng dẫn 3 bước ── */}
        <section id="activation" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-14">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Làm thế nào để bắt đầu sử dụng eSIM du lịch?</h2>
              <p className="text-gray-500">Sau đây là cách bắt đầu sử dụng eSIM du lịch:</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="bg-[#f8f9fa] rounded-3xl p-8 flex flex-col relative group">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Bước 1</span>
                <div className="flex-1 bg-white rounded-2xl p-6 shadow-sm mb-8 flex flex-col gap-4 justify-center relative z-10">
                  <div className="h-12 rounded-full border-2 border-gray-200 flex items-center px-5 gap-4">
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                    <span className="text-base text-gray-500">1 GB</span>
                  </div>
                  <div className="h-14 rounded-full bg-indigo-600 flex items-center px-5 gap-4 shadow-md">
                    <div className="w-5 h-5 rounded-full bg-white"></div>
                    <span className="text-base font-bold text-white">5 GB</span>
                  </div>
                  <div className="h-12 rounded-full border-2 border-gray-200 flex items-center px-5 gap-4">
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                    <span className="text-base text-gray-500">10 GB</span>
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">Chọn điểm đến và gói của bạn</h3>
                <p className="text-sm text-gray-500 leading-relaxed">Chọn điểm đến của bạn và gói cước data phù hợp với bạn</p>
                {/* Connecting line */}
                <div className="hidden md:block absolute top-1/2 left-[calc(100%-2rem)] w-[calc(100%+4rem)] border-t-2 border-dashed border-gray-300 z-0 opacity-50" />
              </div>

              {/* Step 2 */}
              <div className="bg-[#f8f9fa] rounded-3xl p-8 flex flex-col relative group">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Bước 2</span>
                <div className="flex-1 bg-white rounded-2xl p-6 shadow-sm mb-8 flex items-center justify-center gap-4 relative z-10">
                  {[1, 2, 3].map(n => (
                    <div key={n} className={`w-16 h-16 rounded-full flex items-center justify-center font-bold text-2xl ${n === 1 ? 'bg-indigo-600 text-white shadow-lg' : 'border-2 border-gray-200 text-gray-400'}`}>{n}</div>
                  ))}
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">Cài đặt eSIM trên thiết bị của bạn</h3>
                <p className="text-sm text-gray-500 leading-relaxed">Tiến hành cài đặt eSIM theo các bước</p>
                {/* Connecting line */}
                <div className="hidden md:block absolute top-1/2 left-[calc(100%-2rem)] w-[calc(100%+4rem)] border-t-2 border-dashed border-gray-300 z-0 opacity-50" />
              </div>

              {/* Step 3 */}
              <div className="bg-[#f8f9fa] rounded-3xl p-8 flex flex-col relative">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Bước 3</span>
                <div className="flex-1 bg-white rounded-2xl p-6 shadow-sm mb-8 flex items-center justify-center relative z-10">
                  <div className="w-28 h-28 rounded-full bg-indigo-600 flex items-center justify-center shadow-xl">
                    <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">Kích hoạt gói dữ liệu trước khi bắt đầu chuyến đi</h3>
                <p className="text-sm text-gray-500 leading-relaxed">Hãy nhớ thực hiện việc này trước khi cất cánh vì cần có kết nối internet</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Tại sao nên chọn ── */}
        <section className="py-20 bg-[#f8f9fa]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-14">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Tại sao nên chọn Global eSIM</h2>
              <p className="text-gray-500">eSIM rất tuyệt vời vì rất nhiều lí do</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {whyChoose.map((item, i) => (
                <div key={i} className="bg-white rounded-2xl p-7 shadow-[0_1px_8px_rgba(0,0,0,0.07)] hover:shadow-[0_4px_20px_rgba(79,70,229,0.12)] transition-shadow border border-gray-50">
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Reviews ── */}
        <section id="reviews" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Hãy xem khách hàng nói gì về chúng tôi</h2>
              <p className="text-gray-500">Bạn hãy tự kiểm chứng</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {reviews.map((r, i) => (
                <div key={i} className="bg-[#f8f9fa] rounded-2xl p-7 flex flex-col gap-4 border border-gray-100">
                  <div className="flex gap-1">
                    {Array(5).fill(0).map((_, j) => <span key={j} className="text-indigo-500 text-sm">★</span>)}
                  </div>
                  <h3 className="font-bold text-gray-900">{r.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed flex-1">{r.text}</p>
                  <div className="flex items-center gap-3 pt-3 border-t border-gray-200">
                    <div className="w-9 h-9 bg-indigo-100 rounded-full flex items-center justify-center font-bold text-indigo-600 text-sm">{r.name[0]}</div>
                    <span className="font-semibold text-gray-800 text-sm">{r.name}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 text-center">
              <p className="text-gray-500 text-sm font-medium">Dựa trên <span className="font-bold text-gray-900">39.000+</span> đánh giá của khách hàng</p>
            </div>
          </div>
        </section>

        {/* ── Lưu ý quan trọng (Devices & FAQ) ── */}
        <section id="devices" className="py-16 bg-indigo-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-extrabold text-white text-center mb-8">Những lưu ý mà bạn nên nhớ</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: '📵', title: 'Không có số điện thoại địa phương', desc: 'eSIM này chỉ bao gồm dữ liệu. Nó không cho phép thực hiện cuộc gọi hoặc gửi SMS. Bạn có thể dùng WhatsApp hoặc Skype.' },
                { icon: '📱', title: 'Điện thoại phải hỗ trợ eSIM', desc: 'Hãy đảm bảo điện thoại của bạn đã được mở khóa và tương thích với công nghệ eSIM.' },
                { icon: '✈️', title: 'Cài đặt trước khi đi du lịch', desc: 'Quét mã QR trước khi cất cánh. Đừng kích hoạt cho đến khi hạ cánh. Hãy in mã QR phòng trường hợp cần thiết.' },
              ].map((item, i) => (
                <div key={i} className="bg-white/10 backdrop-blur rounded-2xl p-6 text-white border border-white/20">
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h3 className="font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-indigo-100 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}

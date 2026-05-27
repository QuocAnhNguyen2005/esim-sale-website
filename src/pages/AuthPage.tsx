import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

type AuthMode = 'login' | 'register';

export default function AuthPage({ defaultMode }: { defaultMode?: AuthMode }) {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine active tab from prop or URL path
  const initialMode: AuthMode =
    defaultMode ?? (location.pathname === '/register' ? 'register' : 'login');
  const [mode, setMode] = useState<AuthMode>(initialMode);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const switchTab = (tab: AuthMode) => {
    setMode(tab);
    setError('');
    navigate(tab === 'login' ? '/login' : '/register', { replace: true });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (mode === 'register' && password !== confirm) {
      setError('Mật khẩu xác nhận không khớp.');
      return;
    }
    setLoading(true);
    // TODO: hook up real Supabase auth here
    setTimeout(() => {
      setLoading(false);
      if (mode === 'login') {
        localStorage.setItem('authToken', 'demo-token');
        navigate('/my-esims');
      } else {
        navigate('/login');
      }
    }, 1200);
  };

  return (
    <div className="relative min-h-screen bg-[#f5f5f0] flex flex-col items-center justify-center overflow-hidden px-4">

      {/* ── Decorative blobs ── */}
      <div className="absolute bottom-0 left-0 w-[420px] h-[260px] pointer-events-none">
        <svg viewBox="0 0 420 260" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="160" cy="260" rx="220" ry="160" fill="#f5b942" opacity="0.85"/>
        </svg>
      </div>
      <div className="absolute bottom-0 left-[120px] w-[380px] h-[220px] pointer-events-none">
        <svg viewBox="0 0 380 220" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="190" cy="220" rx="200" ry="140" fill="#e8624a" opacity="0.75"/>
        </svg>
      </div>
      <div className="absolute bottom-0 right-0 w-[340px] h-[200px] pointer-events-none">
        <svg viewBox="0 0 340 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="180" cy="200" rx="200" ry="130" fill="#b5396e" opacity="0.8"/>
        </svg>
      </div>
      <div className="absolute bottom-0 right-[80px] w-[300px] h-[170px] pointer-events-none">
        <svg viewBox="0 0 300 170" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="150" cy="170" rx="170" ry="110" fill="#c84d8e" opacity="0.6"/>
        </svg>
      </div>

      {/* ── Logo ── */}
      <div className="mb-6 flex items-center gap-2 z-10">
        <div className="flex items-end gap-0.5">
          <div className="w-2.5 h-5 bg-indigo-600 rounded-full -rotate-12" />
          <div className="w-2.5 h-7 bg-indigo-500 rounded-full -rotate-12" />
          <div className="w-2.5 h-9 bg-indigo-400 rounded-full -rotate-12" />
        </div>
        <span className="font-black text-2xl text-gray-900 tracking-tight">
          Global<span className="text-indigo-600">eSIM</span>
        </span>
      </div>

      {/* ── Card ── */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">

        {/* Tabs */}
        <div className="flex border-b border-gray-100">
          <button
            onClick={() => switchTab('login')}
            className={`flex-1 py-4 text-sm font-semibold transition-all ${
              mode === 'login'
                ? 'text-gray-900 border-b-[3px] border-indigo-600 bg-white'
                : 'text-gray-400 bg-gray-50 hover:text-gray-600'
            }`}
          >
            Đăng nhập
          </button>
          <button
            onClick={() => switchTab('register')}
            className={`flex-1 py-4 text-sm font-semibold transition-all ${
              mode === 'register'
                ? 'text-gray-900 border-b-[3px] border-indigo-600 bg-white'
                : 'text-gray-400 bg-gray-50 hover:text-gray-600'
            }`}
          >
            Đăng ký
          </button>
        </div>

        {/* Form body */}
        <form onSubmit={handleSubmit} className="p-8 flex flex-col gap-4">

          {/* Error */}
          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2.5">
              {error}
            </p>
          )}

          {/* Register-only: full name */}
          {mode === 'register' && (
            <input
              type="text"
              placeholder="Nhập họ và tên"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-[#f5f5f3] border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent transition"
            />
          )}

          {/* Email */}
          <input
            type="email"
            placeholder={mode === 'login' ? 'Email' : 'Nhập email'}
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl bg-[#f5f5f3] border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent transition"
          />

          {/* Password */}
          <input
            type="password"
            placeholder={mode === 'login' ? 'Mật khẩu' : 'Nhập mật khẩu'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl bg-[#f5f5f3] border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent transition"
          />

          {/* Register-only: confirm password */}
          {mode === 'register' && (
            <input
              type="password"
              placeholder="Nhập lại mật khẩu"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-[#f5f5f3] border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent transition"
            />
          )}

          {/* Login-only: remember + forgot */}
          {mode === 'login' && (
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-500 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={e => setRemember(e.target.checked)}
                  className="accent-indigo-600"
                />
                Nhớ mật khẩu
              </label>
              <a href="#" className="text-indigo-600 hover:underline font-medium">Quên mật khẩu?</a>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gray-900 hover:bg-gray-700 text-white font-bold text-sm tracking-widest uppercase transition-all shadow-md disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin w-4 h-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                Đang xử lý...
              </>
            ) : mode === 'login' ? 'Đăng nhập' : 'Đăng ký'}
          </button>

          {/* Social divider */}
          <div className="flex items-center gap-3 my-1">
            <div className="flex-1 h-px bg-gray-200"/>
            <span className="text-xs text-gray-400 font-medium tracking-wider uppercase">
              Hoặc đăng nhập với
            </span>
            <div className="flex-1 h-px bg-gray-200"/>
          </div>

          {/* Social buttons */}
          <div className="flex justify-center gap-4">
            <button
              type="button"
              className="w-12 h-12 rounded-xl bg-[#1877F2] hover:bg-[#166fe5] flex items-center justify-center shadow-md transition-transform hover:scale-105"
              aria-label="Đăng nhập với Facebook"
            >
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.095 10.125 24v-8.437H7.078v-3.49h3.047V9.413c0-3.017 1.792-4.686 4.533-4.686 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.93-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.095 24 18.1 24 12.073z"/>
              </svg>
            </button>
            <button
              type="button"
              className="w-12 h-12 rounded-xl bg-white hover:bg-gray-50 flex items-center justify-center shadow-md border border-gray-200 transition-transform hover:scale-105"
              aria-label="Đăng nhập với Google"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            </button>
          </div>

          {/* Register-only: terms */}
          {mode === 'register' && (
            <p className="text-xs text-gray-400 text-center leading-relaxed mt-1">
              Bằng cách đăng ký, bạn đồng ý với{' '}
              <a href="#" className="text-indigo-600 hover:underline">Điều khoản dịch vụ</a>
              {' '}và{' '}
              <a href="#" className="text-indigo-600 hover:underline">Chính sách bảo mật</a>
              {' '}của chúng tôi.
            </p>
          )}
        </form>
      </div>

      {/* Back to home */}
      <Link to="/" className="mt-6 z-10 text-sm text-gray-500 hover:text-indigo-600 transition-colors">
        ← Quay về trang chủ
      </Link>
    </div>
  );
}

import React, { useState } from 'react';

type AuthMode = 'login' | 'register';

interface AuthModalProps {
  defaultMode?: AuthMode;
  onClose: () => void;
}

export default function AuthModal({ defaultMode = 'login', onClose }: AuthModalProps) {
  const [mode, setMode] = useState<AuthMode>(defaultMode);
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
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (mode === 'register' && password !== confirm) {
      setError('Mật khẩu xác nhận không khớp.');
      return;
    }
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      if (mode === 'login') {
        localStorage.setItem('authToken', 'demo-token');
        localStorage.setItem('userName', 'Quốc Anh');
        window.location.reload(); // Reload to update header
      } else {
        setMode('login');
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900 bg-opacity-60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-200">
        
        {/* Close button */}
        <button onClick={onClose} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors z-10">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Tabs */}
        <div className="flex border-b border-gray-100 mt-2">
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
          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2.5">
              {error}
            </p>
          )}

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

          <input
            type="email"
            placeholder={mode === 'login' ? 'Email' : 'Nhập email'}
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl bg-[#f5f5f3] border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent transition"
          />

          <input
            type="password"
            placeholder={mode === 'login' ? 'Mật khẩu' : 'Nhập mật khẩu'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl bg-[#f5f5f3] border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent transition"
          />

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

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gray-900 hover:bg-gray-700 text-white font-bold text-sm tracking-widest uppercase transition-all shadow-md disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? 'Đang xử lý...' : (mode === 'login' ? 'Đăng nhập' : 'Đăng ký')}
          </button>
        </form>
      </div>
    </div>
  );
}

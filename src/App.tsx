import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import AuthPage from './pages/AuthPage';
import NotFound from './pages/NotFound';
import BottomNav from './components/common/BottomNav';
import ProtectedRoute from './components/ProtectedRoute';
import HistoryPage from './pages/HistoryPage';
import SettingsPage from './pages/SettingsPage';
import ProfileMobilePage from './pages/ProfileMobilePage';
import CountryDetailPage from './pages/CountryDetailPage';
import FloatingDeviceChecker from './components/common/FloatingDeviceChecker';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';

function CoBrandingWrapper({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const partner = params.get('partner');
    if (partner === 'vcb') {
      document.documentElement.style.setProperty('--primary', '#009933'); // VCB Green
      document.documentElement.style.setProperty('--primary-hover', '#007a29');
      document.documentElement.style.setProperty('--primary-light', '#e6f5ea');
      // Set an indicator in localStorage so components can show discount logic
      localStorage.setItem('partner', 'vcb');
    }
  }, [location.search]);

  return <>{children}</>;
}

function App() {
  return (
    <BrowserRouter>
      <CoBrandingWrapper>
        <div className="pb-16 md:pb-0"> {/* padding-bottom for mobile BottomNav */}
          <Routes>
        {/* Trang chủ */}
        <Route path="/" element={<HomePage />} />

        {/* Đăng nhập / Đăng ký */}
        <Route path="/login"    element={<AuthPage defaultMode="login" />} />
        <Route path="/register" element={<AuthPage defaultMode="register" />} />

        {/* Trang danh sách gói theo quốc gia */}
        <Route path="/destination/:countrySlug" element={<CountryDetailPage />} />

        {/* Khu vực quản lý khách hàng - Yêu cầu Đăng nhập */}
        <Route element={<ProtectedRoute />}>
          <Route path="/my-esims" element={<DashboardPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/profile" element={<ProfileMobilePage />} />
        </Route>

        {/* Admin Portal */}
        <Route path="/admin" element={<AdminDashboardPage />} />

        {/* Trang 404 */}
        <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <BottomNav />
        <FloatingDeviceChecker />
      </CoBrandingWrapper>
    </BrowserRouter>
  );
}

export default App;

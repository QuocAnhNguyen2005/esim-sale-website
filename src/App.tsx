import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Trang chủ: / */}
        <Route path="/" element={<HomePage />} />
        
        {/* Trang danh sách gói theo quốc gia */}
        {/* <Route path="/destination/:country" element={<CountryPage />} /> */}
        
        {/* Trang thanh toán */}
        {/* <Route path="/checkout" element={<CheckoutPage />} /> */}

        {/* Khu vực quản lý khách hàng */}
        <Route path="/my-esims" element={<DashboardPage />} />

        {/* Trang 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

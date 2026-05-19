import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';
import UserDashboard from './components/UserDashboard'; // Giả sử tạm thời import từ thư mục cũ để đỡ phải code lại

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<UserDashboard esims={[]} />} />
        {/* Route bắt tất cả các đường dẫn sai -> Hiển thị 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

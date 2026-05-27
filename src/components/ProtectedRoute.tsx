import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export default function ProtectedRoute() {
  const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
  const location = useLocation();

  if (!token) {
    // Nếu chưa đăng nhập, chuyển hướng về trang chủ và có thể thêm tham số để mở modal
    return <Navigate to="/?login=true" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

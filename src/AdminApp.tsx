import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';

// A simple Admin Login Page stub for now
function AdminLoginPage() {
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('adminToken', 'mock-admin-token');
    window.location.href = '/admin/dashboard';
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-black text-gray-900 mb-6 text-center">Admin Portal</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email / Username</label>
            <input required type="text" className="w-full px-4 py-2 border rounded-xl" defaultValue="admin" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
            <input required type="password" className="w-full px-4 py-2 border rounded-xl" defaultValue="password" />
          </div>
          <button type="submit" className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition">
            Login as Administrator
          </button>
        </form>
      </div>
    </div>
  );
}

// Protected Route specific for Admin
function AdminProtectedRoute({ children }: { children: React.ReactNode }) {
  const adminToken = localStorage.getItem('adminToken');
  if (!adminToken) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}

export default function AdminApp() {
  return (
    <BrowserRouter basename="/admin">
      <Routes>
        <Route path="/" element={<AdminLoginPage />} />
        <Route 
          path="/dashboard" 
          element={
            <AdminProtectedRoute>
              <AdminDashboardPage />
            </AdminProtectedRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

import React from 'react';
import { HashRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import AdminLayout from './components/admin/AdminLayout';

// View imports
import AdminDashboardView from './pages/admin/AdminDashboardView';
import AdminCatalogView from './pages/admin/AdminCatalogView';
import AdminOrderView from './pages/admin/AdminOrderView';
import AdminCustomerView from './pages/admin/AdminCustomerView';

import InventoryManager from './pages/admin/InventoryManager';

function Reconciliation() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Báo cáo Đối soát (Reconciliation)</h2>
      <p className="text-gray-600 text-sm mb-4">
        Tải file CSV từ VNPay/Ngân hàng để hệ thống tự động đối soát giao dịch (Auto-Reconciliation).
      </p>
    </div>
  );
}

function SystemSettings() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Cài đặt Hệ thống</h2>
      <p className="text-gray-600 text-sm mb-4">
        Cấu hình Webhook, Audit Logs, Connection Pooling và API Keys.
      </p>
    </div>
  );
}

// A simple Admin Login Page stub for now
function AdminLoginPage() {
  const navigate = useNavigate();
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('adminToken', 'mock-admin-token');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-black text-gray-900 mb-6 text-center">Admin Portal</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email / Username</label>
            <input required type="text" className="w-full px-4 py-2 border border-gray-300 rounded-xl" defaultValue="admin" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
            <input required type="password" className="w-full px-4 py-2 border border-gray-300 rounded-xl" defaultValue="password" />
          </div>
          <button type="submit" className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition">
            Đăng nhập Administrator
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
    <HashRouter>
      <Routes>
        <Route path="/" element={<AdminLoginPage />} />
        
        {/* Protected Dashboard Layout */}
        <Route 
          element={
            <AdminProtectedRoute>
              <AdminLayout />
            </AdminProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<AdminDashboardView />} />
          <Route path="/inventory" element={<InventoryManager />} />
          <Route path="/packages" element={<AdminCatalogView />} />
          <Route path="/orders" element={<AdminOrderView />} />
          <Route path="/crm" element={<AdminCustomerView />} />
          <Route path="/reconciliation" element={<Reconciliation />} />
          <Route path="/settings" element={<SystemSettings />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconDashboard, IconOrder, IconUsers, IconPackage } from './AdminIcons';
import AdminDashboardView from './AdminDashboardView';
import AdminOrderView from './AdminOrderView';
import AdminCustomerView from './AdminCustomerView';
import AdminCatalogView from './AdminCatalogView';
import AdminB2BView from './AdminB2BView';

type Tab = 'dashboard' | 'orders' | 'crm' | 'catalog' | 'b2b';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const navigate = useNavigate();

  // MOCK ROLE (In real app, this comes from token/DB)
  const userRole = 'SUPER_ADMIN'; 

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/');
  };

  const navItems: { id: Tab, label: string, icon: any, roles: string[] }[] = [
    { id: 'dashboard', label: 'Analytics', icon: IconDashboard, roles: ['SUPER_ADMIN'] },
    { id: 'orders', label: 'Orders & Reconcile', icon: IconOrder, roles: ['SUPER_ADMIN', 'FINANCE', 'SUPPORT'] },
    { id: 'crm', label: 'CRM (360 View)', icon: IconUsers, roles: ['SUPER_ADMIN', 'SUPPORT'] },
    { id: 'catalog', label: 'Products & Vendor', icon: IconPackage, roles: ['SUPER_ADMIN'] },
    { id: 'b2b', label: 'B2B Partners', icon: IconUsers, roles: ['SUPER_ADMIN'] },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#09090b] text-white flex flex-col hidden md:flex shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-gray-800">
          <div className="font-black text-xl tracking-tight">Global<span className="text-indigo-500">eSIM</span><span className="ml-1 text-[10px] align-top text-gray-400 font-mono">B2B</span></div>
        </div>
        <div className="p-4 flex-1 space-y-1">
          {navItems.filter(item => item.roles.includes(userRole)).map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === item.id ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </div>
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-8 h-8 rounded bg-indigo-900 text-indigo-300 flex items-center justify-center font-bold text-xs">SA</div>
            <div>
              <p className="text-sm font-bold text-white">Super Admin</p>
              <p className="text-[10px] text-gray-500 uppercase tracking-wider">{userRole}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="w-full text-left px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
            Đăng xuất
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:hidden shrink-0">
          <div className="font-black text-lg">Admin Portal</div>
          <button onClick={handleLogout} className="text-sm font-bold text-gray-600">Đăng xuất</button>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {activeTab === 'dashboard' && <AdminDashboardView />}
          {activeTab === 'orders' && <AdminOrderView />}
          {activeTab === 'crm' && <AdminCustomerView />}
          {activeTab === 'catalog' && <AdminCatalogView />}
          {activeTab === 'b2b' && <AdminB2BView />}
        </div>
      </main>
    </div>
  );
}

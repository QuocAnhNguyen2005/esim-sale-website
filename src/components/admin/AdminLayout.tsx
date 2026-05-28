import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Layers, 
  ShoppingCart, 
  Users, 
  FileSpreadsheet, 
  Settings,
  Search,
  Bell,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

const SIDEBAR_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { id: 'inventory', label: 'Quản lý Kho eSIM', icon: Package, path: '/inventory' },
  { id: 'packages', label: 'Quản lý Gói cước', icon: Layers, path: '/packages' },
  { id: 'orders', label: 'Quản lý Đơn hàng', icon: ShoppingCart, path: '/orders' },
  { id: 'crm', label: 'CRM Khách hàng', icon: Users, path: '/crm' },
  { id: 'reconciliation', label: 'Báo cáo Đối soát', icon: FileSpreadsheet, path: '/reconciliation' },
  { id: 'settings', label: 'Cài đặt Hệ thống', icon: Settings, path: '/settings' },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/');
  };

  const navClass = ({ isActive }: { isActive: boolean }) => cn(
    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
    isActive ? "bg-indigo-600 text-white" : "text-gray-400 hover:text-white hover:bg-gray-800"
  );

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans text-gray-900">
      {/* MOBILE SIDEBAR OVERLAY */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 md:hidden" 
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside className={cn(
        "fixed md:static inset-y-0 left-0 z-50 w-64 bg-[#09090b] text-white flex flex-col transition-transform duration-300 md:translate-x-0 shrink-0",
        mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-800">
          <div className="font-black text-xl tracking-tight">
            Global<span className="text-indigo-500">eSIM</span>
            <span className="ml-1 text-[10px] align-top text-gray-400 font-mono">ADMIN</span>
          </div>
          <button className="md:hidden text-gray-400" onClick={() => setMobileMenuOpen(false)}>
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4 flex-1 overflow-y-auto space-y-1">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-3">Menu Chính</div>
          {SIDEBAR_ITEMS.map(item => (
            <NavLink
              key={item.id}
              to={item.path}
              className={navClass}
              onClick={() => setMobileMenuOpen(false)}
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center font-bold text-sm shadow-inner">
              AD
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-white truncate">Administrator</p>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider truncate">Super Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* TOPBAR */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8 shrink-0 z-10 shadow-sm">
          <div className="flex items-center gap-4 flex-1">
            <button 
              className="md:hidden text-gray-600 hover:text-gray-900" 
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
            
            {/* Global Search */}
            <div className="hidden sm:flex items-center max-w-md w-full relative">
              <Search className="absolute left-3 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Tìm kiếm ICCID, Đơn hàng, Khách hàng..." 
                className="w-full pl-10 pr-4 py-2 bg-gray-100 border-transparent rounded-full text-sm focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            {/* Alerts */}
            <button className="relative text-gray-500 hover:text-gray-700 transition-colors">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            
            <div className="h-6 w-px bg-gray-200 hidden sm:block"></div>
            
            {/* User Dropdown / Logout */}
            <div className="flex items-center gap-2">
              <button 
                onClick={handleLogout} 
                className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-red-600 transition-colors"
                title="Đăng xuất"
              >
                <span className="hidden sm:inline">Đăng xuất</span>
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </header>

        {/* PAGE OUTLET */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50/50">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

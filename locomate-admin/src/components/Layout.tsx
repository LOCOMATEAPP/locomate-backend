import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  Building2, Store, LogOut, LayoutDashboard, Menu, X,
  Users, Tag, BarChart3, Activity, ChevronRight, Bell, Settings, Image
} from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/malls', icon: Building2, label: 'Malls', end: false },
  { to: '/stores', icon: Store, label: 'Stores', end: false },
  { to: '/users', icon: Users, label: 'Users', end: false },
  { to: '/offers', icon: Tag, label: 'Offers', end: false },
  { to: '/banners', icon: Image, label: 'Banners', end: false },
  { to: '/analytics', icon: BarChart3, label: 'Analytics', end: false },
  { to: '/activity', icon: Activity, label: 'Activity Log', end: false },
];

const pageTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/malls': 'Mall Management',
  '/stores': 'Store Management',
  '/users': 'User Management',
  '/offers': 'Offer Management',
  '/banners': 'Banner Management',
  '/analytics': 'Analytics',
  '/activity': 'Activity Log',
};

export default function Layout() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const currentTitle = pageTitles[location.pathname] || 'Locomate';
  const initials = admin?.name?.split(' ').map((n: string) => n[0]).join('').toUpperCase() || 'A';

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#0f1117' }}>
      {/* Sidebar */}
      <aside
        className={`${collapsed ? 'w-16' : 'w-60'} flex flex-col flex-shrink-0 transition-all duration-300 relative`}
        style={{ background: '#13151f', borderRight: '1px solid rgba(255,255,255,0.06)', zIndex: 10 }}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-4 py-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          {!collapsed && (
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
                <Building2 size={16} className="text-white" />
              </div>
              <span className="font-bold text-white text-base tracking-tight">Locomate</span>
            </div>
          )}
          {collapsed && (
            <div className="w-8 h-8 rounded-lg flex items-center justify-center mx-auto" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
              <Building2 size={16} className="text-white" />
            </div>
          )}
          {!collapsed && (
            <button onClick={() => setCollapsed(true)} className="text-slate-500 hover:text-slate-300 transition-colors">
              <X size={16} />
            </button>
          )}
        </div>

        {collapsed && (
          <button onClick={() => setCollapsed(false)} className="flex justify-center py-3 text-slate-500 hover:text-slate-300 transition-colors">
            <Menu size={16} />
          </button>
        )}

        {/* Nav */}
        <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto">
          {navItems.map(({ to, icon: Icon, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `nav-item flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer ${isActive ? 'active' : ''} ${collapsed ? 'justify-center' : ''}`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon size={18} className={isActive ? 'text-indigo-400' : 'text-slate-500'} />
                  {!collapsed && (
                    <span className={`text-sm font-medium flex-1 ${isActive ? 'text-indigo-300' : 'text-slate-400'}`}>{label}</span>
                  )}
                  {!collapsed && isActive && <ChevronRight size={14} className="text-indigo-500" />}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* User */}
        <div className="p-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          {!collapsed && (
            <div className="flex items-center gap-3 px-2 py-2 mb-1 rounded-lg" style={{ background: 'rgba(255,255,255,0.03)' }}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
                {initials}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-white truncate">{admin?.name}</p>
                <p className="text-xs text-slate-500 truncate">{admin?.role || 'Admin'}</p>
              </div>
            </div>
          )}
          <button
            onClick={handleLogout}
            className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors ${collapsed ? 'justify-center' : ''}`}
          >
            <LogOut size={16} />
            {!collapsed && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="flex items-center justify-between px-6 py-4 flex-shrink-0"
          style={{ background: '#13151f', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div>
            <h1 className="text-lg font-semibold text-white">{currentTitle}</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-300 transition-colors"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <Bell size={16} />
            </button>
            <button className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-300 transition-colors"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <Settings size={16} />
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

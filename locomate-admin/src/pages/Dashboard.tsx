import { useEffect, useState } from 'react';
import { Building2, Store, TrendingUp, Users, ArrowUpRight, MapPin, Tag, Activity } from 'lucide-react';
import { mallsApi } from '../api/malls';
import { storesApi } from '../api/stores';
import { useNavigate } from 'react-router-dom';

const quickActions = [
  { label: 'Add Mall', desc: 'Register a new shopping mall', icon: Building2, to: '/malls', color: '#6366f1' },
  { label: 'Add Store', desc: 'Add a store to a mall', icon: Store, to: '/stores', color: '#8b5cf6' },
  { label: 'Create Offer', desc: 'Launch a promotional campaign', icon: Tag, to: '/offers', color: '#06b6d4' },
  { label: 'View Analytics', desc: 'Business insights & metrics', icon: TrendingUp, to: '/analytics', color: '#10b981' },
];

export default function Dashboard() {
  const [mallCount, setMallCount] = useState<number | null>(null);
  const [storeCount, setStoreCount] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([mallsApi.getAll(1, 1), storesApi.getAll(1, 1)]).then(([m, s]) => {
      setMallCount(m.data.data.pagination.total);
      setStoreCount(s.data.data.pagination.total);
    }).catch(() => {});
  }, []);

  const stats = [
    { label: 'Total Malls', value: mallCount, icon: Building2, color: '#6366f1', bg: 'rgba(99,102,241,0.12)', change: '+2 this month' },
    { label: 'Total Stores', value: storeCount, icon: Store, color: '#8b5cf6', bg: 'rgba(139,92,246,0.12)', change: '+12 this month' },
    { label: 'Active Offers', value: '—', icon: Tag, color: '#06b6d4', bg: 'rgba(6,182,212,0.12)', change: 'Coming soon' },
    { label: 'Total Users', value: '—', icon: Users, color: '#10b981', bg: 'rgba(16,185,129,0.12)', change: 'Coming soon' },
  ];

  return (
    <div className="fade-in space-y-6">
      {/* Welcome */}
      <div className="rounded-2xl p-6 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(139,92,246,0.08) 100%)', border: '1px solid rgba(99,102,241,0.2)' }}>
        <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-10">
          <MapPin size={80} className="text-indigo-400" />
        </div>
        <p className="text-xs font-medium text-indigo-400 uppercase tracking-widest mb-1">Overview</p>
        <h2 className="text-2xl font-bold text-white mb-1">Good to see you back 👋</h2>
        <p className="text-slate-400 text-sm">Here's what's happening across your mall network today.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, color, bg, change }) => (
          <div key={label} className="stat-card rounded-2xl p-5">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: bg }}>
                <Icon size={18} style={{ color }} />
              </div>
              <ArrowUpRight size={14} className="text-slate-600 mt-1" />
            </div>
            <p className="text-2xl font-bold text-white mb-0.5">
              {value === null ? (
                <span className="skeleton inline-block w-12 h-7" />
              ) : value}
            </p>
            <p className="text-xs text-slate-500 mb-1">{label}</p>
            <p className="text-xs" style={{ color }}>{change}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {quickActions.map(({ label, desc, icon: Icon, to, color }) => (
            <button key={label} onClick={() => navigate(to)}
              className="text-left p-4 rounded-xl transition-all hover:scale-[1.02] group"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
                style={{ background: `${color}20` }}>
                <Icon size={17} style={{ color }} />
              </div>
              <p className="text-sm font-semibold text-white mb-0.5">{label}</p>
              <p className="text-xs text-slate-500">{desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activity placeholder */}
      <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <Activity size={16} className="text-indigo-400" /> Recent Activity
          </h3>
          <button onClick={() => navigate('/activity')} className="text-xs text-indigo-400 hover:text-indigo-300">View all →</button>
        </div>
        <div className="space-y-3">
          {[
            { action: 'Mall "Central Plaza" was created', time: 'Just now', color: '#6366f1' },
            { action: 'Store "Fashion Hub" added to Ground Floor', time: '2 min ago', color: '#8b5cf6' },
            { action: 'Admin logged in', time: '5 min ago', color: '#10b981' },
          ].map(({ action, time, color }, i) => (
            <div key={i} className="flex items-center gap-3 py-2" style={{ borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />
              <p className="text-sm text-slate-300 flex-1">{action}</p>
              <p className="text-xs text-slate-600">{time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { Activity, Building2, Store, Tag, Users, LogIn, Shield } from 'lucide-react';

const logs = [
  { id: 1, action: 'Mall "Central Plaza" created', user: 'Super Admin', time: '2 min ago', type: 'mall', icon: Building2, color: '#6366f1' },
  { id: 2, action: 'Store "Fashion Hub" added to Ground Floor', user: 'Super Admin', time: '5 min ago', type: 'store', icon: Store, color: '#8b5cf6' },
  { id: 3, action: 'Store "Tech Store" updated', user: 'Super Admin', time: '12 min ago', type: 'store', icon: Store, color: '#8b5cf6' },
  { id: 4, action: 'Admin logged in', user: 'Super Admin', time: '18 min ago', type: 'auth', icon: LogIn, color: '#10b981' },
  { id: 5, action: 'Mall "Phoenix Marketcity" created', user: 'Super Admin', time: '1 hr ago', type: 'mall', icon: Building2, color: '#6366f1' },
  { id: 6, action: 'Offer "50% Off Fashion" created', user: 'Super Admin', time: '2 hr ago', type: 'offer', icon: Tag, color: '#06b6d4' },
  { id: 7, action: 'User blocked: +91 76543 21098', user: 'Super Admin', time: '3 hr ago', type: 'user', icon: Users, color: '#ef4444' },
];

const typeColors: Record<string, string> = {
  mall: 'rgba(99,102,241,0.15)',
  store: 'rgba(139,92,246,0.15)',
  offer: 'rgba(6,182,212,0.15)',
  auth: 'rgba(16,185,129,0.15)',
  user: 'rgba(239,68,68,0.15)',
};

export default function ActivityLog() {
  return (
    <div className="fade-in space-y-5">
      <div>
        <p className="text-xs text-slate-500 uppercase tracking-widest mb-0.5">Audit Trail</p>
        <p className="text-slate-400 text-sm">Track all admin actions and system events</p>
      </div>

      <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="px-5 py-3.5 flex items-center gap-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <Shield size={14} className="text-amber-400" />
          <p className="text-xs text-amber-400 font-medium">Live activity logging coming soon — showing recent session data</p>
        </div>

        <div className="divide-y" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
          {logs.map((log) => {
            const Icon = log.icon;
            return (
              <div key={log.id} className="flex items-start gap-4 px-5 py-4 table-row">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: typeColors[log.type] }}>
                  <Icon size={15} style={{ color: log.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white">{log.action}</p>
                  <p className="text-xs text-slate-500 mt-0.5">by {log.user}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: log.color }} />
                  <p className="text-xs text-slate-500">{log.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="rounded-2xl p-5 flex items-center gap-4" style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)' }}>
        <Activity size={20} className="text-indigo-400 flex-shrink-0" />
        <div>
          <p className="text-sm font-medium text-white">Full audit logging</p>
          <p className="text-xs text-slate-400 mt-0.5">Complete activity history with filters, export, and real-time updates will be available in the next release.</p>
        </div>
      </div>
    </div>
  );
}

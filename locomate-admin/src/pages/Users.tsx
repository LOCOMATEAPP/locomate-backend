import { Users as UsersIcon, Search, Shield, UserCheck, UserX, Phone } from 'lucide-react';

const mockUsers = [
  { id: '1', name: 'Rahul Sharma', phone: '+91 98765 43210', status: 'active', joined: 'Mar 10, 2026', visits: 24 },
  { id: '2', name: 'Priya Patel', phone: '+91 87654 32109', status: 'active', joined: 'Mar 8, 2026', visits: 12 },
  { id: '3', name: 'Amit Kumar', phone: '+91 76543 21098', status: 'blocked', joined: 'Feb 28, 2026', visits: 3 },
  { id: '4', name: 'Sneha Reddy', phone: '+91 65432 10987', status: 'active', joined: 'Feb 20, 2026', visits: 41 },
];

const stats = [
  { label: 'Total Users', value: '—', icon: UsersIcon, color: '#6366f1' },
  { label: 'Active Users', value: '—', icon: UserCheck, color: '#10b981' },
  { label: 'Blocked Users', value: '—', icon: UserX, color: '#ef4444' },
];

export default function Users() {
  return (
    <div className="fade-in space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-slate-500 uppercase tracking-widest mb-0.5">Management</p>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-white">—</span>
            <span className="text-slate-500 text-sm">registered users</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="stat-card rounded-2xl p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${color}20` }}>
              <Icon size={18} style={{ color }} />
            </div>
            <div>
              <p className="text-xl font-bold text-white">{value}</p>
              <p className="text-xs text-slate-500">{label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="relative">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
        <input placeholder="Search users by name or phone..." className="input-dark w-full pl-10 pr-4 py-2.5 rounded-xl text-sm" />
      </div>

      <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="px-5 py-3.5 flex items-center gap-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <Shield size={14} className="text-amber-400" />
          <p className="text-xs text-amber-400 font-medium">User management API integration coming soon — showing sample data</p>
        </div>
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              {['User', 'Phone', 'Joined', 'Mall Visits', 'Status', 'Actions'].map(h => (
                <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mockUsers.map((user, i) => (
              <tr key={user.id} className="table-row" style={{ borderBottom: i < mockUsers.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white"
                      style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <p className="text-sm font-medium text-white">{user.name}</p>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-1.5">
                    <Phone size={12} className="text-slate-600" />
                    <span className="text-sm text-slate-400">{user.phone}</span>
                  </div>
                </td>
                <td className="px-5 py-4 text-sm text-slate-400">{user.joined}</td>
                <td className="px-5 py-4 text-sm text-slate-300 font-semibold">{user.visits}</td>
                <td className="px-5 py-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium ${user.status === 'active' ? 'badge-active' : 'badge-inactive'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${user.status === 'active' ? 'bg-emerald-400' : 'bg-slate-500'}`} />
                    {user.status === 'active' ? 'Active' : 'Blocked'}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <button className="text-xs px-3 py-1.5 rounded-lg text-slate-400 hover:text-red-400 transition-colors"
                    style={{ background: 'rgba(255,255,255,0.04)' }}>
                    {user.status === 'active' ? 'Block' : 'Unblock'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

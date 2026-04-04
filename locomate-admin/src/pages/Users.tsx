import { useEffect, useState } from 'react';
import { Users as UsersIcon, Search, UserCheck, UserX, Phone, ChevronLeft, ChevronRight } from 'lucide-react';
import { usersApi } from '../api/users';

interface User {
  id: string; name: string; phone: string; email?: string;
  isActive: boolean; createdAt: string; gender?: string;
  _count?: { rewardClaims: number; savedItems: number; routeHistory: number };
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const limit = 20;

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await usersApi.getAll(page, limit);
      setUsers(res.data.data.users);
      setTotal(res.data.data.pagination.total);
    } catch {}
    setLoading(false);
  };

  useEffect(() => { fetchUsers(); }, [page]);

  const handleBlock = async (id: string, isActive: boolean) => {
    try {
      isActive ? await usersApi.block(id) : await usersApi.unblock(id);
      fetchUsers();
    } catch {}
  };

  const filtered = users.filter(u =>
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.phone?.includes(search)
  );

  const active = users.filter(u => u.isActive).length;
  const blocked = users.filter(u => !u.isActive).length;
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="fade-in space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-slate-500 uppercase tracking-widest mb-0.5">Management</p>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-white">{total}</span>
            <span className="text-slate-500 text-sm">registered users</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Users', value: total, icon: UsersIcon, color: '#6366f1' },
          { label: 'Active Users', value: active, icon: UserCheck, color: '#10b981' },
          { label: 'Blocked Users', value: blocked, icon: UserX, color: '#ef4444' },
        ].map(({ label, value, icon: Icon, color }) => (
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
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search users by name or phone..."
          className="input-dark w-full pl-10 pr-4 py-2.5 rounded-xl text-sm" />
      </div>

      <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
        {loading ? (
          <div className="p-12 text-center">
            <div className="w-6 h-6 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mx-auto" />
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                {['User', 'Phone', 'Joined', 'Activity', 'Status', 'Actions'].map(h => (
                  <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((user, i) => (
                <tr key={user.id} className="table-row" style={{ borderBottom: i < filtered.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                        style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
                        {user.name?.split(' ').map((n: string) => n[0]).join('').toUpperCase() || '?'}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{user.name || '—'}</p>
                        <p className="text-xs text-slate-500">{user.gender || ''}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5">
                      <Phone size={12} className="text-slate-600" />
                      <span className="text-sm text-slate-400">{user.phone}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-400">
                    {new Date(user.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-3 text-xs text-slate-500">
                      <span>{user._count?.routeHistory || 0} routes</span>
                      <span>{user._count?.rewardClaims || 0} claims</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium ${user.isActive ? 'badge-active' : 'badge-inactive'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${user.isActive ? 'bg-emerald-400' : 'bg-slate-500'}`} />
                      {user.isActive ? 'Active' : 'Blocked'}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <button onClick={() => handleBlock(user.id, user.isActive)}
                      className={`text-xs px-3 py-1.5 rounded-lg transition-colors ${user.isActive ? 'text-slate-400 hover:text-red-400 hover:bg-red-500/10' : 'text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10'}`}
                      style={{ background: 'rgba(255,255,255,0.04)' }}>
                      {user.isActive ? 'Block' : 'Unblock'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-3.5" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <p className="text-xs text-slate-500">Page {page} of {totalPages} · {total} total</p>
            <div className="flex gap-2">
              <button onClick={() => setPage(p => p - 1)} disabled={page === 1}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 disabled:opacity-30"
                style={{ background: 'rgba(255,255,255,0.05)' }}>
                <ChevronLeft size={15} />
              </button>
              <button onClick={() => setPage(p => p + 1)} disabled={page === totalPages}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 disabled:opacity-30"
                style={{ background: 'rgba(255,255,255,0.05)' }}>
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

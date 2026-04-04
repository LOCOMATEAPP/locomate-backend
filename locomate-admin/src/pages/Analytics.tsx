import { useEffect, useState } from 'react';
import { BarChart3, TrendingUp, Users, Store, Tag, Award, Car } from 'lucide-react';
import { analyticsApi } from '../api/analytics';

export default function Analytics() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    analyticsApi.get().then(r => { setData(r.data.data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="fade-in flex items-center justify-center h-64">
      <div className="w-6 h-6 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
    </div>
  );

  const metrics = [
    { label: 'Total Users', value: data?.totalUsers ?? '—', icon: Users, color: '#6366f1' },
    { label: 'Active Users (30d)', value: data?.activeUsers ?? '—', icon: TrendingUp, color: '#8b5cf6' },
    { label: 'Total Stores', value: data?.totalStores ?? '—', icon: Store, color: '#06b6d4' },
    { label: 'Active Offers', value: data?.activeOffers ?? '—', icon: Tag, color: '#f59e0b' },
    { label: 'Total Claims', value: data?.totalClaims ?? '—', icon: Award, color: '#10b981' },
    { label: 'Redeemed', value: data?.redeemedClaims ?? '—', icon: Award, color: '#ec4899' },
  ];

  return (
    <div className="fade-in space-y-5">
      <div>
        <p className="text-xs text-slate-500 uppercase tracking-widest mb-0.5">Insights</p>
        <p className="text-slate-400 text-sm">Live data from your platform</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="stat-card rounded-2xl p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${color}20` }}>
                <Icon size={16} style={{ color }} />
              </div>
            </div>
            <p className="text-2xl font-bold text-white">{value?.toLocaleString?.() ?? value}</p>
            <p className="text-xs text-slate-500 mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Parking Stats */}
      {data?.parking && (
        <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="flex items-center gap-2 mb-4">
            <Car size={15} className="text-indigo-400" />
            <h3 className="text-sm font-semibold text-white">Parking Stats</h3>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Total Sessions', value: data.parking.totalSessions },
              { label: 'Active Now', value: data.parking.activeSessions },
              { label: 'Total Revenue', value: `₹${(data.parking.totalRevenue || 0).toFixed(0)}` },
            ].map(({ label, value }) => (
              <div key={label} className="text-center p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
                <p className="text-xl font-bold text-white">{value}</p>
                <p className="text-xs text-slate-500 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Top Stores */}
      {data?.topStores?.length > 0 && (
        <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 size={15} className="text-purple-400" />
            <h3 className="text-sm font-semibold text-white">Top Stores by Navigation</h3>
          </div>
          <div className="space-y-3">
            {data.topStores.map((store: any, i: number) => {
              const max = data.topStores[0]?._count?.routeHistory || 1;
              const pct = Math.round((store._count?.routeHistory / max) * 100);
              return (
                <div key={store.id}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-600 w-4">{i + 1}</span>
                      <p className="text-sm text-slate-300">{store.name}</p>
                    </div>
                    <p className="text-xs text-slate-500">{store._count?.routeHistory} routes</p>
                  </div>
                  <div className="h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
                    <div className="h-1.5 rounded-full" style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #6366f1, #8b5cf6)' }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Redemption Rate */}
      {data?.totalClaims > 0 && (
        <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={15} className="text-cyan-400" />
            <h3 className="text-sm font-semibold text-white">Offer Redemption Rate</h3>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex justify-between mb-2">
                <span className="text-xs text-slate-500">Redeemed</span>
                <span className="text-xs text-slate-400">{data.redeemedClaims} / {data.totalClaims}</span>
              </div>
              <div className="h-3 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <div className="h-3 rounded-full" style={{ width: `${Math.round((data.redeemedClaims / data.totalClaims) * 100)}%`, background: 'linear-gradient(90deg, #10b981, #06b6d4)' }} />
              </div>
            </div>
            <p className="text-2xl font-bold text-white">{Math.round((data.redeemedClaims / data.totalClaims) * 100)}%</p>
          </div>
        </div>
      )}
    </div>
  );
}

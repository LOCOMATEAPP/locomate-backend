import { BarChart3, TrendingUp, MapPin, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const metrics = [
  { label: 'Total Visits', value: '18,420', change: '+12.5%', up: true, color: '#6366f1' },
  { label: 'Unique Users', value: '4,231', change: '+8.2%', up: true, color: '#8b5cf6' },
  { label: 'Avg. Session', value: '24 min', change: '+3.1%', up: true, color: '#06b6d4' },
  { label: 'Bounce Rate', value: '18.4%', change: '-2.3%', up: false, color: '#10b981' },
];

const topMalls = [
  { name: 'Central Plaza', visits: 8420, pct: 85 },
  { name: 'Phoenix Marketcity', visits: 5210, pct: 52 },
  { name: 'Nexus Mall', visits: 3100, pct: 31 },
  { name: 'Orion Mall', visits: 1690, pct: 17 },
];

const topCategories = [
  { name: 'Fashion & Apparel', pct: 34, color: '#ec4899' },
  { name: 'Food & Dining', pct: 28, color: '#f59e0b' },
  { name: 'Electronics', pct: 18, color: '#06b6d4' },
  { name: 'Beauty & Wellness', pct: 12, color: '#a78bfa' },
  { name: 'Others', pct: 8, color: '#64748b' },
];

export default function Analytics() {
  return (
    <div className="fade-in space-y-5">
      <div>
        <p className="text-xs text-slate-500 uppercase tracking-widest mb-0.5">Insights</p>
        <p className="text-slate-400 text-sm">Sample analytics — live data integration coming soon</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map(({ label, value, change, up, color }) => (
          <div key={label} className="stat-card rounded-2xl p-5">
            <div className="flex items-start justify-between mb-3">
              <p className="text-xs text-slate-500 uppercase tracking-wide">{label}</p>
              <span className={`flex items-center gap-0.5 text-xs font-medium ${up ? 'text-emerald-400' : 'text-red-400'}`}>
                {up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {change}
              </span>
            </div>
            <p className="text-2xl font-bold text-white">{value}</p>
            <div className="mt-3 h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <div className="h-1 rounded-full" style={{ width: '65%', background: color }} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Top Malls */}
        <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="flex items-center gap-2 mb-4">
            <MapPin size={15} className="text-indigo-400" />
            <h3 className="text-sm font-semibold text-white">Top Malls by Visits</h3>
          </div>
          <div className="space-y-4">
            {topMalls.map(({ name, visits, pct }) => (
              <div key={name}>
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-sm text-slate-300">{name}</p>
                  <p className="text-xs text-slate-500">{visits.toLocaleString()}</p>
                </div>
                <div className="h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <div className="h-1.5 rounded-full transition-all" style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #6366f1, #8b5cf6)' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category breakdown */}
        <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 size={15} className="text-purple-400" />
            <h3 className="text-sm font-semibold text-white">Category Breakdown</h3>
          </div>
          <div className="space-y-3">
            {topCategories.map(({ name, pct, color }) => (
              <div key={name} className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: color }} />
                <p className="text-sm text-slate-300 flex-1">{name}</p>
                <div className="w-24 h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <div className="h-1.5 rounded-full" style={{ width: `${pct * 2.5}%`, background: color }} />
                </div>
                <p className="text-xs text-slate-500 w-8 text-right">{pct}%</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Weekly trend placeholder */}
      <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={15} className="text-cyan-400" />
          <h3 className="text-sm font-semibold text-white">Weekly Visits Trend</h3>
        </div>
        <div className="flex items-end gap-2 h-24">
          {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
            <div key={i} className="flex-1 rounded-t-md transition-all hover:opacity-80"
              style={{ height: `${h}%`, background: i === 5 ? 'linear-gradient(180deg, #6366f1, #8b5cf6)' : 'rgba(99,102,241,0.25)' }} />
          ))}
        </div>
        <div className="flex gap-2 mt-2">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
            <p key={d} className="flex-1 text-center text-xs text-slate-600">{d}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

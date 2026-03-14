import { Tag, Plus, Percent, Clock, Store, Shield } from 'lucide-react';

const mockOffers = [
  { id: '1', title: '50% Off on Fashion', store: 'Fashion Hub', discount: '50%', type: 'Percentage', expires: 'Mar 20, 2026', status: 'active' },
  { id: '2', title: 'Buy 1 Get 1 Free', store: 'Tech Store', discount: 'BOGO', type: 'Special', expires: 'Mar 25, 2026', status: 'active' },
  { id: '3', title: 'Weekend Special ₹200 Off', store: 'Food Court', discount: '₹200', type: 'Flat', expires: 'Mar 16, 2026', status: 'expired' },
];

export default function Offers() {
  return (
    <div className="fade-in space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-slate-500 uppercase tracking-widest mb-0.5">Promotions</p>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-white">—</span>
            <span className="text-slate-500 text-sm">active offers</span>
          </div>
        </div>
        <button className="btn-primary flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white opacity-60 cursor-not-allowed">
          <Plus size={16} /> Create Offer
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Active Offers', value: '—', icon: Tag, color: '#06b6d4' },
          { label: 'Avg. Discount', value: '—', icon: Percent, color: '#f59e0b' },
          { label: 'Expiring Soon', value: '—', icon: Clock, color: '#ef4444' },
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

      <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="px-5 py-3.5 flex items-center gap-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <Shield size={14} className="text-amber-400" />
          <p className="text-xs text-amber-400 font-medium">Offers API integration coming soon — showing sample data</p>
        </div>
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              {['Offer', 'Store', 'Discount', 'Type', 'Expires', 'Status'].map(h => (
                <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mockOffers.map((offer, i) => (
              <tr key={offer.id} className="table-row" style={{ borderBottom: i < mockOffers.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(6,182,212,0.15)' }}>
                      <Tag size={15} className="text-cyan-400" />
                    </div>
                    <p className="text-sm font-medium text-white">{offer.title}</p>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-1.5">
                    <Store size={12} className="text-slate-600" />
                    <span className="text-sm text-slate-400">{offer.store}</span>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className="text-sm font-bold text-white">{offer.discount}</span>
                </td>
                <td className="px-5 py-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium badge-category">{offer.type}</span>
                </td>
                <td className="px-5 py-4 text-sm text-slate-400">{offer.expires}</td>
                <td className="px-5 py-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium ${offer.status === 'active' ? 'badge-active' : 'badge-inactive'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${offer.status === 'active' ? 'bg-emerald-400' : 'bg-slate-500'}`} />
                    {offer.status === 'active' ? 'Active' : 'Expired'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

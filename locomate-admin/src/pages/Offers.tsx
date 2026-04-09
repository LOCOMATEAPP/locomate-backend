import { useEffect, useState } from 'react';
import { Tag, Plus, Percent, Clock, Pencil, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { offersApi } from '../api/offers';
import { mallsApi } from '../api/malls';
import { storesApi } from '../api/stores';
import Modal from '../components/Modal';
import ConfirmDialog from '../components/ConfirmDialog';

interface Offer {
  id: string; title: string; description?: string; discountType: string;
  discountValue: number; startDate: string; endDate: string;
  isActive: boolean; mallId?: string; storeId?: string;
  mall?: { name: string }; store?: { name: string };
  _count?: { rewardClaims: number };
}

const emptyForm = {
  title: '', description: '', discountType: 'PERCENTAGE', discountValue: '',
  startDate: '', endDate: '', mallId: '', storeId: '', isActive: true,
};

const DISCOUNT_TYPES = ['PERCENTAGE', 'FLAT', 'BOGO', 'FREE_ITEM'];

export default function Offers() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editOffer, setEditOffer] = useState<Offer | null>(null);
  const [form, setForm] = useState<any>(emptyForm);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [malls, setMalls] = useState<any[]>([]);
  const [stores, setStores] = useState<any[]>([]);
  const limit = 20;

  const fetchOffers = async () => {
    setLoading(true);
    try {
      const res = await offersApi.getAll(page, limit);
      setOffers(res.data.data.offers);
      setTotal(res.data.data.pagination.total);
    } catch {}
    setLoading(false);
  };

  useEffect(() => { fetchOffers(); }, [page]);
  useEffect(() => {
    mallsApi.getAll(1, 100).then(r => setMalls(r.data.data.malls)).catch(() => {});
  }, []);

  const openCreate = () => { setEditOffer(null); setForm(emptyForm); setError(''); setShowModal(true); };
  const openEdit = (o: Offer) => {
    setEditOffer(o);
    setForm({
      title: o.title, description: o.description || '',
      discountType: o.discountType, discountValue: String(o.discountValue),
      startDate: o.startDate?.slice(0, 10) || '', endDate: o.endDate?.slice(0, 10) || '',
      mallId: o.mallId || '', storeId: o.storeId || '', isActive: o.isActive,
    });
    if (o.mallId) storesApi.getAll(1, 100, o.mallId).then(r => setStores(r.data.data.stores)).catch(() => {});
    setError(''); setShowModal(true);
  };

  const handleSave = async () => {
    setSaving(true); setError('');
    try {
      const payload = { ...form, discountValue: parseFloat(form.discountValue) };
      editOffer ? await offersApi.update(editOffer.id, payload) : await offersApi.create(payload);
      setShowModal(false); fetchOffers();
    } catch (err: any) { setError(err.response?.data?.message || 'Something went wrong'); }
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try { await offersApi.delete(deleteId); setDeleteId(null); fetchOffers(); } catch {}
  };

  const now = new Date();
  const active = offers.filter(o => o.isActive && new Date(o.endDate) >= now).length;
  const expiring = offers.filter(o => {
    const end = new Date(o.endDate);
    const diff = (end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
    return diff >= 0 && diff <= 7;
  }).length;
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="fade-in space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-slate-500 uppercase tracking-widest mb-0.5">Promotions</p>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-white">{total}</span>
            <span className="text-slate-500 text-sm">total offers</span>
          </div>
        </div>
        <button onClick={openCreate} className="btn-primary flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white">
          <Plus size={16} /> Create Offer
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Active Offers', value: active, icon: Tag, color: '#06b6d4' },
          { label: 'Total Offers', value: total, icon: Percent, color: '#f59e0b' },
          { label: 'Expiring in 7d', value: expiring, icon: Clock, color: '#ef4444' },
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
        {loading ? (
          <div className="p-12 text-center">
            <div className="w-6 h-6 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mx-auto" />
          </div>
        ) : offers.length === 0 ? (
          <div className="p-16 text-center">
            <Tag size={40} className="text-slate-700 mx-auto mb-3" />
            <p className="text-slate-500 text-sm">No offers yet</p>
            <button onClick={openCreate} className="mt-3 text-indigo-400 text-sm hover:text-indigo-300">+ Create first offer</button>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                {['Offer', 'Discount', 'Mall / Store', 'Validity', 'Claims', 'Status', ''].map(h => (
                  <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {offers.map((offer, i) => {
                const expired = new Date(offer.endDate) < now;
                return (
                  <tr key={offer.id} className="table-row" style={{ borderBottom: i < offers.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(6,182,212,0.15)' }}>
                          <Tag size={15} className="text-cyan-400" />
                        </div>
                        <p className="text-sm font-medium text-white">{offer.title}</p>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm font-bold text-white">
                        {offer.discountType === 'PERCENTAGE' ? `${offer.discountValue}%` :
                         offer.discountType === 'FLAT' ? `₹${offer.discountValue}` : offer.discountType}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-sm text-slate-300">{offer.mall?.name || '—'}</p>
                      <p className="text-xs text-slate-500">{offer.store?.name || 'All stores'}</p>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-xs text-slate-400">{new Date(offer.startDate).toLocaleDateString('en-IN')}</p>
                      <p className="text-xs text-slate-500">→ {new Date(offer.endDate).toLocaleDateString('en-IN')}</p>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-300">{offer._count?.rewardClaims || 0}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium ${offer.isActive && !expired ? 'badge-active' : 'badge-inactive'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${offer.isActive && !expired ? 'bg-emerald-400' : 'bg-slate-500'}`} />
                        {expired ? 'Expired' : offer.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => openEdit(offer)} className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-indigo-400 transition-colors" style={{ background: 'rgba(255,255,255,0.04)' }}>
                          <Pencil size={14} />
                        </button>
                        <button onClick={() => setDeleteId(offer.id)} className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-red-400 transition-colors" style={{ background: 'rgba(255,255,255,0.04)' }}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-3.5" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <p className="text-xs text-slate-500">Page {page} of {totalPages}</p>
            <div className="flex gap-2">
              <button onClick={() => setPage(p => p - 1)} disabled={page === 1} className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 disabled:opacity-30" style={{ background: 'rgba(255,255,255,0.05)' }}><ChevronLeft size={15} /></button>
              <button onClick={() => setPage(p => p + 1)} disabled={page === totalPages} className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 disabled:opacity-30" style={{ background: 'rgba(255,255,255,0.05)' }}><ChevronRight size={15} /></button>
            </div>
          </div>
        )}
      </div>

      {showModal && (
        <Modal title={editOffer ? 'Edit Offer' : 'Create Offer'} onClose={() => setShowModal(false)}>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wide">Title</label>
              <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="50% Off on Fashion" className="input-dark w-full px-3.5 py-2.5 rounded-xl text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wide">Discount Type</label>
              <select value={form.discountType} onChange={e => setForm({ ...form, discountType: e.target.value })} className="input-dark w-full px-3.5 py-2.5 rounded-xl text-sm">
                {DISCOUNT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wide">Discount Value</label>
              <input value={form.discountValue} onChange={e => setForm({ ...form, discountValue: e.target.value })} placeholder="50" className="input-dark w-full px-3.5 py-2.5 rounded-xl text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wide">Start Date</label>
              <input type="date" value={form.startDate} onChange={e => setForm({ ...form, startDate: e.target.value })} className="input-dark w-full px-3.5 py-2.5 rounded-xl text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wide">End Date</label>
              <input type="date" value={form.endDate} onChange={e => setForm({ ...form, endDate: e.target.value })} className="input-dark w-full px-3.5 py-2.5 rounded-xl text-sm" />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wide">Mall</label>
              <select value={form.mallId} onChange={e => { setForm({ ...form, mallId: e.target.value, storeId: '' }); if (e.target.value) storesApi.getAll(1, 100, e.target.value).then(r => setStores(r.data.data.stores)).catch(() => {}); }} className="input-dark w-full px-3.5 py-2.5 rounded-xl text-sm">
                <option value="">Select Mall (optional)</option>
                {malls.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
              </select>
            </div>
            {form.mallId && (
              <div className="col-span-2">
                <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wide">Store *</label>
                <select value={form.storeId} onChange={e => setForm({ ...form, storeId: e.target.value })}
                  className="input-dark w-full px-3.5 py-2.5 rounded-xl text-sm">
                  <option value="">Select Store</option>
                  {stores.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>
            )}
            <div className="col-span-2">
              <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wide">Description</label>
              <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={2} className="input-dark w-full px-3.5 py-2.5 rounded-xl text-sm resize-none" />
            </div>
            <div className="col-span-2 flex items-center gap-3">
              <button type="button" onClick={() => setForm({ ...form, isActive: !form.isActive })} className={`relative w-10 h-5 rounded-full transition-colors ${form.isActive ? 'bg-indigo-500' : 'bg-slate-700'}`}>
                <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${form.isActive ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </button>
              <span className="text-sm text-slate-300">Active</span>
            </div>
            {error && <p className="col-span-2 text-red-400 text-sm">{error}</p>}
            <div className="col-span-2 flex gap-3 pt-1">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white transition-colors" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>Cancel</button>
              <button onClick={handleSave} disabled={saving} className="btn-primary flex-1 py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-50">
                {saving ? 'Saving...' : editOffer ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </Modal>
      )}

      {deleteId && <ConfirmDialog message="Delete this offer?" onConfirm={handleDelete} onCancel={() => setDeleteId(null)} />}
    </div>
  );
}

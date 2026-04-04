import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, ChevronLeft, ChevronRight, Store as StoreIcon, Search, Filter } from 'lucide-react';
import { storesApi } from '../api/stores';
import { mallsApi } from '../api/malls';
import Modal from '../components/Modal';
import ConfirmDialog from '../components/ConfirmDialog';

interface Store {
  id: string; name: string; category: string; mallId: string; floorId: string;
  description?: string; logo?: string; phone?: string; email?: string; website?: string;
  coordinateX: number; coordinateY: number; isActive: boolean;
  mall?: { id: string; name: string; city: string };
  floor?: { id: string; name: string; floorNumber: number };
}
interface Mall { id: string; name: string; city: string; }
interface Floor { id: string; name: string; floorNumber: number; }

const emptyForm = {
  mallId: '', floorId: '', name: '', category: '', description: '',
  logo: '', phone: '', email: '', website: '', coordinateX: '', coordinateY: '', isActive: true,
};

const CATEGORIES = ['Fashion & Apparel', 'Electronics', 'Food & Dining', 'Beauty & Wellness',
  'Sports & Fitness', 'Books & Stationery', 'Jewelry & Accessories', 'Home & Lifestyle', 'Entertainment', 'Other'];

const categoryColor = (cat: string) => {
  const map: Record<string, string> = {
    'Fashion & Apparel': '#ec4899', 'Electronics': '#06b6d4', 'Food & Dining': '#f59e0b',
    'Beauty & Wellness': '#a78bfa', 'Sports & Fitness': '#10b981',
  };
  return map[cat] || '#6366f1';
};

export default function Stores() {
  const [stores, setStores] = useState<Store[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editStore, setEditStore] = useState<Store | null>(null);
  const [form, setForm] = useState<any>(emptyForm);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [malls, setMalls] = useState<Mall[]>([]);
  const [floors, setFloors] = useState<Floor[]>([]);
  const [filterMallId, setFilterMallId] = useState('');
  const limit = 10;

  const fetchStores = async () => {
    setLoading(true);
    try {
      const res = await storesApi.getAll(page, limit, filterMallId || undefined);
      setStores(res.data.data.stores);
      setTotal(res.data.data.pagination.total);
    } catch {}
    setLoading(false);
  };

  useEffect(() => { mallsApi.getAll(1, 100).then(r => setMalls(r.data.data.malls)).catch(() => {}); }, []);
  useEffect(() => { fetchStores(); }, [page, filterMallId]);

  const fetchFloors = async (mallId: string) => {
    if (!mallId) { setFloors([]); return; }
    try { const r = await mallsApi.getFloors(mallId); setFloors(r.data.data); } catch {}
  };

  const openCreate = () => { setEditStore(null); setForm(emptyForm); setFloors([]); setError(''); setShowModal(true); };
  const openEdit = (s: Store) => {
    setEditStore(s);
    setForm({
      mallId: s.mallId, floorId: s.floorId, name: s.name, category: s.category,
      description: s.description || '', logo: s.logo || '', phone: s.phone || '',
      email: s.email || '', website: s.website || '',
      coordinateX: String(s.coordinateX), coordinateY: String(s.coordinateY), isActive: s.isActive,
    });
    fetchFloors(s.mallId); setError(''); setShowModal(true);
  };

  const handleSave = async () => {
    setSaving(true); setError('');
    try {
      const payload = { ...form, coordinateX: parseFloat(form.coordinateX), coordinateY: parseFloat(form.coordinateY) };
      editStore ? await storesApi.update(editStore.id, payload) : await storesApi.create(payload);
      setShowModal(false); fetchStores();
    } catch (err: any) { setError(err.response?.data?.message || 'Something went wrong'); }
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try { await storesApi.delete(deleteId); setDeleteId(null); fetchStores(); } catch {}
  };

  const filtered = stores.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.category.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="fade-in space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-slate-500 uppercase tracking-widest mb-0.5">Management</p>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-white">{total}</span>
            <span className="text-slate-500 text-sm">stores registered</span>
          </div>
        </div>
        <button onClick={openCreate}
          className="btn-primary flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white">
          <Plus size={16} /> Add Store
        </button>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search stores by name or category..."
            className="input-dark w-full pl-10 pr-4 py-2.5 rounded-xl text-sm" />
        </div>
        <div className="relative">
          <Filter size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
          <select value={filterMallId} onChange={e => { setFilterMallId(e.target.value); setPage(1); }}
            className="input-dark pl-10 pr-8 py-2.5 rounded-xl text-sm appearance-none cursor-pointer">
            <option value="">All Malls</option>
            {malls.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
          </select>
        </div>
      </div>

      <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
        {loading ? (
          <div className="p-12 text-center">
            <div className="w-6 h-6 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mx-auto" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-16 text-center">
            <StoreIcon size={40} className="text-slate-700 mx-auto mb-3" />
            <p className="text-slate-500 text-sm">No stores found</p>
            <button onClick={openCreate} className="mt-3 text-indigo-400 text-sm hover:text-indigo-300">+ Add your first store</button>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                {['Store', 'Category', 'Mall / Floor', 'Contact', 'Status', ''].map(h => (
                  <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((store, i) => (
                <tr key={store.id} className="table-row" style={{ borderBottom: i < filtered.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: `${categoryColor(store.category)}20` }}>
                        {store.logo
                          ? <img src={store.logo} alt={store.name} className="w-10 h-10 rounded-xl object-cover" />
                          : <StoreIcon size={17} style={{ color: categoryColor(store.category) }} />}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{store.name}</p>
                        <p className="text-xs text-slate-500 mt-0.5 font-mono">
                          {store.coordinateX.toFixed(1)}, {store.coordinateY.toFixed(1)}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium badge-category">
                      {store.category}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-sm text-slate-300">{store.mall?.name || '—'}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{store.floor?.name || '—'}</p>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-xs text-slate-400">{store.phone || '—'}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{store.email || ''}</p>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium ${store.isActive ? 'badge-active' : 'badge-inactive'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${store.isActive ? 'bg-emerald-400' : 'bg-slate-500'}`} />
                      {store.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => openEdit(store)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-indigo-400 transition-colors"
                        style={{ background: 'rgba(255,255,255,0.04)' }}>
                        <Pencil size={14} />
                      </button>
                      <button onClick={() => setDeleteId(store.id)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-red-400 transition-colors"
                        style={{ background: 'rgba(255,255,255,0.04)' }}>
                        <Trash2 size={14} />
                      </button>
                    </div>
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
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 disabled:opacity-30 hover:text-white transition-colors"
                style={{ background: 'rgba(255,255,255,0.05)' }}>
                <ChevronLeft size={15} />
              </button>
              <button onClick={() => setPage(p => p + 1)} disabled={page === totalPages}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 disabled:opacity-30 hover:text-white transition-colors"
                style={{ background: 'rgba(255,255,255,0.05)' }}>
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        )}
      </div>

      {showModal && (
        <Modal title={editStore ? 'Edit Store' : 'Add New Store'} onClose={() => setShowModal(false)}>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wide">Mall</label>
              <select value={form.mallId} onChange={e => { setForm({ ...form, mallId: e.target.value, floorId: '' }); fetchFloors(e.target.value); }}
                className="input-dark w-full px-3.5 py-2.5 rounded-xl text-sm">
                <option value="">Select Mall</option>
                {malls.map(m => <option key={m.id} value={m.id}>{m.name} — {m.city}</option>)}
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wide">Floor</label>
              <select value={form.floorId} onChange={e => setForm({ ...form, floorId: e.target.value })}
                disabled={!form.mallId} className="input-dark w-full px-3.5 py-2.5 rounded-xl text-sm disabled:opacity-40">
                <option value="">Select Floor</option>
                {floors.map(f => <option key={f.id} value={f.id}>{f.name} (Floor {f.floorNumber})</option>)}
              </select>
            </div>
            {([
              { label: 'Store Name', key: 'name', placeholder: 'Zara', span: 2 },
              { label: 'Phone', key: 'phone', placeholder: '+91-44-12345678', span: 1 },
              { label: 'Email', key: 'email', placeholder: 'store@example.com', span: 1 },
              { label: 'Website', key: 'website', placeholder: 'https://...', span: 1 },
              { label: 'Logo URL', key: 'logo', placeholder: 'https://...', span: 1 },
              { label: 'Coordinate X', key: 'coordinateX', placeholder: '150.5', span: 1 },
              { label: 'Coordinate Y', key: 'coordinateY', placeholder: '200.3', span: 1 },
            ] as { label: string; key: string; placeholder: string; span: number }[]).map(({ label, key, placeholder, span }) => (
              <div key={key} className={span === 2 ? 'col-span-2' : 'col-span-1'}>
                <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wide">{label}</label>
                <input value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })}
                  placeholder={placeholder} className="input-dark w-full px-3.5 py-2.5 rounded-xl text-sm" />
              </div>
            ))}
            <div className="col-span-2">
              <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wide">Category</label>
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
                className="input-dark w-full px-3.5 py-2.5 rounded-xl text-sm">
                <option value="">Select Category</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wide">Description</label>
              <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
                rows={2} className="input-dark w-full px-3.5 py-2.5 rounded-xl text-sm resize-none" />
            </div>
            <div className="col-span-2 flex items-center gap-3">
              <button type="button" onClick={() => setForm({ ...form, isActive: !form.isActive })}
                className={`relative w-10 h-5 rounded-full transition-colors ${form.isActive ? 'bg-indigo-500' : 'bg-slate-700'}`}>
                <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${form.isActive ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </button>
              <span className="text-sm text-slate-300">Active</span>
            </div>
            {error && <p className="col-span-2 text-red-400 text-sm">{error}</p>}
            <div className="col-span-2 flex gap-3 pt-1">
              <button onClick={() => setShowModal(false)}
                className="flex-1 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white transition-colors"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                Cancel
              </button>
              <button onClick={handleSave} disabled={saving}
                className="btn-primary flex-1 py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-50">
                {saving ? 'Saving...' : editStore ? 'Update Store' : 'Create Store'}
              </button>
            </div>
          </div>
        </Modal>
      )}

      {deleteId && (
        <ConfirmDialog
          message="Delete this store? This action cannot be undone."
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </div>
  );
}

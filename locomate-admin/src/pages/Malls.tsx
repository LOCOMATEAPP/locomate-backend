import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, ChevronLeft, ChevronRight, Building2, MapPin, Search } from 'lucide-react';
import { mallsApi } from '../api/malls';
import Modal from '../components/Modal';
import ConfirmDialog from '../components/ConfirmDialog';

interface Mall {
  id: string; name: string; city: string; state: string; address: string;
  zipCode: string; latitude: number; longitude: number; description?: string;
  image?: string; isActive: boolean; createdAt: string;
}

const emptyForm = {
  name: '', address: '', city: '', state: '', zipCode: '',
  latitude: '', longitude: '', description: '', image: '', isActive: true,
};

const fields = [
  { label: 'Mall Name', key: 'name', placeholder: 'Phoenix Marketcity', span: 2 },
  { label: 'Address', key: 'address', placeholder: '15, Velachery Main Road', span: 2 },
  { label: 'City', key: 'city', placeholder: 'Chennai', span: 1 },
  { label: 'State', key: 'state', placeholder: 'Tamil Nadu', span: 1 },
  { label: 'Zip Code', key: 'zipCode', placeholder: '600042', span: 1 },
  { label: 'Latitude', key: 'latitude', placeholder: '12.9926', span: 1 },
  { label: 'Longitude', key: 'longitude', placeholder: '80.2207', span: 1 },
  { label: 'Image URL', key: 'image', placeholder: 'https://...', span: 1 },
];

export default function Malls() {
  const [malls, setMalls] = useState<Mall[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editMall, setEditMall] = useState<Mall | null>(null);
  const [form, setForm] = useState<any>(emptyForm);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const limit = 10;

  const fetchMalls = async () => {
    setLoading(true);
    try {
      const res = await mallsApi.getAll(page, limit);
      setMalls(res.data.data.malls);
      setTotal(res.data.data.pagination.total);
    } catch {}
    setLoading(false);
  };

  useEffect(() => { fetchMalls(); }, [page]);

  const openCreate = () => { setEditMall(null); setForm(emptyForm); setError(''); setShowModal(true); };
  const openEdit = (mall: Mall) => {
    setEditMall(mall);
    setForm({ name: mall.name, address: mall.address, city: mall.city, state: mall.state,
      zipCode: mall.zipCode, latitude: String(mall.latitude), longitude: String(mall.longitude),
      description: mall.description || '', image: mall.image || '', isActive: mall.isActive });
    setError(''); setShowModal(true);
  };

  const handleSave = async () => {
    setSaving(true); setError('');
    try {
      const payload = { ...form, latitude: parseFloat(form.latitude), longitude: parseFloat(form.longitude) };
      editMall ? await mallsApi.update(editMall.id, payload) : await mallsApi.create(payload);
      setShowModal(false); fetchMalls();
    } catch (err: any) { setError(err.response?.data?.message || 'Something went wrong'); }
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try { await mallsApi.delete(deleteId); setDeleteId(null); fetchMalls(); } catch {}
  };

  const filtered = malls.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.city.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="fade-in space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-slate-500 uppercase tracking-widest mb-0.5">Management</p>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-white">{total}</span>
            <span className="text-slate-500 text-sm">malls registered</span>
          </div>
        </div>
        <button onClick={openCreate}
          className="btn-primary flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white">
          <Plus size={16} /> Add Mall
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search malls by name or city..."
          className="input-dark w-full pl-10 pr-4 py-2.5 rounded-xl text-sm" />
      </div>

      {/* Table */}
      <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
        {loading ? (
          <div className="p-12 text-center">
            <div className="w-6 h-6 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mx-auto" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-16 text-center">
            <Building2 size={40} className="text-slate-700 mx-auto mb-3" />
            <p className="text-slate-500 text-sm">No malls found</p>
            <button onClick={openCreate} className="mt-3 text-indigo-400 text-sm hover:text-indigo-300">+ Add your first mall</button>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                {['Mall', 'Location', 'Coordinates', 'Status', ''].map(h => (
                  <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((mall, i) => (
                <tr key={mall.id} className="table-row" style={{ borderBottom: i < filtered.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: 'rgba(99,102,241,0.15)' }}>
                        {mall.image
                          ? <img src={mall.image} alt={mall.name} className="w-10 h-10 rounded-xl object-cover" />
                          : <Building2 size={18} className="text-indigo-400" />}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{mall.name}</p>
                        <p className="text-xs text-slate-500 mt-0.5 truncate max-w-[180px]">{mall.address}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5">
                      <MapPin size={13} className="text-slate-600" />
                      <span className="text-sm text-slate-300">{mall.city}, {mall.state}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5 ml-5">{mall.zipCode}</p>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-xs text-slate-500 font-mono">{mall.latitude.toFixed(4)}, {mall.longitude.toFixed(4)}</p>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium ${mall.isActive ? 'badge-active' : 'badge-inactive'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${mall.isActive ? 'bg-emerald-400' : 'bg-slate-500'}`} />
                      {mall.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => openEdit(mall)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-indigo-400 transition-colors"
                        style={{ background: 'rgba(255,255,255,0.04)' }}>
                        <Pencil size={14} />
                      </button>
                      <button onClick={() => setDeleteId(mall.id)}
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
        <Modal title={editMall ? 'Edit Mall' : 'Add New Mall'} onClose={() => setShowModal(false)}>
          <div className="grid grid-cols-2 gap-4">
            {fields.map(({ label, key, placeholder, span }) => (
              <div key={key} className={span === 2 ? 'col-span-2' : 'col-span-1'}>
                <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wide">{label}</label>
                <input value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })}
                  placeholder={placeholder}
                  className="input-dark w-full px-3.5 py-2.5 rounded-xl text-sm" />
              </div>
            ))}
            <div className="col-span-2">
              <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wide">Description</label>
              <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
                rows={3} className="input-dark w-full px-3.5 py-2.5 rounded-xl text-sm resize-none" />
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
                {saving ? 'Saving...' : editMall ? 'Update Mall' : 'Create Mall'}
              </button>
            </div>
          </div>
        </Modal>
      )}

      {deleteId && (
        <ConfirmDialog
          message="Delete this mall? All associated floors and stores will also be affected."
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </div>
  );
}

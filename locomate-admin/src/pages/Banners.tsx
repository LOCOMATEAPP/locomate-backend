import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Image, Link, ToggleLeft, ToggleRight } from 'lucide-react';
import { bannersApi } from '../api/banners';
import Modal from '../components/Modal';
import ConfirmDialog from '../components/ConfirmDialog';

interface Banner {
  id: string; title: string; subtitle?: string;
  imageUrl: string; redirectUrl?: string;
  isActive: boolean; sortOrder: number;
}

const emptyForm = { title: '', subtitle: '', imageUrl: '', redirectUrl: '', isActive: true, sortOrder: 0 };

export default function Banners() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editBanner, setEditBanner] = useState<Banner | null>(null);
  const [form, setForm] = useState<any>(emptyForm);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const fetch = async () => {
    setLoading(true);
    try { const r = await bannersApi.getAll(); setBanners(r.data.data); } catch {}
    setLoading(false);
  };

  useEffect(() => { fetch(); }, []);

  const openCreate = () => { setEditBanner(null); setForm(emptyForm); setError(''); setShowModal(true); };
  const openEdit = (b: Banner) => {
    setEditBanner(b);
    setForm({ title: b.title, subtitle: b.subtitle || '', imageUrl: b.imageUrl, redirectUrl: b.redirectUrl || '', isActive: b.isActive, sortOrder: b.sortOrder });
    setError(''); setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.title || !form.imageUrl) { setError('Title and Image URL are required'); return; }
    setSaving(true); setError('');
    try {
      const payload = { ...form, sortOrder: Number(form.sortOrder) };
      editBanner ? await bannersApi.update(editBanner.id, payload) : await bannersApi.create(payload);
      setShowModal(false); fetch();
    } catch (err: any) { setError(err.response?.data?.message || 'Something went wrong'); }
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try { await bannersApi.delete(deleteId); setDeleteId(null); fetch(); } catch {}
  };

  const toggleActive = async (b: Banner) => {
    try { await bannersApi.update(b.id, { isActive: !b.isActive }); fetch(); } catch {}
  };

  return (
    <div className="fade-in space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-slate-500 uppercase tracking-widest mb-0.5">Home Screen</p>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-white">{banners.length}</span>
            <span className="text-slate-500 text-sm">banners configured</span>
          </div>
        </div>
        <button onClick={openCreate} className="btn-primary flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white">
          <Plus size={16} /> Add Banner
        </button>
      </div>

      {loading ? (
        <div className="p-12 text-center">
          <div className="w-6 h-6 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mx-auto" />
        </div>
      ) : banners.length === 0 ? (
        <div className="rounded-2xl p-16 text-center" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <Image size={40} className="text-slate-700 mx-auto mb-3" />
          <p className="text-slate-500 text-sm">No banners yet</p>
          <button onClick={openCreate} className="mt-3 text-indigo-400 text-sm hover:text-indigo-300">+ Add first banner</button>
        </div>
      ) : (
        <div className="grid gap-4">
          {banners.map((banner) => (
            <div key={banner.id} className="rounded-2xl overflow-hidden flex" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
              {/* Preview */}
              <div className="w-48 h-28 flex-shrink-0 relative overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                {banner.imageUrl ? (
                  <img src={banner.imageUrl} alt={banner.title} className="w-full h-full object-cover" onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Image size={24} className="text-slate-600" />
                  </div>
                )}
                {/* Green banner preview overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-2" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }}>
                  <p className="text-white text-xs font-bold truncate">{banner.title}</p>
                  {banner.subtitle && <p className="text-slate-300 text-xs truncate">{banner.subtitle}</p>}
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 px-5 py-4 flex items-center justify-between">
                <div className="space-y-1.5">
                  <p className="text-sm font-semibold text-white">{banner.title}</p>
                  {banner.subtitle && <p className="text-xs text-slate-400">{banner.subtitle}</p>}
                  {banner.redirectUrl && (
                    <div className="flex items-center gap-1.5">
                      <Link size={11} className="text-slate-600" />
                      <p className="text-xs text-slate-500 truncate max-w-xs">{banner.redirectUrl}</p>
                    </div>
                  )}
                  <p className="text-xs text-slate-600">Order: {banner.sortOrder}</p>
                </div>

                <div className="flex items-center gap-3">
                  <button onClick={() => toggleActive(banner)} className="flex items-center gap-1.5 text-xs transition-colors"
                    style={{ color: banner.isActive ? '#34d399' : '#64748b' }}>
                    {banner.isActive ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
                    {banner.isActive ? 'Active' : 'Inactive'}
                  </button>
                  <button onClick={() => openEdit(banner)} className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-indigo-400 transition-colors" style={{ background: 'rgba(255,255,255,0.04)' }}>
                    <Pencil size={14} />
                  </button>
                  <button onClick={() => setDeleteId(banner.id)} className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-red-400 transition-colors" style={{ background: 'rgba(255,255,255,0.04)' }}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <Modal title={editBanner ? 'Edit Banner' : 'Add Banner'} onClose={() => setShowModal(false)}>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wide">Title *</label>
              <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
                placeholder="Flat 50% Off" className="input-dark w-full px-3.5 py-2.5 rounded-xl text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wide">Subtitle</label>
              <input value={form.subtitle} onChange={e => setForm({ ...form, subtitle: e.target.value })}
                placeholder="At Zara, H&M & more today!" className="input-dark w-full px-3.5 py-2.5 rounded-xl text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wide">Image URL *</label>
              <input value={form.imageUrl} onChange={e => setForm({ ...form, imageUrl: e.target.value })}
                placeholder="https://example.com/banner.jpg" className="input-dark w-full px-3.5 py-2.5 rounded-xl text-sm" />
              {form.imageUrl && (
                <div className="mt-2 rounded-xl overflow-hidden h-24 w-full" style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <img src={form.imageUrl} alt="preview" className="w-full h-full object-cover"
                    onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                </div>
              )}
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wide">Redirect URL</label>
              <input value={form.redirectUrl} onChange={e => setForm({ ...form, redirectUrl: e.target.value })}
                placeholder="https://... or deep link" className="input-dark w-full px-3.5 py-2.5 rounded-xl text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wide">Sort Order</label>
              <input type="number" value={form.sortOrder} onChange={e => setForm({ ...form, sortOrder: e.target.value })}
                placeholder="0" className="input-dark w-full px-3.5 py-2.5 rounded-xl text-sm" />
            </div>
            <div className="flex items-center gap-3">
              <button type="button" onClick={() => setForm({ ...form, isActive: !form.isActive })}
                className={`relative w-10 h-5 rounded-full transition-colors ${form.isActive ? 'bg-indigo-500' : 'bg-slate-700'}`}>
                <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${form.isActive ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </button>
              <span className="text-sm text-slate-300">Active</span>
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <div className="flex gap-3 pt-1">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white transition-colors" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>Cancel</button>
              <button onClick={handleSave} disabled={saving} className="btn-primary flex-1 py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-50">
                {saving ? 'Saving...' : editBanner ? 'Update' : 'Add Banner'}
              </button>
            </div>
          </div>
        </Modal>
      )}

      {deleteId && <ConfirmDialog message="Delete this banner?" onConfirm={handleDelete} onCancel={() => setDeleteId(null)} />}
    </div>
  );
}

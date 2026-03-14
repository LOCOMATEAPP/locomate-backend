import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, ChevronLeft, ChevronRight, Store as StoreIcon } from 'lucide-react';
import { storesApi } from '../api/stores';
import { mallsApi } from '../api/malls';
import Modal from '../components/Modal';
import ConfirmDialog from '../components/ConfirmDialog';

interface Store {
  id: string;
  name: string;
  category: string;
  mallId: string;
  floorId: string;
  description?: string;
  logo?: string;
  phone?: string;
  email?: string;
  website?: string;
  coordinateX: number;
  coordinateY: number;
  isActive: boolean;
  mall?: { id: string; name: string; city: string };
  floor?: { id: string; name: string; floorNumber: number };
}

interface Mall { id: string; name: string; city: string; }
interface Floor { id: string; name: string; floorNumber: number; }

const emptyForm = {
  mallId: '', floorId: '', name: '', category: '', description: '',
  logo: '', phone: '', email: '', website: '',
  coordinateX: '', coordinateY: '', isActive: true,
};

export default function Stores() {
  const [stores, setStores] = useState<Store[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editStore, setEditStore] = useState<Store | null>(null);
  const [form, setForm] = useState(emptyForm);
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

  const fetchMalls = async () => {
    try {
      const res = await mallsApi.getAll(1, 100);
      setMalls(res.data.data.malls);
    } catch {}
  };

  useEffect(() => { fetchMalls(); }, []);
  useEffect(() => { fetchStores(); }, [page, filterMallId]);

  const fetchFloors = async (mallId: string) => {
    if (!mallId) { setFloors([]); return; }
    try {
      const res = await mallsApi.getFloors(mallId);
      setFloors(res.data.data);
    } catch {}
  };

  const openCreate = () => {
    setEditStore(null);
    setForm(emptyForm);
    setFloors([]);
    setError('');
    setShowModal(true);
  };

  const openEdit = (store: Store) => {
    setEditStore(store);
    setForm({
      mallId: store.mallId, floorId: store.floorId, name: store.name,
      category: store.category, description: store.description || '',
      logo: store.logo || '', phone: store.phone || '',
      email: store.email || '', website: store.website || '',
      coordinateX: String(store.coordinateX), coordinateY: String(store.coordinateY),
      isActive: store.isActive,
    });
    fetchFloors(store.mallId);
    setError('');
    setShowModal(true);
  };

  const handleMallChange = (mallId: string) => {
    setForm({ ...form, mallId, floorId: '' });
    fetchFloors(mallId);
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
      const payload = {
        ...form,
        coordinateX: parseFloat(form.coordinateX as string),
        coordinateY: parseFloat(form.coordinateY as string),
      };
      if (editStore) {
        await storesApi.update(editStore.id, payload);
      } else {
        await storesApi.create(payload);
      }
      setShowModal(false);
      fetchStores();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await storesApi.delete(deleteId);
      setDeleteId(null);
      fetchStores();
    } catch {}
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Stores</h1>
          <p className="text-gray-500 text-sm mt-1">{total} total stores</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
          <Plus size={18} /> Add Store
        </button>
      </div>

      {/* Filter */}
      <div className="mb-4">
        <select
          value={filterMallId}
          onChange={(e) => { setFilterMallId(e.target.value); setPage(1); }}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Malls</option>
          {malls.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
        </select>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-400">Loading...</div>
        ) : stores.length === 0 ? (
          <div className="p-12 text-center text-gray-400">No stores found. Create your first store!</div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Store</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Category</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Mall / Floor</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {stores.map((store) => (
                <tr key={store.id} className="hover:bg-gray-50">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      {store.logo ? (
                        <img src={store.logo} alt={store.name} className="w-10 h-10 rounded-lg object-cover" />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                          <StoreIcon size={18} className="text-green-600" />
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-gray-800">{store.name}</p>
                        <p className="text-xs text-gray-400">{store.phone || store.email || '—'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                      {store.category}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-600">
                    <p>{store.mall?.name || '—'}</p>
                    <p className="text-xs text-gray-400">{store.floor?.name || '—'}</p>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${store.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                      {store.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEdit(store)} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Pencil size={16} />
                      </button>
                      <button onClick={() => setDeleteId(store.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100">
            <p className="text-sm text-gray-500">Page {page} of {totalPages}</p>
            <div className="flex gap-2">
              <button onClick={() => setPage(p => p - 1)} disabled={page === 1} className="p-1.5 rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-gray-50">
                <ChevronLeft size={16} />
              </button>
              <button onClick={() => setPage(p => p + 1)} disabled={page === totalPages} className="p-1.5 rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-gray-50">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {showModal && (
        <Modal title={editStore ? 'Edit Store' : 'Create Store'} onClose={() => setShowModal(false)}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mall</label>
              <select
                value={form.mallId}
                onChange={(e) => handleMallChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Mall</option>
                {malls.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Floor</label>
              <select
                value={form.floorId}
                onChange={(e) => setForm({ ...form, floorId: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={!form.mallId}
              >
                <option value="">Select Floor</option>
                {floors.map(f => <option key={f.id} value={f.id}>{f.name} (Floor {f.floorNumber})</option>)}
              </select>
            </div>
            {[
              { label: 'Store Name', key: 'name', placeholder: 'Zara' },
              { label: 'Category', key: 'category', placeholder: 'Fashion & Apparel' },
              { label: 'Phone', key: 'phone', placeholder: '+91-44-12345678' },
              { label: 'Email', key: 'email', placeholder: 'store@example.com' },
              { label: 'Website', key: 'website', placeholder: 'https://...' },
              { label: 'Logo URL', key: 'logo', placeholder: 'https://...' },
              { label: 'Coordinate X', key: 'coordinateX', placeholder: '150.5' },
              { label: 'Coordinate Y', key: 'coordinateY', placeholder: '200.3' },
            ].map(({ label, key, placeholder }) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                <input
                  value={(form as any)[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  placeholder={placeholder}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="storeActive" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} className="rounded" />
              <label htmlFor="storeActive" className="text-sm text-gray-700">Active</label>
            </div>
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <div className="flex gap-3 pt-2">
              <button onClick={() => setShowModal(false)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50">
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </Modal>
      )}

      {deleteId && (
        <ConfirmDialog
          message="Are you sure you want to delete this store? This action cannot be undone."
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </div>
  );
}

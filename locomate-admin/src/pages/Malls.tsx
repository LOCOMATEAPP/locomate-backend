import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, ChevronLeft, ChevronRight, Layers } from 'lucide-react';
import { mallsApi } from '../api/malls';
import Modal from '../components/Modal';
import ConfirmDialog from '../components/ConfirmDialog';

interface Mall {
  id: string;
  name: string;
  city: string;
  state: string;
  address: string;
  zipCode: string;
  latitude: number;
  longitude: number;
  description?: string;
  image?: string;
  isActive: boolean;
  createdAt: string;
}

const emptyForm = {
  name: '', address: '', city: '', state: '', zipCode: '',
  latitude: '', longitude: '', description: '', image: '', isActive: true,
};

export default function Malls() {
  const [malls, setMalls] = useState<Mall[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editMall, setEditMall] = useState<Mall | null>(null);
  const [form, setForm] = useState(emptyForm);
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

  const openCreate = () => {
    setEditMall(null);
    setForm(emptyForm);
    setError('');
    setShowModal(true);
  };

  const openEdit = (mall: Mall) => {
    setEditMall(mall);
    setForm({
      name: mall.name, address: mall.address, city: mall.city,
      state: mall.state, zipCode: mall.zipCode,
      latitude: String(mall.latitude), longitude: String(mall.longitude),
      description: mall.description || '', image: mall.image || '',
      isActive: mall.isActive,
    });
    setError('');
    setShowModal(true);
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
      const payload = {
        ...form,
        latitude: parseFloat(form.latitude as string),
        longitude: parseFloat(form.longitude as string),
      };
      if (editMall) {
        await mallsApi.update(editMall.id, payload);
      } else {
        await mallsApi.create(payload);
      }
      setShowModal(false);
      fetchMalls();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await mallsApi.delete(deleteId);
      setDeleteId(null);
      fetchMalls();
    } catch {}
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Malls</h1>
          <p className="text-gray-500 text-sm mt-1">{total} total malls</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
          <Plus size={18} /> Add Mall
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-400">Loading...</div>
        ) : malls.length === 0 ? (
          <div className="p-12 text-center text-gray-400">No malls found. Create your first mall!</div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Mall</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Location</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {malls.map((mall) => (
                <tr key={mall.id} className="hover:bg-gray-50">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      {mall.image ? (
                        <img src={mall.image} alt={mall.name} className="w-10 h-10 rounded-lg object-cover" />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                          <Layers size={18} className="text-blue-600" />
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-gray-800">{mall.name}</p>
                        <p className="text-xs text-gray-400">{mall.address}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-600">{mall.city}, {mall.state}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${mall.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                      {mall.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEdit(mall)} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Pencil size={16} />
                      </button>
                      <button onClick={() => setDeleteId(mall.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
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
        <Modal title={editMall ? 'Edit Mall' : 'Create Mall'} onClose={() => setShowModal(false)}>
          <div className="space-y-4">
            {[
              { label: 'Mall Name', key: 'name', placeholder: 'Phoenix Marketcity' },
              { label: 'Address', key: 'address', placeholder: '15, Velachery Main Road' },
              { label: 'City', key: 'city', placeholder: 'Chennai' },
              { label: 'State', key: 'state', placeholder: 'Tamil Nadu' },
              { label: 'Zip Code', key: 'zipCode', placeholder: '600042' },
              { label: 'Latitude', key: 'latitude', placeholder: '12.9926' },
              { label: 'Longitude', key: 'longitude', placeholder: '80.2207' },
              { label: 'Image URL', key: 'image', placeholder: 'https://...' },
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
              <input type="checkbox" id="isActive" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} className="rounded" />
              <label htmlFor="isActive" className="text-sm text-gray-700">Active</label>
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
          message="Are you sure you want to delete this mall? This action cannot be undone."
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </div>
  );
}

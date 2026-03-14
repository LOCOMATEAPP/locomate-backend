import { useEffect, useState } from 'react';
import { Building2, Store, TrendingUp, Users } from 'lucide-react';
import { mallsApi } from '../api/malls';
import { storesApi } from '../api/stores';

export default function Dashboard() {
  const [mallCount, setMallCount] = useState(0);
  const [storeCount, setStoreCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [mallsRes, storesRes] = await Promise.all([
          mallsApi.getAll(1, 1),
          storesApi.getAll(1, 1),
        ]);
        setMallCount(mallsRes.data.data.pagination.total);
        setStoreCount(storesRes.data.data.pagination.total);
      } catch {}
      setLoading(false);
    };
    fetchStats();
  }, []);

  const stats = [
    { label: 'Total Malls', value: mallCount, icon: Building2, color: 'bg-blue-500' },
    { label: 'Total Stores', value: storeCount, icon: Store, color: 'bg-green-500' },
    { label: 'Active Offers', value: '—', icon: TrendingUp, color: 'bg-purple-500' },
    { label: 'Total Users', value: '—', icon: Users, color: 'bg-orange-500' },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Welcome to Locomate Admin Panel</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-xl shadow-sm p-5 flex items-center gap-4">
            <div className={`${color} p-3 rounded-xl`}>
              <Icon size={24} className="text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-500">{label}</p>
              <p className="text-2xl font-bold text-gray-800">
                {loading ? '...' : value}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-4">
          <a href="/malls" className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Building2 size={20} className="text-blue-600" />
            <span className="text-sm font-medium text-gray-700">Manage Malls</span>
          </a>
          <a href="/stores" className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Store size={20} className="text-green-600" />
            <span className="text-sm font-medium text-gray-700">Manage Stores</span>
          </a>
        </div>
      </div>
    </div>
  );
}

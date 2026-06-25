import { useEffect, useState } from 'react';
import api from '../api/axios';
import { FiPackage, FiShoppingBag, FiUsers, FiDollarSign, FiTrendingUp } from 'react-icons/fi';

export default function Admin() {
  const [stats, setStats] = useState({});
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [tab, setTab] = useState('dashboard');

  useEffect(() => {
    api.get('/admin/stats').then(({ data }) => setStats(data));
    api.get('/admin/products').then(({ data }) => setProducts(data));
    api.get('/admin/orders').then(({ data }) => setOrders(data));
  }, []);

  const statCards = [
    { label: 'Products', value: stats.productsCount, icon: FiPackage, color: 'from-accent-cyan to-blue-600' },
    { label: 'Orders', value: stats.ordersCount, icon: FiShoppingBag, color: 'from-accent-purple to-pink-600' },
    { label: 'Users', value: stats.usersCount, icon: FiUsers, color: 'from-accent-gold to-yellow-600' },
    { label: 'Revenue', value: `$${stats.totalRevenue?.toFixed(2) || '0'}`, icon: FiDollarSign, color: 'from-green-500 to-emerald-600' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pb-24 md:pb-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent-cyan to-accent-purple flex items-center justify-center">
          <FiTrendingUp className="text-white" size={24} />
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white font-display">Admin Dashboard</h1>
          <p className="text-gray-400">Manage your store</p>
        </div>
      </div>

      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {['dashboard', 'products', 'orders'].map((t) => (
          <button 
            key={t} 
            onClick={() => setTab(t)} 
            className={`px-5 py-2.5 rounded-xl font-semibold capitalize whitespace-nowrap transition-all ${
              tab === t 
                ? 'bg-accent-cyan text-dark-900' 
                : 'bg-dark-700 text-gray-400 hover:bg-dark-600 border border-white/10'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'dashboard' && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((s) => (
            <div key={s.label} className="dark-card p-6">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-4`}>
                <s.icon className="text-white" size={24} />
              </div>
              <p className="text-2xl md:text-3xl font-bold text-white mb-1">{s.value}</p>
              <p className="text-sm text-gray-400">{s.label}</p>
            </div>
          ))}
        </div>
      )}

      {tab === 'products' && (
        <div className="dark-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-dark-700 border-b border-white/10">
                <tr>
                  <th className="p-4 text-left text-sm font-semibold text-gray-400">Name</th>
                  <th className="p-4 text-left text-sm font-semibold text-gray-400">Price</th>
                  <th className="p-4 text-left text-sm font-semibold text-gray-400">Stock</th>
                  <th className="p-4 text-left text-sm font-semibold text-gray-400">Sold</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p._id} className="border-b border-white/5 hover:bg-dark-700/50 transition-colors">
                    <td className="p-4 text-white font-medium">{p.name}</td>
                    <td className="p-4 text-accent-cyan font-semibold">${p.price}</td>
                    <td className="p-4 text-white">{p.stock}</td>
                    <td className="p-4 text-white">{p.sold}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'orders' && (
        <div className="dark-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-dark-700 border-b border-white/10">
                <tr>
                  <th className="p-4 text-left text-sm font-semibold text-gray-400">Order #</th>
                  <th className="p-4 text-left text-sm font-semibold text-gray-400">Customer</th>
                  <th className="p-4 text-left text-sm font-semibold text-gray-400">Total</th>
                  <th className="p-4 text-left text-sm font-semibold text-gray-400">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o._id} className="border-b border-white/5 hover:bg-dark-700/50 transition-colors">
                    <td className="p-4 text-white font-medium">{o.orderNumber}</td>
                    <td className="p-4 text-gray-400">{o.user?.email}</td>
                    <td className="p-4 text-accent-cyan font-semibold">${o.totalPrice.toFixed(2)}</td>
                    <td className="p-4">
                      <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-dark-600 text-white capitalize">
                        {o.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../api/axios';
import { useAuthStore } from '../store/authStore';
import { FiUser, FiShoppingBag, FiHeart, FiMapPin, FiPackage, FiClock, FiCheckCircle } from 'react-icons/fi';

export default function Profile() {
  const [params] = useSearchParams();
  const tab = params.get('tab') || 'profile';
  const { user } = useAuthStore();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (tab === 'orders') api.get('/orders/my').then(({ data }) => setOrders(data));
  }, [tab]);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: FiUser },
    { id: 'orders', label: 'Orders', icon: FiShoppingBag },
    { id: 'wishlist', label: 'Wishlist', icon: FiHeart },
    { id: 'addresses', label: 'Addresses', icon: FiMapPin },
  ];

  const statusColors = {
    delivered: 'bg-green-500/20 text-green-400 border-green-500/30',
    shipped: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    processing: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    pending: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    cancelled: 'bg-red-500/20 text-red-400 border-red-500/30',
  };

  const statusIcons = {
    delivered: FiCheckCircle,
    shipped: FiPackage,
    processing: FiClock,
    pending: FiClock,
    cancelled: FiPackage,
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 pb-24 md:pb-8">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 font-display">My Account</h1>
      
      <div className="grid md:grid-cols-4 gap-6">
        <aside className="md:col-span-1">
          <div className="dark-card p-6 sticky top-24">
            <div className="text-center mb-6 pb-6 border-b border-white/10">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent-cyan to-accent-purple flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3">
                {user?.name[0].toUpperCase()}
              </div>
              <p className="font-bold text-white">{user?.name}</p>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
            <nav className="space-y-1">
              {tabs.map((t) => (
                <a 
                  key={t.id} 
                  href={`/profile?tab=${t.id}`} 
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    tab === t.id 
                      ? 'bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/30' 
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <t.icon size={18} />
                  <span className="font-medium">{t.label}</span>
                </a>
              ))}
            </nav>
          </div>
        </aside>

        <div className="md:col-span-3">
          {tab === 'profile' && (
            <div className="dark-card p-6 md:p-8">
              <h2 className="font-bold text-white text-xl mb-6">Profile Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-dark-700 rounded-xl">
                  <p className="text-sm text-gray-500 mb-1">Full Name</p>
                  <p className="text-white font-medium">{user?.name}</p>
                </div>
                <div className="p-4 bg-dark-700 rounded-xl">
                  <p className="text-sm text-gray-500 mb-1">Email</p>
                  <p className="text-white font-medium">{user?.email}</p>
                </div>
                <div className="p-4 bg-dark-700 rounded-xl">
                  <p className="text-sm text-gray-500 mb-1">Member Since</p>
                  <p className="text-white font-medium">{new Date(user?.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="p-4 bg-dark-700 rounded-xl">
                  <p className="text-sm text-gray-500 mb-1">Account Type</p>
                  <p className="text-white font-medium capitalize">{user?.role}</p>
                </div>
              </div>
            </div>
          )}

          {tab === 'orders' && (
            <div className="space-y-4">
              {orders.length === 0 ? (
                <div className="dark-card p-8 text-center">
                  <FiShoppingBag className="mx-auto text-5xl text-gray-600 mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">No orders yet</h3>
                  <p className="text-gray-400">Start shopping to see your orders here</p>
                </div>
              ) : orders.map((o) => {
                const StatusIcon = statusIcons[o.status] || FiPackage;
                return (
                  <div key={o._id} className="dark-card p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-4 border-b border-white/10">
                      <div>
                        <p className="text-sm text-gray-500">Order Number</p>
                        <p className="font-bold text-white">{o.orderNumber}</p>
                      </div>
                      <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border ${statusColors[o.status]}`}>
                        <StatusIcon size={14} />
                        {o.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Placed on</p>
                        <p className="text-white">{new Date(o.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Total</p>
                        <p className="text-xl font-bold text-white">${o.totalPrice.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

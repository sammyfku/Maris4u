import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useCartStore } from '../store/cartStore';
import toast from 'react-hot-toast';
import { FiCreditCard, FiPaypal, FiDollarSign, FiCheck } from 'react-icons/fi';

export default function Checkout() {
  const navigate = useNavigate();
  const { items, clearCart } = useCartStore();
  const [form, setForm] = useState({ street: '', city: '', state: '', country: '', zip: '', phone: '', paymentMethod: 'card' });

  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const placeOrder = async () => {
    try {
      await api.post('/orders', {
        items: items.map((i) => ({ product: i.product._id, name: i.product.name, image: i.product.images[0], price: i.product.price, quantity: i.quantity, size: i.size, color: i.color })),
        shippingAddress: form,
        paymentMethod: form.paymentMethod,
        itemsPrice: subtotal,
        shippingPrice: shipping,
        taxPrice: tax,
        totalPrice: total,
      });
      clearCart();
      toast.success('Order placed successfully!');
      navigate('/profile?tab=orders');
    } catch {
      toast.error('Order failed. Please try again.');
    }
  };

  const paymentMethods = [
    { id: 'card', label: 'Credit Card', icon: FiCreditCard },
    { id: 'paypal', label: 'PayPal', icon: FiPaypal },
    { id: 'cod', label: 'Cash on Delivery', icon: FiDollarSign },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 pb-24 md:pb-8">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 font-display">Checkout</h1>
      
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Shipping Address */}
          <div className="dark-card p-6">
            <h3 className="font-bold text-white text-lg mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-accent-cyan/20 text-accent-cyan flex items-center justify-center text-sm font-bold">1</span>
              Shipping Address
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input placeholder="Street Address" value={form.street} onChange={(e) => setForm({ ...form, street: e.target.value })} className="modern-input sm:col-span-2" />
              <input placeholder="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="modern-input" />
              <input placeholder="State" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} className="modern-input" />
              <input placeholder="Country" value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} className="modern-input" />
              <input placeholder="ZIP Code" value={form.zip} onChange={(e) => setForm({ ...form, zip: e.target.value })} className="modern-input" />
              <input placeholder="Phone Number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="modern-input sm:col-span-2" />
            </div>
          </div>

          {/* Payment Method */}
          <div className="dark-card p-6">
            <h3 className="font-bold text-white text-lg mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-accent-cyan/20 text-accent-cyan flex items-center justify-center text-sm font-bold">2</span>
              Payment Method
            </h3>
            <div className="space-y-3">
              {paymentMethods.map((m) => (
                <label key={m.id} className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                  form.paymentMethod === m.id 
                    ? 'border-accent-cyan bg-accent-cyan/5' 
                    : 'border-white/10 hover:border-white/30'
                }`}>
                  <input 
                    type="radio" 
                    name="payment" 
                    value={m.id} 
                    checked={form.paymentMethod === m.id} 
                    onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    form.paymentMethod === m.id ? 'border-accent-cyan' : 'border-white/30'
                  }`}>
                    {form.paymentMethod === m.id && <div className="w-2.5 h-2.5 rounded-full bg-accent-cyan"></div>}
                  </div>
                  <m.icon className="text-gray-400" size={20} />
                  <span className="font-medium text-white">{m.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="dark-card p-6 sticky top-24">
            <h3 className="font-bold text-white text-lg mb-4">Order Summary</h3>
            
            <div className="space-y-3 mb-4 pb-4 border-b border-white/10 max-h-64 overflow-y-auto">
              {items.map((i) => (
                <div key={i.product._id} className="flex gap-3">
                  <img src={i.product.images[0]} className="w-14 h-14 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white line-clamp-1">{i.product.name}</p>
                    <p className="text-xs text-gray-500">Qty: {i.quantity}</p>
                  </div>
                  <span className="text-sm text-white font-semibold">${(i.product.price * i.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-sm mb-4 pb-4 border-b border-white/10">
              <div className="flex justify-between">
                <span className="text-gray-400">Subtotal</span>
                <span className="text-white">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Shipping</span>
                <span className="text-white">${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Tax</span>
                <span className="text-white">${tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between items-baseline mb-6">
              <span className="font-semibold text-white">Total</span>
              <span className="text-2xl font-bold text-white">${total.toFixed(2)}</span>
            </div>

            <button onClick={placeOrder} className="modern-btn w-full flex items-center justify-center gap-2">
              <FiCheck /> Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
          }

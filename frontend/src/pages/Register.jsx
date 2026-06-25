import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { FiUser, FiMail, FiLock, FiArrowRight } from 'react-icons/fi';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const { register, loading } = useAuthStore();
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) return alert('Passwords do not match');
    register(form.name, form.email, form.password).then(() => navigate('/'));
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute top-20 left-10 w-72 h-72 bg-accent-cyan/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-purple/10 rounded-full blur-3xl"></div>
      
      <div className="dark-card p-8 md:p-10 max-w-md w-full relative">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-accent-cyan to-accent-purple flex items-center justify-center">
            <span className="text-white font-bold text-2xl">M</span>
            </div>
          <h1 className="text-3xl font-bold text-white font-display">Create Account</h1>
          <p className="text-gray-400 mt-2">Join the Maris4u community</p>
        </div>
        
        <form onSubmit={submit} className="space-y-4">
          <div className="relative">
            <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input placeholder="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="modern-input pl-11" />
          </div>
          <div className="relative">
            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required className="modern-input pl-11" />
          </div>
          <div className="relative">
            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required className="modern-input pl-11" />
          </div>
          <div className="relative">
            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input type="password" placeholder="Confirm Password" value={form.confirm} onChange={(e) => setForm({ ...form, confirm: e.target.value })} required className="modern-input pl-11" />
          </div>
          <button disabled={loading} className="modern-btn w-full flex items-center justify-center gap-2 disabled:opacity-50">
            {loading ? 'Creating...' : <>Create Account <FiArrowRight /></>}
          </button>
        </form>
        
        <p className="text-center mt-6 text-sm text-gray-400">
          Already have an account? <Link to="/login" className="text-accent-cyan font-semibold hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
      }

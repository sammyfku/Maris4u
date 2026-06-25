import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import ProductCard from '../components/ProductCard';
import { FiArrowRight, FiZap, FiStar, FiTrendingUp, FiShield } from 'react-icons/fi';

const categories = [
  { name: 'Dresses', icon: '👗', color: 'from-accent-cyan/20 to-blue-600/20' },
  { name: 'Tops', icon: '👚', color: 'from-accent-purple/20 to-pink-600/20' },
  { name: 'Accessories', icon: '💍', color: 'from-accent-gold/20 to-yellow-600/20' },
  { name: 'Shoes', icon: '👠', color: 'from-accent-rose/20 to-red-600/20' },
  { name: 'Bags', icon: '👜', color: 'from-green-500/20 to-emerald-600/20' },
  { name: 'Jewelry', icon: '💎', color: 'from-cyan-500/20 to-teal-600/20' },
];

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [flash, setFlash] = useState([]);

  useEffect(() => {
    api.get('/products/featured').then(({ data }) => setFeatured(data));
    api.get('/products/flash').then(({ data }) => setFlash(data));
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 py-16 md:py-24">
        {/* Background Effects */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent-cyan/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-purple/10 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent-cyan/10 border border-accent-cyan/30 rounded-full text-accent-cyan text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-accent-cyan rounded-full animate-pulse"></span>
              New Collection 2026
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 font-display leading-tight">
              Redefine Your <br />
              <span className="gradient-text">Style Statement</span>
            </h1>
            <p className="text-gray-400 mb-8 text-lg max-w-lg">
              Discover premium fashion curated for the modern individual. Where elegance meets contemporary design.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/shop" className="modern-btn flex items-center justify-center gap-2">
                Shop Now <FiArrowRight />
              </Link>
              <Link to="/shop?sort=low" className="modern-btn-outline flex items-center justify-center gap-2">
                View Deals
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/10">
              <div>
                <p className="text-2xl md:text-3xl font-bold text-white">10K+</p>
                <p className="text-sm text-gray-500">Products</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-white">50K+</p>
                <p className="text-sm text-gray-500">Customers</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-white">4.9★</p>
                <p className="text-sm text-gray-500">Rating</p>
              </div>
            </div>
          </div>

          <div className="relative hidden md:block">
            <div className="relative bg-gradient-to-br from-dark-700 to-dark-800 rounded-3xl p-8 border border-white/10 shadow-2xl">
              <div className="aspect-square bg-gradient-to-br from-accent-cyan/20 to-accent-purple/20 rounded-2xl flex items-center justify-center">
                <span className="text-9xl"></span>
              </div>
              <div className="absolute -top-4 -right-4 bg-accent-cyan text-dark-900 font-bold px-4 py-2 rounded-xl shadow-lg">
                Featured
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="bg-dark-800 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: '🚚', title: 'Free Shipping', desc: 'On orders $50+' },
            { icon: '️', title: '30-Day Returns', desc: 'Hassle-free' },
            { icon: '🔒', title: 'Secure Payment', desc: 'SSL encrypted' },
            { icon: '💬', title: '24/7 Support', desc: 'Always here' },
          ].map((f, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-3xl">{f.icon}</span>
              <div>
                <p className="font-semibold text-white text-sm">{f.title}</p>
                <p className="text-xs text-gray-500">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-accent-cyan font-medium mb-2">BROWSE</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white font-display">Shop by Category</h2>
          </div>
          <Link to="/shop" className="hidden md:flex items-center gap-2 text-accent-cyan hover:gap-3 transition-all">
            View All <FiArrowRight />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link 
              key={cat.name} 
              to={`/shop?category=${cat.name}`} 
              className={`bg-gradient-to-br ${cat.color} border border-white/10 rounded-2xl p-6 text-center hover:border-accent-cyan/50 hover:scale-105 transition-all duration-300 group`}
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{cat.icon}</div>
              <p className="font-semibold text-white text-sm">{cat.name}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Flash Sales */}
      {flash.length > 0 && (
        <section className="bg-dark-800/50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-accent-gold font-medium mb-2 flex items-center gap-2">
                  <FiZap className="fill-current" /> LIMITED TIME
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-white font-display">Flash Sales</h2>
              </div>
              <Link to="/shop?flash=true" className="hidden md:flex items-center gap-2 text-accent-cyan hover:gap-3 transition-all">
                View All <FiArrowRight />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {flash.map((p) => <ProductCard key={p._id} product={p} />)}
            </div>
          </div>
        </section>
      )}

      {/* Featured */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-accent-purple font-medium mb-2 flex items-center gap-2">
              <FiStar className="fill-current" /> CURATED
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white font-display">Featured Products</h2>
          </div>
          <Link to="/shop" className="hidden md:flex items-center gap-2 text-accent-cyan hover:gap-3 transition-all">
            View All <FiArrowRight />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {featured.map((p) => <ProductCard key={p._id} product={p} />)}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="relative overflow-hidden bg-gradient-to-r from-accent-cyan/20 via-accent-purple/20 to-accent-rose/20 rounded-3xl p-8 md:p-16 border border-white/10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent-cyan/20 rounded-full blur-3xl"></div>
          <div className="relative max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 font-display">
              Join the Maris4u <span className="gradient-text">Experience</span>
            </h2>
            <p className="text-gray-300 mb-8 text-lg">
              Get exclusive access to new drops, member-only discounts, and early sale access.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md">
              <input placeholder="your@email.com" className="modern-input flex-1" />
              <button className="modern-btn whitespace-nowrap">Get Started</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
              }

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiHeart, FiUser, FiSearch, FiMenu, FiX, FiHome, FiGrid } from 'react-icons/fi';
import { useAuthStore } from '../store/authStore';
import { useCartStore } from '../store/cartStore';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuthStore();
  const { items } = useCartStore();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) navigate(`/shop?keyword=${search}`);
  };

  return (
    <>
      {/* Desktop/Tablet Navbar */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'glass shadow-2xl' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-cyan to-accent-purple flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <span className="text-xl font-bold font-display text-white group-hover:text-accent-cyan transition-colors">
              Maris4u
            </span>
          </Link>

          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl">
            <div className="relative w-full">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="modern-input pl-11 bg-dark-700"
              />
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            </div>
          </form>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link to="/shop" className="hidden md:block text-gray-300 hover:text-accent-cyan font-medium transition-colors">
              Shop
            </Link>
            
            <Link to="/wishlist" className="p-2.5 rounded-xl hover:bg-white/5 text-gray-300 hover:text-accent-cyan transition-all">
              <FiHeart size={22} />
            </Link>
            
            <Link to="/cart" className="relative p-2.5 rounded-xl hover:bg-white/5 text-gray-300 hover:text-accent-cyan transition-all">
              <FiShoppingCart size={22} />
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent-cyan text-dark-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </Link>

            {user ? (
              <div className="relative group">
                <button className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-white/5 transition-all">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent-cyan to-accent-purple flex items-center justify-center text-white font-bold text-sm">
                    {user.name[0].toUpperCase()}
                  </div>
                </button>
                <div className="absolute right-0 mt-2 w-56 bg-dark-700 rounded-2xl shadow-2xl border border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 overflow-hidden">
                  <Link to="/profile" className="block px-4 py-3 hover:bg-white/5 text-gray-300 hover:text-white transition-colors">My Profile</Link>
                  <Link to="/profile?tab=orders" className="block px-4 py-3 hover:bg-white/5 text-gray-300 hover:text-white transition-colors">My Orders</Link>
                  {user.role === 'admin' && (
                    <Link to="/admin" className="block px-4 py-3 hover:bg-white/5 text-gray-300 hover:text-white transition-colors">Admin Panel</Link>
                  )}
                  <div className="border-t border-white/10"></div>
                  <button onClick={logout} className="block w-full text-left px-4 py-3 hover:bg-accent-rose/10 text-accent-rose transition-colors">Logout</button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="modern-btn !py-2 !px-4 text-sm">Sign In</Link>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="bottom-nav">
        <div className="flex items-center justify-around py-3 px-4">
          <Link to="/" className="flex flex-col items-center gap-1 text-gray-400 hover:text-accent-cyan transition-colors">
            <FiHome size={22} />
            <span className="text-xs">Home</span>
          </Link>
          <Link to="/shop" className="flex flex-col items-center gap-1 text-gray-400 hover:text-accent-cyan transition-colors">
            <FiGrid size={22} />
            <span className="text-xs">Shop</span>
          </Link>
          <Link to="/cart" className="relative flex flex-col items-center gap-1 text-gray-400 hover:text-accent-cyan transition-colors">
            <FiShoppingCart size={22} />
            {items.length > 0 && (
              <span className="absolute -top-1 right-1/4 bg-accent-cyan text-dark-900 text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {items.length}
              </span>
            )}
            <span className="text-xs">Cart</span>
          </Link>
          <Link to="/profile" className="flex flex-col items-center gap-1 text-gray-400 hover:text-accent-cyan transition-colors">
            <FiUser size={22} />
            <span className="text-xs">Profile</span>
          </Link>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {open && (
        <div className="fixed inset-0 z-40 bg-dark-900/95 backdrop-blur-xl md:hidden">
          <div className="flex flex-col h-full p-6">
            <div className="flex justify-between items-center mb-8">
              <span className="text-xl font-bold text-white">Menu</span>
              <button onClick={() => setOpen(false)} className="p-2 text-white">
                <FiX size={24} />
              </button>
            </div>
            <form onSubmit={handleSearch} className="mb-6">
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." className="modern-input" />
            </form>
            <nav className="space-y-2 flex-1">
              <Link to="/shop" onClick={() => setOpen(false)} className="block py-3 px-4 rounded-xl hover:bg-white/5 text-white">Shop All</Link>
              <Link to="/cart" onClick={() => setOpen(false)} className="block py-3 px-4 rounded-xl hover:bg-white/5 text-white">Cart</Link>
              <Link to="/wishlist" onClick={() => setOpen(false)} className="block py-3 px-4 rounded-xl hover:bg-white/5 text-white">Wishlist</Link>
              <Link to="/profile" onClick={() => setOpen(false)} className="block py-3 px-4 rounded-xl hover:bg-white/5 text-white">Profile</Link>
              <Link to="/about" onClick={() => setOpen(false)} className="block py-3 px-4 rounded-xl hover:bg-white/5 text-white">About</Link>
              <Link to="/contact" onClick={() => setOpen(false)} className="block py-3 px-4 rounded-xl hover:bg-white/5 text-white">Contact</Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
                  }

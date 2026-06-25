import { Link } from 'react-router-dom';
import { FiInstagram, FiTwitter, FiFacebook, FiYoutube, FiArrowRight } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="bg-dark-900 border-t border-white/5 mt-16 pb-20 md:pb-0">
      {/* Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 border-b border-white/5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold text-white mb-1">Join the Maris4u Club</h3>
            <p className="text-gray-400">Get 15% off your first order + exclusive drops</p>
          </div>
          <div className="flex w-full md:w-auto gap-2">
            <input placeholder="Enter your email" className="modern-input md:w-80" />
            <button className="modern-btn whitespace-nowrap">
              Subscribe <FiArrowRight className="inline ml-1" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-cyan to-accent-purple flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <span className="text-xl font-bold text-white font-display">Maris4u</span>
          </div>
          <p className="text-gray-400 text-sm mb-4">Premium fashion for the modern individual. Curated with precision, delivered with care.</p>
          <div className="flex gap-3">
            {[FiInstagram, FiTwitter, FiFacebook, FiYoutube].map((Icon, i) => (
              <a key={i} className="w-10 h-10 rounded-xl bg-dark-700 border border-white/10 flex items-center justify-center text-gray-400 hover:text-accent-cyan hover:border-accent-cyan/50 transition-all">
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-4">Shop</h4>
          <ul className="space-y-2.5 text-sm text-gray-400">
            <li><Link to="/shop?category=Dresses" className="hover:text-accent-cyan transition-colors">Dresses</Link></li>
            <li><Link to="/shop?category=Tops" className="hover:text-accent-cyan transition-colors">Tops</Link></li>
            <li><Link to="/shop?category=Accessories" className="hover:text-accent-cyan transition-colors">Accessories</Link></li>
            <li><Link to="/shop?category=Shoes" className="hover:text-accent-cyan transition-colors">Shoes</Link></li>
            <li><Link to="/shop?category=Bags" className="hover:text-accent-cyan transition-colors">Bags</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-4">Support</h4>
          <ul className="space-y-2.5 text-sm text-gray-400">
            <li><Link to="/contact" className="hover:text-accent-cyan transition-colors">Contact Us</Link></li>
            <li><Link to="/about" className="hover:text-accent-cyan transition-colors">About Us</Link></li>
            <li><a className="hover:text-accent-cyan transition-colors cursor-pointer">Shipping Policy</a></li>
            <li><a className="hover:text-accent-cyan transition-colors cursor-pointer">Returns & Exchanges</a></li>
            <li><a className="hover:text-accent-cyan transition-colors cursor-pointer">FAQ</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-4">Legal</h4>
          <ul className="space-y-2.5 text-sm text-gray-400">
            <li><a className="hover:text-accent-cyan transition-colors cursor-pointer">Privacy Policy</a></li>
            <li><a className="hover:text-accent-cyan transition-colors cursor-pointer">Terms of Service</a></li>
            <li><a className="hover:text-accent-cyan transition-colors cursor-pointer">Cookie Policy</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-sm text-gray-500">© 2026 Maris4u. All rights reserved.</p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>🔒 Secure Payments</span>
            <span>🚚 Free Shipping $50+</span>
            <span>↩️ 30-Day Returns</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

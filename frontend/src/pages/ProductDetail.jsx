import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';
import { useCartStore } from '../store/cartStore';
import { FiStar, FiShoppingCart, FiHeart, FiCheck, FiTruck, FiRotateCcw, FiShield } from 'react-icons/fi';

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selected, setSelected] = useState({ size: '', color: '', qty: 1 });
  const { addToCart } = useCartStore();

  useEffect(() => {
    api.get(`/products/slug/${slug}`).then(({ data }) => setProduct(data));
    window.scrollTo(0, 0);
  }, [slug]);

  if (!product) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-accent-cyan text-2xl">Loading...</div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pb-24 md:pb-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <span className="hover:text-accent-cyan cursor-pointer">Home</span> / 
        <span className="hover:text-accent-cyan cursor-pointer ml-1">Shop</span> / 
        <span className="text-white ml-1">{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Images */}
        <div className="space-y-4">
          <div className="dark-card p-4 aspect-square">
            <img 
              src={product.images[selectedImage]} 
              alt={product.name} 
              className="w-full h-full object-cover rounded-xl" 
            />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, i) => (
                <button 
                  key={i} 
                  onClick={() => setSelectedImage(i)}
                  className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === i ? 'border-accent-cyan' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <p className="text-accent-cyan font-medium mb-2 uppercase tracking-wide text-sm">{product.category}</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 font-display">{product.name}</h1>
          
          <div className="flex items-center gap-3 mb-6">
            <div className="flex text-accent-gold">
              {[...Array(5)].map((_, i) => (
                <FiStar key={i} className={i < Math.round(product.rating) ? 'fill-current' : ''} />
              ))}
            </div>
            <span className="text-gray-400">({product.numReviews} reviews)</span>
            <span className="text-accent-cyan font-semibold">• {product.sold} sold</span>
          </div>

          <div className="flex items-baseline gap-3 mb-6 pb-6 border-b border-white/10">
            <span className="text-4xl font-bold text-white">${product.price}</span>
            {product.comparePrice && (
              <>
                <span className="text-xl text-gray-500 line-through">${product.comparePrice}</span>
                <span className="bg-accent-rose/20 text-accent-rose px-2 py-1 rounded-lg text-sm font-semibold">
                  Save ${(product.comparePrice - product.price).toFixed(2)}
                </span>
              </>
            )}
          </div>

          <p className="text-gray-400 mb-8 leading-relaxed">{product.description}</p>

          {product.sizes?.length > 0 && (
            <div className="mb-6">
              <label className="font-semibold text-white mb-3 block">Size</label>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((s) => (
                  <button 
                    key={s} 
                    onClick={() => setSelected({ ...selected, size: s })} 
                    className={`px-5 py-2.5 rounded-xl border font-medium transition-all ${
                      selected.size === s 
                        ? 'border-accent-cyan bg-accent-cyan/10 text-accent-cyan' 
                        : 'border-white/10 text-gray-400 hover:border-white/30'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.colors?.length > 0 && (
            <div className="mb-6">
              <label className="font-semibold text-white mb-3 block">Color</label>
              <div className="flex gap-3">
                {product.colors.map((c) => (
                  <button 
                    key={c} 
                    onClick={() => setSelected({ ...selected, color: c })} 
                    className={`w-10 h-10 rounded-full border-2 transition-all ${
                      selected.color === c ? 'border-accent-cyan scale-110 ring-2 ring-accent-cyan/30' : 'border-white/20'
                    }`} 
                    style={{ background: c }} 
                  />
                ))}
              </div>
            </div>
          )}

          <div className="mb-8">
            <label className="font-semibold text-white mb-3 block">Quantity</label>
            <div className="inline-flex items-center gap-1 bg-dark-700 rounded-xl border border-white/10 p-1">
              <button 
                onClick={() => setSelected({ ...selected, qty: Math.max(1, selected.qty - 1) })} 
                className="w-10 h-10 rounded-lg bg-dark-600 text-white font-bold hover:bg-dark-500 transition-colors"
              >
                −
              </button>
              <span className="font-bold text-white w-12 text-center">{selected.qty}</span>
              <button 
                onClick={() => setSelected({ ...selected, qty: Math.min(product.stock, selected.qty + 1) })} 
                className="w-10 h-10 rounded-lg bg-dark-600 text-white font-bold hover:bg-dark-500 transition-colors"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex gap-3 mb-8">
            <button 
              onClick={() => addToCart(product._id, selected.qty, selected.size, selected.color)} 
              disabled={product.stock === 0} 
              className="modern-btn flex-1 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiShoppingCart /> Add to Cart
            </button>
            <button className="w-14 h-14 rounded-xl bg-dark-700 border border-white/10 text-gray-400 hover:text-accent-rose hover:border-accent-rose/50 transition-all flex items-center justify-center">
              <FiHeart size={20} />
            </button>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-3 p-4 bg-dark-800 rounded-2xl border border-white/5">
            <div className="flex flex-col items-center text-center gap-1">
              <FiTruck className="text-accent-cyan" size={20} />
              <span className="text-xs text-gray-400">Free Shipping</span>
            </div>
            <div className="flex flex-col items-center text-center gap-1">
              <FiRotateCcw className="text-accent-cyan" size={20} />
              <span className="text-xs text-gray-400">30-Day Returns</span>
            </div>
            <div className="flex flex-col items-center text-center gap-1">
              <FiShield className="text-accent-cyan" size={20} />
              <span className="text-xs text-gray-400">Secure Payment</span>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-white mb-6 font-display">Customer Reviews</h2>
        {product.reviews.length === 0 ? (
          <div className="dark-card p-8 text-center">
            <p className="text-gray-400">No reviews yet. Be the first to review!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {product.reviews.map((r) => (
              <div key={r._id} className="dark-card p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-cyan to-accent-purple flex items-center justify-center text-white font-bold">
                    {r.name[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{r.name}</p>
                    <div className="flex text-accent-gold text-sm">
                      {[...Array(5)].map((_, i) => (
                        <FiStar key={i} className={i < r.rating ? 'fill-current' : ''} size={14} />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-400">{r.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

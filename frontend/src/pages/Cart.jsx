import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { FiTrash2, FiPlus, FiMinus, FiShoppingBag, FiArrowRight, FiTag } from 'react-icons/fi';

export default function Cart() {
  const { items, fetchCart, updateQty, removeFromCart } = useCartStore();

  useEffect(() => { fetchCart(); }, []);

  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20 text-center pb-24 md:pb-20">
        <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-dark-700 border border-white/10 flex items-center justify-center">
          <FiShoppingBag className="text-5xl text-gray-600" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 font-display">Your cart is empty</h2>
        <p className="text-gray-400 mb-8">Add some items to get started</p>
        <Link to="/shop" className="modern-btn inline-flex items-center gap-2">
          Start Shopping <FiArrowRight />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pb-24 md:pb-8">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 font-display">Shopping Cart</h1>
      
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.product._id} className="dark-card p-4 md:p-6 flex gap-4">
              <Link to={`/product/${item.product.slug}`} className="flex-shrink-0">
                <img src={item.product.images[0]} className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-xl" />
              </Link>
              <div className="flex-1 min-w-0">
                <Link to={`/product/${item.product.slug}`} className="font-semibold text-white hover:text-accent-cyan transition-colors line-clamp-1">
                  {item.product.name}
                </Link>
                <div className="flex flex-wrap gap-3 mt-1 text-sm text-gray-400">
                  {item.size && <span>Size: <span className="text-white">{item.size}</span></span>}
                  {item.color && <span>Color: <span className="text-white">{item.color}</span></span>}
                </div>
                <p className="font-bold text-white text-lg mt-2">${item.product.price}</p>
                
                <div className="flex items-center justify-between mt-3">
                  <div className="inline-flex items-center gap-1 bg-dark-700 rounded-lg border border-white/10 p-1">
                    <button onClick={() => updateQty(item.product._id, Math.max(1, item.quantity - 1))} className="w-8 h-8 rounded-md bg-dark-600 text-white hover:bg-dark-500 transition-colors">
                      <FiMinus className="mx-auto" size={14} />
                    </button>
                    <span className="font-semibold text-white w-8 text-center text-sm">{item.quantity}</span>
                    <button onClick={() => updateQty(item.product._id, item.quantity + 1)} className="w-8 h-8 rounded-md bg-dark-600 text-white hover:bg-dark-500 transition-colors">
                      <FiPlus className="mx-auto" size={14} />
                    </button>
                  </div>
                  <button onClick={() => removeFromCart(item.product._id)} className="text-gray-500 hover:text-accent-rose transition-colors p-2">
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="dark-card p-6 sticky top-24">
            <h3 className="font-bold text-white text-lg mb-4">Order Summary</h3>
            
            <div className="space-y-3 text-sm mb-4 pb-4 border-b border-white/10">
              <div className="flex justify-between">
                <span className="text-gray-400">Subtotal</span>
                <span className="text-white">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Shipping</span>
                <span className={shipping === 0 ? 'text-accent-cyan font-semibold' : 'text-white'}>
                  {shipping === 0 ? 'FREE' : `$${shipping}`}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-baseline mb-6">
              <span className="font-semibold text-white">Total</span>
              <span className="text-2xl font-bold text-white">${total.toFixed(2)}</span>
            </div>

            <Link to="/checkout" className="modern-btn w-full flex items-center justify-center gap-2">
              Proceed to Checkout <FiArrowRight />
            </Link>

            <div className="mt-4 p-3 bg-accent-cyan/10 border border-accent-cyan/30 rounded-xl flex items-start gap-2">
              <FiTag className="text-accent-cyan flex-shrink-0 mt-0.5" />
              <p className="text-xs text-gray-300">
                Add ${(50 - subtotal).toFixed(2)} more for free shipping!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
      }

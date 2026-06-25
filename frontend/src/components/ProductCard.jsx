import { Link } from 'react-router-dom';
import { FiHeart, FiStar, FiShoppingBag } from 'react-icons/fi';

export default function ProductCard({ product }) {
  const discount = product.comparePrice
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : 0;

  return (
    <Link to={`/product/${product.slug}`} className="dark-card overflow-hidden group glow-border">
      <div className="relative aspect-[3/4] overflow-hidden bg-dark-700">
        <img 
          src={product.images[0]} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {discount > 0 && (
            <span className="bg-accent-rose text-white text-xs font-bold px-2.5 py-1 rounded-lg">
              -{discount}%
            </span>
          )}
          {product.isFlashSale && (
            <span className="bg-accent-gold text-dark-900 text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1">
              ⚡ Flash
            </span>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button className="w-9 h-9 bg-dark-800/90 backdrop-blur rounded-xl flex items-center justify-center text-white hover:bg-accent-cyan hover:text-dark-900 transition-all">
            <FiHeart size={16} />
          </button>
          <button className="w-9 h-9 bg-dark-800/90 backdrop-blur rounded-xl flex items-center justify-center text-white hover:bg-accent-cyan hover:text-dark-900 transition-all">
            <FiShoppingBag size={16} />
          </button>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      <div className="p-4">
        <p className="text-xs text-accent-cyan font-medium mb-1 uppercase tracking-wide">{product.category}</p>
        <h3 className="font-semibold text-white line-clamp-1 mb-2 group-hover:text-accent-cyan transition-colors">
          {product.name}
        </h3>
        
        <div className="flex items-center gap-1.5 mb-2">
          <div className="flex text-accent-gold text-sm">
            {[...Array(5)].map((_, i) => (
              <FiStar key={i} className={i < Math.round(product.rating) ? 'fill-current' : ''} size={14} />
            ))}
          </div>
          <span className="text-xs text-gray-500">({product.numReviews})</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-white">${product.price}</span>
            {product.comparePrice && (
              <span className="text-sm text-gray-500 line-through">${product.comparePrice}</span>
            )}
          </div>
          {product.stock < 10 && product.stock > 0 && (
            <span className="text-xs text-accent-rose font-medium">Only {product.stock} left</span>
          )}
        </div>
      </div>
    </Link>
  );
}

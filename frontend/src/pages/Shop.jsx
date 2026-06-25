import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../api/axios';
import ProductCard from '../components/ProductCard';
import { FiFilter, FiX, FiChevronDown } from 'react-icons/fi';

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: params.get('category') || '',
    keyword: params.get('keyword') || '',
    sort: params.get('sort') || '',
    minPrice: '',
    maxPrice: '',
  });

  const fetchProducts = async () => {
    const query = new URLSearchParams();
    if (filters.keyword) query.set('keyword', filters.keyword);
    if (filters.category) query.set('category', filters.category);
    if (filters.sort) query.set('sort', filters.sort);
    if (filters.minPrice) query.set('minPrice', filters.minPrice);
    if (filters.maxPrice) query.set('maxPrice', filters.maxPrice);
    query.set('page', page);
    const { data } = await api.get(`/products?${query}`);
    setProducts(data.products);
    setPages(data.pages);
  };

  useEffect(() => { fetchProducts(); }, [page, params]);

  const applyFilter = (key, value) => {
    setFilters({ ...filters, [key]: value });
    setPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pb-24 md:pb-8">
      {/* Header */}
      <div className="mb-8">
        <p className="text-accent-cyan font-medium mb-2">COLLECTION</p>
        <h1 className="text-3xl md:text-5xl font-bold text-white font-display">
          {filters.category ? `${filters.category}` : 'All Products'}
        </h1>
        <p className="text-gray-400 mt-2">{products.length} products found</p>
      </div>

      {/* Mobile Filter Button */}
      <button 
        onClick={() => setShowFilters(!showFilters)} 
        className="md:hidden modern-btn-outline w-full mb-4 flex items-center justify-center gap-2"
      >
        <FiFilter /> Filters & Sort
      </button>

      <div className="grid md:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <aside className={`md:col-span-1 ${showFilters ? 'fixed inset-0 z-50 bg-dark-900 p-6 overflow-y-auto' : 'hidden md:block'}`}>
          <div className="flex md:hidden justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-white">Filters</h3>
            <button onClick={() => setShowFilters(false)} className="text-white">
              <FiX size={24} />
            </button>
          </div>

          <div className="dark-card p-6 sticky top-24 space-y-6">
            <div>
              <label className="text-sm font-semibold text-white mb-2 block">Category</label>
              <select 
                value={filters.category} 
                onChange={(e) => applyFilter('category', e.target.value)} 
                className="modern-input appearance-none cursor-pointer"
              >
                <option value="">All Categories</option>
                <option>Dresses</option>
                <option>Tops</option>
                <option>Accessories</option>
                <option>Shoes</option>
                <option>Bags</option>
                <option>Jewelry</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-white mb-2 block">Sort By</label>
              <select 
                value={filters.sort} 
                onChange={(e) => applyFilter('sort', e.target.value)} 
                className="modern-input appearance-none cursor-pointer"
              >
                <option value="">Newest First</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-white mb-2 block">Price Range</label>
              <div className="flex gap-2">
                <input 
                  type="number" 
                  placeholder="Min" 
                  value={filters.minPrice} 
                  onChange={(e) => applyFilter('minPrice', e.target.value)} 
                  className="modern-input !px-3" 
                />
                <input 
                  type="number" 
                  placeholder="Max" 
                  value={filters.maxPrice} 
                  onChange={(e) => applyFilter('maxPrice', e.target.value)} 
                  className="modern-input !px-3" 
                />
              </div>
            </div>

            <button 
              onClick={() => { setFilters({ category: '', keyword: '', sort: '', minPrice: '', maxPrice: '' }); setPage(1); }} 
              className="modern-btn-outline w-full"
            >
              Clear Filters
            </button>

            {showFilters && (
              <button onClick={() => setShowFilters(false)} className="modern-btn w-full md:hidden">
                Apply Filters
              </button>
            )}
          </div>
        </aside>

        {/* Products Grid */}
        <div className="md:col-span-3">
          {products.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4"></div>
              <h3 className="text-xl font-bold text-white mb-2">No products found</h3>
              <p className="text-gray-500">Try adjusting your filters</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {products.map((p) => <ProductCard key={p._id} product={p} />)}
              </div>
              
              {pages > 1 && (
                <div className="flex justify-center gap-2 mt-12">
                  {Array.from({ length: pages }, (_, i) => (
                    <button 
                      key={i} 
                      onClick={() => setPage(i + 1)} 
                      className={`w-10 h-10 rounded-xl font-semibold transition-all ${
                        page === i + 1 
                          ? 'bg-accent-cyan text-dark-900' 
                          : 'bg-dark-700 text-gray-400 hover:bg-dark-600 border border-white/10'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
      }

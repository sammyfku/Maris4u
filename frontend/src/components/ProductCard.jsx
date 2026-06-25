import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => (
  <div className="border p-4">
    <img src={product.image || '/logo.svg'} alt={product.name} className="w-full h-40 object-cover" />
    <h3 className="font-bold mt-2">{product.name}</h3>
    <p>${product.price}</p>
    <Link to={`/product/${product._id}`} className="text-indigo-600">View</Link>
  </div>
);

export default ProductCard;

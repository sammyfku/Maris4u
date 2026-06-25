import React from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold">Product {id}</h2>
      <p>Details about the product.</p>
    </div>
  );
};

export default ProductDetail;

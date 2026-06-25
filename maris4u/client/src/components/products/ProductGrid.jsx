import React from 'react'
import ProductCard from './ProductCard'

export default function ProductGrid({products=[]}){
  return (
    <section>
      {products.map(p => <ProductCard key={p._id||p.id} product={p} />)}
    </section>
  )
}

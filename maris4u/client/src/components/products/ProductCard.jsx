import React from 'react'

export default function ProductCard({product}){
  return (
    <article>
      <h3>{product.name}</h3>
      <p>${product.price}</p>
    </article>
  )
}

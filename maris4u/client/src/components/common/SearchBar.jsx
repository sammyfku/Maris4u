import React from 'react'

export default function SearchBar({ value='', onChange }){
  return (
    <div className="searchbar">
      <input
        aria-label="Search"
        placeholder="Search products..."
        value={value}
        onChange={e => onChange && onChange(e.target.value)}
      />
    </div>
  )
}

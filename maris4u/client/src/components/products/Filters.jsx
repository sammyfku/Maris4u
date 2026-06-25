import React, { useState } from 'react'

export default function Filters({ onChange }){
  const [query,setQuery] = useState('')
  const [animeStyle,setAnimeStyle] = useState('')

  function apply(){
    onChange && onChange({ query, animeStyle })
  }

  return (
    <aside className="filters">
      <label>
        Search
        <input value={query} onChange={e=>setQuery(e.target.value)} />
      </label>
      <label>
        Anime style
        <select value={animeStyle} onChange={e=>setAnimeStyle(e.target.value)}>
          <option value="">Any</option>
          <option value="chibi">Chibi</option>
          <option value="shoujo">Shoujo</option>
          <option value="shounen">Shounen</option>
        </select>
      </label>
      <button onClick={apply}>Apply</button>
    </aside>
  )
}

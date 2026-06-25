import React from 'react'

export default function Spinner(){
  return (
    <div className="spinner" aria-live="polite" style={{padding:'1rem'}}>
      <svg width="36" height="36" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <circle cx="25" cy="25" r="20" fill="none" stroke="#e5e7eb" strokeWidth="5" />
        <path d="M45 25a20 20 0 0 1-20 20" stroke="#6366f1" strokeWidth="5" fill="none" strokeLinecap="round">
          <animateTransform attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="1s" repeatCount="indefinite" />
        </path>
      </svg>
      <span style={{marginLeft:8}}>Loading…</span>
    </div>
  )
}

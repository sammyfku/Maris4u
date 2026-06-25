import React from 'react'

export default function AdminTable({ columns=[], rows=[] }){
  return (
    <div className="admin-table">
      <table>
        <thead>
          <tr>{columns.map(c=> <th key={c}>{c}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>{columns.map(c=> <td key={c}>{r[c] ?? ''}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

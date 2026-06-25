import React from 'react'
import { Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export default function AdminRoute({ children }){
  const { user } = useContext(AuthContext)
  if(!user || user.role !== 'admin') return <Navigate to="/" replace />
  return children
}

import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

function PrivateRouter({children}) {
    const auth = localStorage.getItem('token')
  return (
    <div>
      {auth?children:<Navigate to='/' />}
    </div>
  )
}

export default PrivateRouter

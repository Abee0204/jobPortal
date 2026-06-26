import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex flex-row justify-centre-safe'>
      <NavLink to={"/"}>Logo</NavLink>
      <NavLink to={'/jobs'}>Jobs</NavLink>
      <p>Login</p>
      <p>Register</p>
      
    </div>
  )
}

export default Navbar

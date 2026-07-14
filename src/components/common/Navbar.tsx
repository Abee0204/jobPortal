
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex flex-row justify-centre-safe gap-3'>
      <NavLink to={"/"}>Logo</NavLink>
      <NavLink to={'/jobs'}>Jobs</NavLink>
      <NavLink to={'/login'}>Login</NavLink>
      <NavLink to={'/register'}>Register</NavLink>
      
    </div>
  )
}

export default Navbar

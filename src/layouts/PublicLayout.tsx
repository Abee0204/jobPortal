
import { Outlet } from 'react-router-dom'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'

const PublicLayout = () => {
  return (
    <div>
      <header className="top-navbar">
        <Navbar />
      </header>

      <Outlet/>
      
      <Footer/>
    </div>
  )
}

export default PublicLayout

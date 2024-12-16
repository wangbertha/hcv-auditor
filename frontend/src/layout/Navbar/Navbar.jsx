import { Link } from 'react-router-dom'

import homeicon from '../../assets/home-icon.png'
import profileicon from '../../assets/profile-icon.png'

import './Navbar.css'

export const Navbar = () => {

  return (
    <div className='navbar'>
        <div className="nav-logo">
            <Link to='/'><img src={homeicon} alt="" /></Link>
            <p>HCV Auditor</p>
        </div>
        <div className="nav-profile">
            <Link to='/profile'><img src={profileicon} alt="" /></Link>
        </div>
    </div>
  )
}

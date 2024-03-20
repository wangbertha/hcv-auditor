import React from 'react'
import './Navbar.css'
import homeicon from '../Assets/home-icon.png'
import profileicon from '../Assets/profile-icon.png'
import { Link } from 'react-router-dom'

export const Navbar = () => {
  return (
    <div className='navbar'>
        <div className="nav-logo">
            <Link to='/'>
                <img src={homeicon} alt="" />
            </Link>
            <p>Section 8 Auditor</p>
        </div>
        <div className="nav-login">
            <Link to='/login'><button>Login</button></Link>
        </div>
        <div className="nav-profile">
            <Link to='/profile'><img src={profileicon} alt="" /></Link>
        </div>
    </div>
  )
}

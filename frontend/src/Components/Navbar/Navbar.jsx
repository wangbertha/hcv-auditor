import React from 'react'
import './Navbar.css'
import homeicon from '../Assets/home-icon.png'
import profileicon from '../Assets/profile-icon.png'
import { Link } from 'react-router-dom'

export const Navbar = () => {

  return (
    <div className='navbar'>
        <div className="nav-logo">
            <Link to='/home'><img src={homeicon} alt="" /></Link>
            <p>HCV Auditor</p>
        </div>
        <div className="nav-profile">
            <Link to='/profile'><img src={profileicon} alt="" /></Link>
        </div>
    </div>
  )
}

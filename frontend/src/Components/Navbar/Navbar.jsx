import React, { useContext } from 'react'
import './Navbar.css'
import homeicon from '../Assets/home-icon.png'
import profileicon from '../Assets/profile-icon.png'
import { Link } from 'react-router-dom'
import { ListContext } from '../../Context/ListContext'

export const Navbar = () => {
    const {login} = useContext(ListContext)
    const clicked = () => {
        console.log(login)
    }
  return (
    <div className='navbar'>
        <div className="nav-logo">
            <Link to='/home'>
                <img src={homeicon} alt="" />
            </Link>
            <p>Section 8 Auditor</p>
        </div>
        {/* <button onClick={clicked}>testing login status</button> */}
        {!login && <div className="nav-login">
            <Link to='/login'><button>Login</button></Link>
        </div>}
        {login && <div className="nav-profile">
            <Link to='/profile'><img src={profileicon} alt="" /></Link>
        </div>}
    </div>
  )
}

import React, { useContext, useState } from 'react'
import './Navbar.css'
import homeicon from '../Assets/home-icon.png'
import profileicon from '../Assets/profile-icon.png'
import { Link } from 'react-router-dom'
import { ListContext } from '../../Context/ListContext'

export const Navbar = () => {
    const { login } = useContext(ListContext)
    const [open, setOpen] = useState(false)
    // const [display, setDisplay] = useState('-Select Reviewer-')
    // const optionsReviewer = ['-Select Reviewer-','Reviewer #1','Reviewer #2']

    const toggleMenu = () => {
      setOpen(!open)
    }

    const addColumn = async () => {
        try {
            await fetch(`http://localhost:4000/addColumn`,{
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify()
            })
        }
        catch (err) {
            console.error(err.message)
        }
    }

    // const handleClick = (value) => {
    //   setOpen(false)
    //   setDisplay(value)
    //   setReviewer(value)
    // }

  return (
    <div className='navbar'>
        <div className="nav-logo">
            <Link to='/home'>
                <img src={homeicon} alt="" />
            </Link>
            <p>HCV Auditor</p>
        </div>
        {!login && <div className="nav-login">
            <Link to='/login'><button>Login</button></Link>
        </div>}
        {login && <div className="nav-profile">
            <Link to='/profile'><img src={profileicon} alt="" /></Link>
        </div>}
        {/* <div className="select-reviewer">
            <button className='reviewer-btn' onClick={toggleMenu}>
                {display}
            </button>
            {open && <div className="options-menu">
                {optionsReviewer.map((opt, index) => (
                <ul onClick={() => {handleClick(opt)}} key={index}>{opt}</ul>
                ))}
            </div>}
        </div> */}
    </div>
  )
}

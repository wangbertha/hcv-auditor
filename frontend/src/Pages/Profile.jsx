import React, { useContext } from 'react'
import './CSS/Profile.css'
import { Link } from 'react-router-dom'
import { ListContext } from '../Context/ListContext'

const Profile = () => {
  const { setLogin } = useContext(ListContext)

  const handleClick = (e) => {
    setLogin(false)
    localStorage.setItem("auth-token",false)
  }
  return (
    <div className='profile'>
      <div className="profile-left">
        <h1>Settings</h1>
        <ul>
          <li className='selected'>Account</li>
          <Link to='/login' onClick={handleClick}><li>Sign Out</li></Link>
        </ul>
      </div>
      <div className="profile-right">
        <div className="profile-account">
          <h2>Account</h2>
          <p>[List of reviewers? (Add, Edit, Delete functions)]</p>
        </div>
      </div>
    </div>
  )
}

export default Profile
import React, { useContext } from 'react'
import './CSS/Profile.css'
import { Link } from 'react-router-dom'
import { ListContext } from '../Context/ListContext'

const Profile = () => {
  const {setLogin, user} = useContext(ListContext)

  const handleClick = (e) => {
    setLogin(false)
  }
  return (
    <div className='profile'>
      <div className="profile-left">
        <h1>Profile</h1>
        <ul>
          <li className='selected'>Account</li>
          <Link to='/login' onClick={handleClick}><li>Sign Out</li></Link>
        </ul>
      </div>
      <div className="profile-right">
        <div className="profile-account">
          <h2>Account</h2>
          <p>Name: {user}</p>
          <p>Email: </p>
          <p>Password: </p>
        </div>
        <div className="profile-settings">
          <h3>Settings</h3>
          <p>Number of Daily Assignments: </p>
        </div>
      </div>
    </div>
  )
}

export default Profile
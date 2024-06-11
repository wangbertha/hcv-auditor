import React from 'react'
import './CSS/Profile.css'

const Profile = () => {

  return (
    <div className='profile'>
      <div className="profile-left">
        <h1>Settings</h1>
        <ul>
          <li className='selected'>Account</li>
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
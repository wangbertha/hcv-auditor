import React from 'react'
import { Link } from 'react-router-dom'
import './CSS/Welcome.css'

const Login = () => {
  return (
    <div className='welcome-container'>
      <h1>Welcome!</h1>
      <Link to='/home'><button className='welcome-container-btn'>Home</button></Link>
      <Link to='/profile'><button className='welcome-container-btn'>Profile</button></Link>
    </div>
  )
}

export default Login
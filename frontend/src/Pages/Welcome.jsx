import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div>
      <div>
        <p>Welcome!</p>
        <Link to='/home'><button>Home</button></Link>
        <Link to='/profile'><button>Profile</button></Link>
      </div>
    </div>
  )
}

export default Login
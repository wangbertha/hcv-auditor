import React, { useContext, useState } from 'react'
import './CSS/Login.css'
import { Link } from 'react-router-dom'
import { ListContext } from '../Context/ListContext'

const Login = () => {
  const {setLogin, setUser} = useContext(ListContext)
  const [name, setName] = useState('')

  const handleClick = (e) => {
    setLogin(true)
    setUser(name)
  }

  return (
    <div>
      <div className='login'>
        <div className="login-container">
          <h1>Log In</h1>
          <div className="login-fields">
            <input type="text" placeholder='Your Name' onChange={(e) => setName(e.target.value)}/>
            <input type="email" placeholder='Email Address' />
            <input type="password" placeholder='Password' />
          </div>
          <Link to='/profile' onClick={handleClick}><button>Continue</button></Link>
        </div>
      </div>
    </div>
  )
}

export default Login
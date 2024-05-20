import React, { useContext, useState } from 'react'
import './CSS/Login.css'
import { Link, Redirect } from 'react-router-dom'
import { ListContext } from '../Context/ListContext'

const Login = () => {
  const { login, setLogin } = useContext(ListContext)
  const [name, setName] = useState('')
  const [pass, setPass] = useState('')
  const [shown, setShown] = useState(false)
  const [alert1, setAlert1] = useState(false)
  const [alert2, setAlert2] = useState(false)

  const handleSubmit = (e) => {
    if (name=='' || pass=='') {
      setAlert1(true)
    }
    else if (name=='hcv_auditor' && pass=='testing123') {
      setLogin(true)
      localStorage.setItem("auth-token",true)
    }
    else {
      setAlert2(true)
    }
  }

  const handleSignOut = () => {
    setLogin(false)
    setName('')
    setPass('')
    setAlert1(false)
    setAlert2(false)
  }

  return (
    <div>
      {!login && <div className='login'>
        <div className="login-container">
          <h1>Log In</h1>
          <div className="login-fields">
            <input type="text" placeholder='Username' onChange={(e) => setName(e.target.value)}/>
            <form onSubmit={handleSubmit}>
              <div className='password'>
                {!shown ? <input type="password" placeholder='Password' onChange={(e) => setPass(e.target.value)} /> : 
                  <input type="text" placeholder='Password' onChange={(e) => setPass(e.target.value)} />
                }
                <input type='checkbox' onClick={() => setShown(!shown)} className='checkbox'></input>
              </div>
              {alert1 && <p className='alert'>Username and password fields are required.</p>}
              {alert2 && <p className='alert'>Username and password combination is incorrect.</p>}
              <button type='submit'>Continue</button>
            </form>
          </div>
        </div>
      </div>}
      {login && <div className="login login-container">
        <p>You are successfully logged in!</p>
        <Link to='/home'><button>Home</button></Link>
        <Link to='/profile'><button>Profile</button></Link>
        <Link to='/login'><button onClick={handleSignOut}>Sign Out</button></Link>
      </div> }
    </div>
  )
}

export default Login
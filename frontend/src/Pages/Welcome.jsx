import { Link } from 'react-router-dom'

import './CSS/Welcome.css'

const Login = () => {
  return (
    <div className='welcome-container'>
      <h1>Welcome!</h1>
      <Link to='/profile'><button className='welcome-container-btn'>Profile</button></Link>
      <Link to='/listings'><button className='welcome-container-btn'>Listings</button></Link>
    </div>
  )
}

export default Login
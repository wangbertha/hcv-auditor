import './App.css'
import { Navbar } from './Components/Navbar/Navbar'
import { Footer } from './Components/Footer/Footer'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Profile from './Pages/Profile'
import Listing from './Pages/Listing'

function App() {
  return (
    <div className='app'>
      <BrowserRouter>
        <Navbar />
        {!localStorage.getItem("auth-token")=='false' && <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/home' element={<Login/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>}
        {localStorage.getItem("auth-token")=='true' && <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/profile' element={<Profile/>}>
          </Route>
          <Route path='/listing' element={<Listing/>}>
            <Route path=':listingId' element={<Listing/>}/>
          </Route>
        </Routes>}
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
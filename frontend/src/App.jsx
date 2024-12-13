import { Navbar } from './Components/Navbar/Navbar'
import { Footer } from './Components/Footer/Footer'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Welcome from './Pages/Welcome'
import Home from './Pages/Home'
import Profile from './Pages/Profile'
import Listing from './Pages/Listing'

import './App.css'

function App() {

  return (
    <div className='app'>
      <BrowserRouter>
        <Navbar />
        <div className='container'>
          <Routes>
            <Route path='/' element={<Welcome/>}/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/listing' element={<Listing/>}>
              <Route path=':listingId' element={<Listing/>}/>
            </Route>
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
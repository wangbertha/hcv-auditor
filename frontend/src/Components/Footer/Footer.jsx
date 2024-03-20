import React from 'react'
import './Footer.css'
import homeicon from '../Assets/home-icon.png'

export const Footer = () => {
  return (
    <div className='footer'>
        <div className="footer-logo">
            <img src={homeicon} alt="" />
        </div>
        <div className="footer-right">
          <ul className="footer-links">
            <li>Company</li>
            <li>Address</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
          <p>*Icons used are pulled from Microsoft Suite icons*</p>
        </div>
    </div>
  )
}

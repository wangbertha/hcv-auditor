import homeicon from '../Assets/home-icon.png'

import './Footer.css'

export const Footer = () => {

  const visitFooterPage = (footerPage) => {
    window.open(footerPage, '_blank')
  }

  return (
    <div className='footer'>
        <div className="footer-logo">
            <img src={homeicon} alt="" />
        </div>
        <div className="footer-right">
          <ul className="footer-links">
            <li onClick={() => visitFooterPage("https://www.cafha.net/")}>CAFHA</li>
            <li onClick={() => visitFooterPage("https://dcfs.illinois.gov/brighter-futures/independence/housing/subsidized-housing.html")}>About Section 8</li>
            <li>Webpage Feedback</li>
          </ul>
          <p>Webpage created for internal use only for the Chicago Area Fair Housing Alliance (CAFHA).</p>
        </div>
    </div>
  )
}

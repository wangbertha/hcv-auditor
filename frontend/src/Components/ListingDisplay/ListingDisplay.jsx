import React from 'react'
import './ListingDisplay.css'
import { Dropdown } from '../Dropdown/Dropdown'

const ListingDisplay = (props) => {
    const {listing} = props

    const optionsExclusionary = ['Yes','No']
    const optionsAuditStatus = ['Pending Review','In Progress','Complete']
    const optionsEmailSent = ['Yes','No']
    
    const visitWebPage = () => {
        window.open(listing.url, '_blank')
    }

  return (
    <div className='listingdisplay'>
        <div className="listingdisplay-left">
            <h2>{listing.title}</h2> 
            <p>{listing.body}</p>
        </div>
        <div className="listingdisplay-right">
            <button onClick={visitWebPage}>Original Listing</button>
            <h3>Exclusionary</h3>
            <Dropdown field="exclusionary" options={optionsExclusionary}/>
            <h3>Audit Status</h3>
            <Dropdown field="status" options={optionsAuditStatus}/>
            <h3>Email Sent</h3>
            <Dropdown field="email sent" options={optionsEmailSent}/>
        </div>
    </div>
  )
}

export default ListingDisplay
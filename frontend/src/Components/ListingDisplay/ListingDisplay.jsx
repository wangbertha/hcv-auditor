import React, { useContext } from 'react'
import './ListingDisplay.css'
import { Dropdown } from '../Dropdown/Dropdown'
import { ListContext } from '../../Context/ListContext'
import { Link } from 'react-router-dom'

const ListingDisplay = (props) => {
    const {listing} = props
    const {updateField, user} = useContext(ListContext)

    const optionsExclusionary = ['-Choose One-','Yes','No']
    const optionsAuditStatus = ['-Choose One-','Assigned','In Progress','Complete']
    const optionsActionsTaken = ['-Choose One-','Email Sent','Referral Sent','No Action Required','Other (See Notes)']
    const optionsReferredTo = ['-Choose One-','Option 1','Other','Not Applicable']
    const optionsReviewer = ['-Choose One-', user]

    const visitWebPage = () => {
        window.open(listing["url"], '_blank')
    }

    const enterReviewer = () => {

    }
    const nextListing = () => {

    }

  return (
    <div className='listingdisplay'>
        <div className="listingdisplay-left">
            <h2>{listing["title"]}</h2>
            <p id="listing-id">Listing ID: {listing["id"]}</p> 
            <p>{listing["body"]}</p>
        </div>
        <div className="listingdisplay-right">
            <h4>Instructions:</h4>
            <p>Enter results of the listing's audit using the dropdowns below. You may reference the original listing with the link below.</p>
            <p>To select your next listing, navigate back to the homepage by clicking on the CAFHA icon on the top-left corner of the page.</p>
            <button className="external-link" onClick={visitWebPage}>Link</button>
            <div className="listingdisplay-right-row">
                <div className="dropdown-bundle">
                    <h5>Exclusionary</h5>
                    <Dropdown id={listing["id"]} field="exclusionary" display={listing["exclusionary"]} options={optionsExclusionary} />
                </div>
                <div className="dropdown-bundle">
                    <h5>Actions Taken</h5>
                    <Dropdown id={listing["id"]} field="actions taken" display={listing["actions taken"]} options={optionsActionsTaken}/>
                </div>
                <div className="dropdown-bundle">
                    <h5>Referred To</h5>
                    <Dropdown id={listing["id"]} field="referred to" display={listing["referred to"]} options={optionsReferredTo}/>
                </div>
            </div>
            <div className="listingdisplay-right-row">
                <div className="dropdown-bundle">
                    <h5>Audit Status</h5>
                    <Dropdown id={listing["id"]} field="status" display={listing["status"]} options={optionsAuditStatus}/>
                </div>

                <div className="dropdown-bundle">
                    <h5>Reviewer</h5>
                    <Dropdown id={listing["id"]} field="reviewer" display={listing["reviewer"]} options={optionsReviewer}/>
                </div>
            </div>
            <div className="notes-bundle">
                <h5>Notes:</h5>
                <textarea type="text" onChange={(e) => updateField(listing["id"], "exclusionary", e.target.value)}/>
            </div>
            {/* <Link to={`/listing/${props.prevId}`}><button className='nextlisting'>Previous Listing</button></Link> */}
            <Link to={`/listing/${props.nextId}`}><button className='nextlisting'>Next Listing</button></Link>
        </div>
    </div>
  )
}

export default ListingDisplay
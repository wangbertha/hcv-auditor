import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Dropdown } from '../Components/Dropdown/Dropdown'
import "./CSS/Listing.css"

const Listing = () => {
  const urlId = useParams()
  const id = urlId["listingId"]
  const [listing, setListing] = useState([])

  useEffect(() => {
    fetch(process.env.REACT_APP_API_ADDRESS+`/get/listing/${id}`)
    .then((response)=>response.json())
    .then((data)=>setListing(data))
  }, [])

  const optionsExclusionary = ['-Choose One-','Yes','No']
  const optionsAuditStatus = ['-Choose One-','Assigned','In Progress','Complete']
  const optionsActionsTaken = ['-Choose One-','Email Sent','Referral Sent','No Action Required','Other (See Notes)']
  const optionsReferredTo = ['-Choose One-','Option 1','Other','Not Applicable']
  const optionsReviewer = ['-Choose One-', 'Reviewer #1', 'Reviewer #2']

  const visitWebPage = () => {
      window.open(listing["0"]["url"], '_blank')
  }

  const formatBody = (text) => {
    const regex = ["Section 8","section 8","CHA"]
    let str = text.substring(26)
    regex.forEach(reg => {
      str = str.replace(reg, `<span className='highlight'>${reg}</span>`)
    })
    return str
  }

  const handleChange = async (field, value) => {
    try {
      const body = { field, value }
      await fetch(process.env.REACT_APP_API_ADDRESS+`/put/listing/${id}`,{
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      })
    }
    catch (err) {
      console.error(err.message)
    }
  }
  
  return (
    <div>
      {listing.length ? (
        <div className='listingdisplay'>
          <div className="listingdisplay-left">
              <h2>{listing["0"]["title"]}</h2>
              <p id="listing-id">Listing ID: {listing["0"]["id"]}</p> 
              <p>{formatBody(listing["0"]["body"])}</p>
          </div>
          <div className="listingdisplay-right">
              <h4>Instructions:</h4>
              <p>Enter results of the listing's audit using the dropdowns below. You may reference the original listing with the link below.</p>
              <p>To select your next listing, navigate back to the homepage by clicking on the CAFHA icon on the top-left corner of the page.</p>
              <button className="external-link" onClick={visitWebPage}>Link</button>
              <div className="listingdisplay-right-row">
                  <div className="dropdown-bundle">
                      <h5>Exclusionary</h5>
                      <Dropdown 
                        id={listing["0"]["id"]} 
                        field="exclusionary" 
                        display={listing["0"]["exclusionary"]} 
                        options={optionsExclusionary} />
                  </div>
                  <div className="dropdown-bundle">
                      <h5>Actions Taken</h5>
                      <Dropdown 
                        id={listing["0"]["id"]} 
                        field="actions_taken" 
                        display={listing["0"]["actions_taken"]} 
                        options={optionsActionsTaken}/>
                  </div>
                  <div className="dropdown-bundle">
                      <h5>Referred To</h5>
                      <Dropdown 
                        id={listing["0"]["id"]} 
                        field="referred_to" 
                        display={listing["0"]["referred_to"]} 
                        options={optionsReferredTo}/>
                  </div>
              </div>
              <div className="listingdisplay-right-row">
                  <div className="dropdown-bundle">
                      <h5>Audit Status</h5>
                      <Dropdown 
                        id={listing["0"]["id"]} 
                        field="status" 
                        display={listing["0"]["status"]} 
                        options={optionsAuditStatus}/>
                  </div>

                  <div className="dropdown-bundle">
                      <h5>Reviewer</h5>
                      <Dropdown 
                        id={listing["0"]["id"]} 
                        field="reviewer" 
                        display={listing["0"]["reviewer"]} 
                        options={optionsReviewer}/>
                  </div>
              </div>
              <div className="notes-bundle">
                  <h5>Notes:</h5>
                  <textarea 
                    type="text" 
                    onChange={(e) => handleChange("notes", e.target.value)}/>
              </div>
              <button>Next</button>
          </div>
        </div>
      ) : (<p className='loading'>Loading...</p>)}
    </div>
  )
}

export default Listing
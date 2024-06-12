import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Dropdown } from '../Components/Dropdown/Dropdown'
import "./CSS/Listing.css"

const Listing = () => {
  const urlId = useParams()
  const id = urlId["listingId"]
  const [allListings, setAllListings] = useState([])
  const [listing, setListing] = useState([])
  const [nextListing, setNextListing] = useState([])
  const [prevListing, setPrevListing] = useState([])

  // Gets information for all listings in the database that are not audited yet; Sorted by audit status, then by date pulled
  useEffect(() => {
    fetch(process.env.REACT_APP_API_ADDRESS+'/get')
    .then((response)=>response.json())
    .then((data)=>setAllListings(data))
}, [id])

  // Gets the information for the listing that corresponds to the URL; Gets the information for the listing before and after as retrieved in "all listings"
  useEffect(() => {
    setListing(allListings.find((row) => row["id"] === id))
    const index = allListings.findIndex((row) => row["id"] === id)
    const nexListing = allListings[index+1]
    const preListing = allListings[index-1]
    setNextListing(nexListing)
    setPrevListing(preListing)
    console.log("ping!")
  }, [allListings, id])

  // Define options for dropdown menus here
  const options = new Map([
    ["exclusionary", ['-Choose One-','Yes','No']],
    ["status", ['-Choose One-','Assigned','In Progress','Complete']],
    ["actions_taken", ['-Choose One-','Email Sent','Referral Sent','No Action Required','Other (See Notes)']],
    ["referred_to", ['-Choose One-','Option 1','Other','Not Applicable']],
    ["reviewer", ['-Choose One-','Reviewer #1', 'Reviewer #2']]
  ])

  const formatBody = (text) => {
    // const regex = ["Section 8","section 8","CHA"]
    // let str = text.substring(26)
    // regex.forEach(reg => {
    //   str = str.replace(reg, `<span className='highlight'>${reg}</span>`)
    // })
    return text
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
      {(typeof listing === 'undefined') ? (<p className='loading'>Loading...</p>) : (
        <div className='listingdisplay'>
          <div className="listingdisplay-left">
              <h2>{listing["title"]}</h2>
              <p id="listing-id">Listing ID: {listing["id"]}</p> 
              <p>{formatBody(listing["body"])}</p>
          </div>
          <div className="listingdisplay-right">
              <h4>Instructions:</h4>
              <p>Enter results of the listing's audit using the dropdowns below. You may reference the original listing with the link below.</p>
              <p>To select your next listing, navigate back to the homepage by clicking on the CAFHA icon on the top-left corner of the page.</p>
              <button className="external-link" onClick={() => {window.open(listing["url"], '_blank')}}>Link</button>
              <div className="listingdisplay-right-row">
                  <div className="dropdown-bundle">
                      <h5>Exclusionary</h5>
                      <Dropdown 
                        id={id} 
                        field="exclusionary" 
                        display={listing["exclusionary"]} 
                        options={options.get("exclusionary")} />
                  </div>
                  <div className="dropdown-bundle">
                      <h5>Actions Taken</h5>
                      <Dropdown 
                        id={id} 
                        field="actions_taken" 
                        display={listing["actions_taken"]} 
                        options={options.get("actions_taken")}/>
                  </div>
                  <div className="dropdown-bundle">
                      <h5>Referred To</h5>
                      <Dropdown 
                        id={id} 
                        field="referred_to" 
                        display={listing["referred_to"]} 
                        options={options.get("referred_to")}/>
                  </div>
              </div>
              <div className="listingdisplay-right-row">
                  <div className="dropdown-bundle">
                      <h5>Audit Status</h5>
                      <Dropdown 
                        id={id} 
                        field="status" 
                        display={listing["status"]} 
                        options={options.get("status")}/>
                  </div>

                  <div className="dropdown-bundle">
                      <h5>Reviewer</h5>
                      <Dropdown 
                        id={id} 
                        field="reviewer" 
                        display={listing["reviewer"]} 
                        options={options.get("reviewer")}/>
                  </div>
              </div>
              <div className="notes-bundle">
                  <h5>Notes:</h5>
                  <textarea 
                    type="text" 
                    onChange={(e) => handleChange("notes", e.target.value)}/>
              </div>
              <div className="traverse-btn">
                {(typeof prevListing === 'undefined') ? null : <Link to={`/listing/${prevListing["id"]}`}><button>Prev {prevListing["id"]}</button></Link>}
                {(typeof nextListing === 'undefined') ? null : <Link to={`/listing/${nextListing["id"]}`}><button>Next {nextListing["id"]}</button></Link>}
              </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Listing
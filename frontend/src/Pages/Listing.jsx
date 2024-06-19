import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import "./CSS/Listing.css"

const Listing = () => {
  const urlId = useParams()
  const id = urlId["listingId"]
  const [allListings, setAllListings] = useState([])
  const [listing, setListing] = useState([])
  const [nextListing, setNextListing] = useState([])
  const [prevListing, setPrevListing] = useState([])
  const [toggle, setToggle] = useState('')
  const [dropDisplay, setDropDisplay] = useState({
    exclusionary: "",
    actions_taken: "",
    referred_to: "",
    status: "",
    reviewer: "",
  })
  // 8:09 timestamp: Object state instead of multiple smaller ones
  // 11:35 timestamp: Information can be derived from state/props

  // Gets information for all listings in the database that are not audited yet; Sorted by audit status, then by date pulled
  useEffect(() => {
    fetch(process.env.REACT_APP_API_ADDRESS+'/get')
    .then((response)=>response.json())
    .then((data)=>setAllListings(data))
    console.log("AllListings loaded")
    console.log(allListings)
}, [id])

  // Gets the information for the listing that corresponds to the URL; Gets the information for the listing before and after as retrieved in "all listings"
  useEffect(() => {
    setListing(allListings.find((row) => row["id"] === id))
    const index = allListings.findIndex((row) => row["id"] === id)
    const nexListing = allListings[index+1]
    const preListing = allListings[index-1]
    setNextListing(nexListing)
    setPrevListing(preListing)
    if (listing !== undefined) {
      setDropDisplay({
        exclusionary: listing["exclusionary"],
        actions_taken: listing["actions_taken"],
        referred_to: listing["referred_to"],
        status: listing["status"],
        reviewer: listing["reviewer"],
      })
    }
    console.log(dropDisplay)
  }, [allListings, id])


  // Define options for dropdown menus here
  const options = new Map([
    ["exclusionary", ['-Choose One-','Yes','No']],
    ["status", ['-Choose One-','Assigned','In Progress','Complete']],
    ["actions_taken", ['-Choose One-','Email Sent','Referral Sent','No Action Required','Other (See Notes)']],
    ["referred_to", ['-Choose One-','Option 1','Other','Not Applicable']],
    ["reviewer", ['-Choose One-','Reviewer #1', 'Reviewer #2']]
  ])

  // Removes unnecessary text and highlights regex in the listing's description
  const formatBody = (text) => {
    const regex = ["Section 8","section 8","CHA "]
    var str = text.substring(26)
    regex.forEach(reg => {
      str = str.replace(reg, `<mark className='highlight'>${reg}</mark>`)
    })
    return str
  }

  const toggleMenu = (field) => {
    if (toggle===field) {
      setToggle('')
    }
    else {
      setToggle(field)
    }
  }

  const handleClick = async (field, value) => {
    try {
      const body = { field, value }
      await fetch(process.env.REACT_APP_API_ADDRESS+'/put/listing/'+id,{
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
    }
    catch (err) {
      console.error(err.message)
    }
    setDropDisplay({
      ...dropDisplay,
      [field]: value
    })
    setToggle('')
    console.log(dropDisplay)
  }
  
  // Updates database for text entered in the "Notes" field
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
              {(typeof listing["dateposted"]==='undefined') ? null : (<p id="listing-date">Posted: {listing["dateposted"].substring(0,11)}</p>)}
              <p id="listing-id">Listing ID: {listing["id"]}</p> 
              {(typeof listing["body"]==='undefined') ? null : (<div dangerouslySetInnerHTML={{ __html: formatBody(listing["body"])}} />)}
          </div>
          <div className="listingdisplay-right">
              <h4>Instructions:</h4>
              <p>Enter results of the listing's audit using the dropdowns below. You may reference the original listing with the link below.</p>
              <p>To select your next listing, navigate back to the homepage by clicking on the CAFHA icon on the top-left corner of the page.</p>
              <button className="external-link" onClick={() => {window.open(listing["url"], '_blank')}}>Link</button>
              <div className="listingdisplay-right-row">
                  <div className="dropdown-bundle">
                      <h5>Exclusionary</h5>
                      <button className='dropdown-btn' onClick={() => toggleMenu("exclusionary")}>
                        {(typeof dropDisplay.exclusionary==='undefined') ? listing["exclusionary"] : dropDisplay.exclusionary}
                      </button>
                      {(toggle==="exclusionary") && <div className="options-menu">
                        {options.get("exclusionary").map((opt, index) => (
                          <ul onClick={() => {handleClick("exclusionary", opt)}} key={index}>{opt}</ul>
                        ))}
                      </div>}
                  </div>
                  <div className="dropdown-bundle">
                      <h5>Actions Taken</h5>
                      <button className='dropdown-btn' onClick={() => toggleMenu("actions_taken")}>
                        {(typeof dropDisplay.actions_taken==='undefined') ? listing["actions_taken"] : dropDisplay.actions_taken}
                      </button>
                      {(toggle==="actions_taken") && <div className="options-menu">
                        {options.get("actions_taken").map((opt, index) => (
                          <ul onClick={() => {handleClick("actions_taken", opt)}} key={index}>{opt}</ul>
                        ))}
                      </div>}
                  </div>
                  <div className="dropdown-bundle">
                      <h5>Referred To</h5>
                      <button className='dropdown-btn' onClick={() => toggleMenu("referred_to")}>
                        {(typeof dropDisplay.referred_to==='undefined') ? listing["referred_to"] : dropDisplay.referred_to}
                      </button>
                      {(toggle==="referred_to") && <div className="options-menu">
                        {options.get("referred_to").map((opt, index) => (
                          <ul onClick={() => {handleClick("referred_to", opt)}} key={index}>{opt}</ul>
                        ))}
                      </div>}
                  </div>
              </div>
              <div className="listingdisplay-right-row">
                  <div className="dropdown-bundle">
                      <h5>Audit Status</h5>
                      <button className='dropdown-btn' onClick={() => toggleMenu("status")}>
                        {(typeof dropDisplay.status==='undefined') ? listing["status"] : dropDisplay.status}
                      </button>
                      {(toggle==="status") && <div className="options-menu">
                        {options.get("status").map((opt, index) => (
                          <ul onClick={() => {handleClick("status", opt)}} key={index}>{opt}</ul>
                        ))}
                      </div>}
                  </div>
                  <div className="dropdown-bundle">
                      <h5>Reviewer</h5>
                      <button className='dropdown-btn' onClick={() => toggleMenu("reviewer")}>
                        {(typeof dropDisplay.reviewer==='undefined') ? listing["reviewer"] : dropDisplay.reviewer}
                      </button>
                      {(toggle==="reviewer") && <div className="options-menu">
                        {options.get("reviewer").map((opt, index) => (
                          <ul onClick={() => {handleClick("reviewer", opt)}} key={index}>{opt}</ul>
                        ))}
                      </div>}
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
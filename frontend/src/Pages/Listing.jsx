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
  const [dispExc, setDispExc] = useState('')
  const [dispAct, setDispAct] = useState('')
  const [dispRef, setDispRef] = useState('')
  const [dispSta, setDispSta] = useState('')
  const [dispRev, setDispRev] = useState('')

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
    if (listing !== undefined) {
      setDispExc(listing["exclusionary"])
      setDispSta(listing["status"])
      setDispAct(listing["actions_taken"])
      setDispRef(listing["referred_to"])
      setDispRev(listing["reviewer"])
    }
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
    const regex = ["Section 8","section 8","CHA"]
    var str = text.substring(26)
    regex.forEach(reg => {
      str = str.replace(reg, `<mark className='highlight'>${reg}</mark>`)
    })
    var listBody = document.getElementById("list-body")
    var detail = document.createElement("p")
    detail.classList.add("detail")
    detail.innerHTML = str
    if (listBody!=null) {
      listBody.innerHTML = ""
      listBody.appendChild(detail)
    }
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
    setToggle('')
    if (field==="exclusionary") {
      setDispExc(value)
    }
    else if (field==="actions_taken") {
      setDispAct(value)
    }
    else if (field==="referred_to") {
      setDispRef(value)
    }
    else if (field==="status") {
      setDispSta(value)
    }
    else if (field==="reviewer") {
      setDispRev(value)
    }
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
              <p id="listing-id">Listing ID: {listing["id"]}</p> 
              {(typeof listing["body"]==='undefined') ? null : (<div id="list-body" className='body'>{formatBody(listing["body"])}</div>)}
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
                        {(typeof dispExc==='undefined') ? listing["exclusionary"] : dispExc}
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
                        {(typeof dispAct==='undefined') ? listing["actions_taken"] : dispAct}
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
                        {(typeof dispRef==='undefined') ? listing["referred_to"] : dispRef}
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
                        {(typeof dispSta==='undefined') ? listing["status"] : dispSta}
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
                        {(typeof dispRev==='undefined') ? listing["reviewer"] : dispRev}
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
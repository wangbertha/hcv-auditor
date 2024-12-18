import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { useGetListingQuery, useGetListingsQuery, useUpdateListingMutation } from '../services/listingsSlice'

import Loading from '../components/Loading/Loading'

import "./css/ListingById.css"

const ListingById = () => {
  const { id } = useParams()
  const blankDisplay = "-Choose One-"
  const { data: allListings, isLoading: isAllListingsLoading, error: allListingsError } = useGetListingsQuery();
  const { data: listing, isLoading: isListingLoading, error: listingError } = useGetListingQuery(id);
  const [updateListing] = useUpdateListingMutation();
  const [nextListing, setNextListing] = useState([])
  const [prevListing, setPrevListing] = useState([])
  const [toggle, setToggle] = useState('')

  // Gets the information for the listing that corresponds to the URL; Gets the information for the listing before and after as retrieved in "all listings"
  useEffect(() => {
    if (allListings !== undefined) {
      const index = allListings.findIndex((row) => row.id === id)
      const nexListing = allListings[index+1]
      const preListing = allListings[index-1]
      setNextListing(nexListing)
      setPrevListing(preListing)
    }
  }, [allListings, id])

  // Define options for dropdown menus here
  const options = {
    exclusionary: [blankDisplay, 'Yes', 'No'],
    status: [blankDisplay, 'Assigned', 'In Progress', 'Complete'],
    actions_taken: [blankDisplay, 'Email Sent','Referral Sent','No Action Required','Other (See Notes)'],
    referred_to: [blankDisplay,'Option 1','Other','Not Applicable'],
    reviewer: [blankDisplay,'Reviewer #1', 'Reviewer #2'],
  }

  // Removes unnecessary text and highlights regex in the listing's description
  const formatBody = (text) => {
    const regex = ["Section 8","section 8","CHA "]
    var str = text.substring(26)
    regex.forEach(reg => {
      str = str.replaceAll(reg, `<mark className='highlight'>${reg}</mark>`)
    })
    return str
  }

  const toggleDropdown = (field) => {
    if (toggle===field) {
      setToggle('')
    }
    else {
      setToggle(field)
    }
  }

  const handleChange = async (field, value) => {
    if (value==="-Choose One-") {
      value = ""
    }
    try {
      const response = await updateListing({ id, field, value });
      if (!response.error) {
        // Save success message
      } else {
        // Save unsuccessful message
      }
    }
    catch (err) {
      console.error(err.message)
    }
    setToggle('')
  }

  if (isAllListingsLoading || isListingLoading) {
    return <Loading />
  }

  if (allListingsError || listingError) {
    return <p>Error retrieving listing.</p>
  }
  
  return (
    <div className='listingdisplay'>
      <div className="listingdisplay-left">
          <h2>{listing.title}</h2>
          {(typeof listing.dateposted==='undefined') ? null : (<p id="listing-date">Posted: {listing.dateposted.substring(0,11)}</p>)}
          <p id="listing-id">Listing ID: {listing.id}</p> 
          {(typeof listing.body==='undefined') ? null : (<div dangerouslySetInnerHTML={{ __html: formatBody(listing.body)}} />)}
      </div>
      <div className="listingdisplay-right">
          <h4>Instructions:</h4>
          <p>Enter results of the listing&apos;s audit using the dropdowns below. You may reference the original listing with the link below.</p>
          <p>To select your next listing, use the navigation icons below or navigate back to the homepage by clicking on the CAFHA icon on the top-left corner of the page.</p>
          <button className="external-link" onClick={() => {window.open(listing.url, '_blank', 'noopener,noreferrer')}}>Link</button>
          <div className="listingdisplay-right-row">
              <div className="dropdown-bundle">
                  <h5>Exclusionary</h5>
                  <button className='dropdown-btn' onClick={() => toggleDropdown("exclusionary")}>
                    {(listing.exclusionary) || blankDisplay}
                  </button>
                  {(toggle==="exclusionary") && <div className="options-menu">
                    {options.exclusionary.map((opt, index) => (
                      <ul onClick={() => {handleChange("exclusionary", opt)}} key={index}>{opt}</ul>
                    ))}
                  </div>}
              </div>
              <div className="dropdown-bundle">
                  <h5>Actions Taken</h5>
                  <button className='dropdown-btn' onClick={() => toggleDropdown("actions_taken")}>
                    {listing.actions_taken || blankDisplay}
                  </button>
                  {(toggle==="actions_taken") && <div className="options-menu">
                    {options.actions_taken.map((opt, index) => (
                      <ul onClick={() => {handleChange("actions_taken", opt)}} key={index}>{opt}</ul>
                    ))}
                  </div>}
              </div>
              <div className="dropdown-bundle">
                  <h5>Referred To</h5>
                  <button className='dropdown-btn' onClick={() => toggleDropdown("referred_to")}>
                    {listing.referred_to || blankDisplay}
                  </button>
                  {(toggle==="referred_to") && <div className="options-menu">
                    {options.referred_to.map((opt, index) => (
                      <ul onClick={() => {handleChange("referred_to", opt)}} key={index}>{opt}</ul>
                    ))}
                  </div>}
              </div>
              <div className="dropdown-bundle">
                  <h5>Audit Status</h5>
                  <button className='dropdown-btn' onClick={() => toggleDropdown("status")}>
                    {listing.status || blankDisplay}
                  </button>
                  {(toggle==="status") && <div className="options-menu">
                    {options.status.map((opt, index) => (
                      <ul onClick={() => {handleChange("status", opt)}} key={index}>{opt}</ul>
                    ))}
                  </div>}
              </div>
              <div className="dropdown-bundle">
                  <h5>Reviewer</h5>
                  <button className='dropdown-btn' onClick={() => toggleDropdown("reviewer")}>
                    {listing.reviewer || blankDisplay}
                  </button>
                  {(toggle==="reviewer") && <div className="options-menu">
                    {options.reviewer.map((opt, index) => (
                      <ul onClick={() => {handleChange("reviewer", opt)}} key={index}>{opt}</ul>
                    ))}
                  </div>}
              </div>
          </div>
          <div className="listingdisplay-right-row">
            <div className="dropdown-bundle">
                <h5>Notes:</h5>
                <textarea 
                  key={id}
                  type="text" 
                  onChange={(e) => handleChange("notes", e.target.value)}
                  onClick={() => setToggle('')}
                  value={listing.notes} />
            </div>
          </div>
          <div className="traverse-btn">
            {(typeof prevListing === 'undefined') ? null : <Link to={`/listing/${prevListing.id}`}><button>Prev {prevListing.id}</button></Link>}
            {(typeof nextListing === 'undefined') ? null : <Link to={`/listing/${nextListing.id}`}><button>Next {nextListing.id}</button></Link>}
          </div>
      </div>
    </div>
  )
}

export default ListingById
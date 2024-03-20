import React, { useContext } from 'react'
import ListingDisplay from '../Components/ListingDisplay/ListingDisplay'
import { useParams } from 'react-router-dom'
import { ListContext } from '../Context/ListContext'

const Listing = () => {
  const {allListings} = useContext(ListContext)
  const {listingId} = useParams()
  const listing = allListings.find((e) => Number(e.id) === Number(listingId))
  return (
    <div>
      <ListingDisplay listing={listing}/>
    </div>
  )
}

export default Listing

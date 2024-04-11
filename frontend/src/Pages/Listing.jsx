import React, { useContext } from 'react'
import ListingDisplay from '../Components/ListingDisplay/ListingDisplay'
import { useParams } from 'react-router-dom'
import { ListContext } from '../Context/ListContext'

const Listing = () => {
  const {allListings} = useContext(ListContext)
  const {listingId} = useParams()
  const listing = allListings.find((e) => Number(e.id) === Number(listingId))
  const nextId = allListings[allListings.findIndex((e) => Number(e.id) === Number(listingId))+1]
  return (
    <div className='listing'>
      {allListings.length && <ListingDisplay listing={listing} nextId={nextId.id}/>}
      {console.log(nextId)}
    </div>
  )
}

export default Listing

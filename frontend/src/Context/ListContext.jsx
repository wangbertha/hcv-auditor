import React, { createContext, useState } from 'react'

export const ListContext = createContext(null)

const ListContextProvider = (props) => {

  const [allListings, setAllListings] = useState([])
  const [reviewer, setReviewer] = useState([])

  const contextValue = { allListings, reviewer, setReviewer }

  return (
    <ListContext.Provider value={contextValue}>
        {props.children}
    </ListContext.Provider>
  )
}

export default ListContextProvider
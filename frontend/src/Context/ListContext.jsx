import React, { createContext, useState, useEffect } from 'react'

export const ListContext = createContext(null)

const ListContextProvider = (props) => {

  const [allListings, setAllListings] = useState([])
  const [login, setLogin] = useState(false)
  const [reviewer, setReviewer] = useState([])

  const contextValue = { allListings, login, setLogin, reviewer, setReviewer }

  return (
    <ListContext.Provider value={contextValue}>
        {props.children}
    </ListContext.Provider>
  )
}

export default ListContextProvider
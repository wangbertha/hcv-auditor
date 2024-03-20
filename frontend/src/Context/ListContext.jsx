import React, { createContext, useState, useEffect } from 'react'
import Papa from 'papaparse'
import Data from '../Components/Assets/hcv_match_202403111214.csv'

export const ListContext = createContext(null)

const ListContextProvider = (props) => {

  const [allListings, setAllListings] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(Data)
      const reader = response.body.getReader()
      const result = await reader.read()
      const decoder = new TextDecoder("utf-8")
      const csvData = decoder.decode(result.value)
      const parsedData = Papa.parse(csvData, {
        header: true,
        skipEmptyLines: true
      }).data
      setAllListings(parsedData)
    }
    fetchData()
  }, [])

  const updateExclusionary = (id, newStatus) => {
    console.log(newStatus)
    // setAllListings(allListings.map(listing => listing.id === id ? (...listing, exclusionary: newStatus) : listing))
  }

  const contextValue = {allListings, updateExclusionary}

  return (
    <ListContext.Provider value={contextValue}>
        {props.children}
    </ListContext.Provider>
  )
}

export default ListContextProvider
import React, { createContext, useState, useEffect } from 'react'
import Papa from 'papaparse'
import Data from '../Components/Assets/hcv_match_202403111214.csv'

export const ListContext = createContext(null)

const ListContextProvider = (props) => {

  const [loading, setLoading] = useState(true)
  const [allListings, setAllListings] = useState([])
  const [login, setLogin] = useState(false)
  const [user, setUser] = useState('')

  useEffect(() => {
    setLoading(true)
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
    setLoading(false)
  }, [])

  const updateField = (id, field, newStatus) => {
    const tempListings = [...allListings]
    const listing = tempListings.find((e) => Number(e.id) === Number(id))
    listing[field] = newStatus
    listing['reviewer'] = user
    console.log(listing[field])
  }

  const contextValue = {loading, allListings, login, setLogin, updateField, setUser, user}

  return (
    <ListContext.Provider value={contextValue}>
        {props.children}
    </ListContext.Provider>
  )
}

export default ListContextProvider
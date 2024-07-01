import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './CSS/Home.css'
import Loading from '../Components/Loading/Loading'

const Home = () => {
  const [ allListings, setAllListings ] = useState([])
  const blank = ""
  const blankDisplay = "---"

  const columns = [
    { label: "ID", field: "id" },
    { label: "Audit Status", field: "status" },
    { label: "Date Posted", field: "dateposted" },
    { label: "Title", field: "title" },
    { label: "Exclusionary", field: "exclusionary" },
    { label: "Actions Taken", field: "actions_taken" },
    { label: "Referred To", field: "referred_to" },
    { label: "Reviewer", field: "reviewer" },
    { label: "URL", field: "url" },
  ]

  useEffect(() => {
    fetch(process.env.REACT_APP_API_ADDRESS+'/get')
    .then((response)=>response.json())
    .then((data)=>setAllListings(data))
  }, [])

  
  return (
    <div>
      {(allListings.length===0) ? (<Loading />) : (
        <table className='table'>
          <thead>
            <tr>
              {columns.map(({ label, field }) => {
                return <th key={field}>{label}</th>
              })}
            </tr>
          </thead>
          <tbody>
            {allListings.map((row, index) => (
              <tr key={index}>
                {columns.map(({ field }) => {
                  if (field==="id") {
                    return <td><Link to={`/listing/${row.id}`}>{row.id}</Link></td>
                  }
                  else if (field==="dateposted") {
                    return <td>{row["dateposted"].substring(0,11)}</td>
                  }
                  else if (field==="url") {
                    return <td><a href={row.url} target="_blank">Link</a></td>
                  }
                  else {
                    return (row[field]===blank) ? <td key={field}>{blankDisplay}</td>: <td key={field}>{row[field]}</td>
                  }
                })}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Home
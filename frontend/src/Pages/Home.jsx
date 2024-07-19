import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './CSS/Home.css'
import Loading from '../Components/Loading/Loading'

const Home = () => {
  const [ allListings, setAllListings ] = useState([])
  const [ sortField, setSortField ] = useState("")
  const [ sortAsc, setSortAsc ] = useState(true)
  const blank = ""
  const blankDisplay = "---"

  const columns = [
    { label: "ID", field: "id" },
    { label: "Audit Status", field: "status" },
    { label: "Posted", field: "dateposted" },
    { label: "Title", field: "title" },
    { label: "Exclusionary", field: "exclusionary" },
    { label: "Actions Taken", field: "actions_taken" },
    { label: "Referred To", field: "referred_to" },
    { label: "Reviewer", field: "reviewer" },
    { label: "URL", field: "url" },
  ]

  useEffect(() => {
    fetch(process.env.REACT_APP_API_ADDRESS+'/api/listings')
    .then((response)=>response.json())
    .then((data)=>setAllListings(data))
  }, [])

    const handleSort = (field) => {
      if (field==="url") { return }
      var sorted = []
      if (sortField===field && sortAsc) {
        setSortAsc(!sortAsc)
        sorted = [...allListings].sort((a, b) => (
          a[field] > b[field] ? -1 : 1
        ))
      }
      else {
        setSortField(field)
        setSortAsc(true)
        sorted = [...allListings].sort((a, b) => (
          a[field] < b[field] ? -1 : 1
        ))
      }
      setAllListings(sorted)
    }
  
  return (
    <div>
      {(allListings.length===0) ? (<Loading />) : (
        <table className='table'>
          <thead>
            <tr>
              {columns.map(({ label, field }) => {
                const arrows = field==="url" ? "none" : sortField===field && sortAsc ? "down"
                  : sortField===field && !sortAsc ? "up"
                  : "both"
                return <th className={arrows} id={field} key={field} onClick={() => handleSort(field)}>{' '}{label}</th>
              })}
            </tr>
          </thead>
          <tbody>
            {allListings.map((row, index) => (
              <tr key={index}>
                {columns.map(({ field }) => {
                  if (field==="id") {
                    return <td key={field}><Link to={`/listing/${row.id}`}>{row.id}</Link></td>
                  }
                  else if (field==="dateposted") {
                    return <td key={field}>{row["dateposted"].substring(0,11)}</td>
                  }
                  else if (field==="url") {
                    return <td key={field}><a href={row.url} target="_blank" rel="noopener noreferrer">Link</a></td>
                  }
                  else {
                    return (row[field]===blank) ? <td id={field} key={field}>{blankDisplay}</td> : <td id={field} key={field}>{row[field]}</td>
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
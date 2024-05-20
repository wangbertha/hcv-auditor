import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './CSS/Home.css'

const Home = () => {
  const [ allListings, setAllListings ] = useState([])

  useEffect(() => {
    fetch('http://localhost:4000/get')
    .then((response)=>response.json())
    .then((data)=>setAllListings(data))
  }, [])

  
  return (
    <div>
      {(typeof allListings === 'undefined') ? <p>Loading...</p> : (
        <table className='table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Audit Status</th>
              <th>Title</th>
              <th>Exclusionary</th>
              <th>Actions Taken</th>
              <th>Referred To</th>
              <th>Reviewer</th>
              <th>URL</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {allListings.map((row, index) => (
              <tr key={index}>
                <td><Link to={`/listing/${row.id}`}>{row.id}</Link></td>
                <td>{row["status"]}</td>
                <td>{row["title"]}</td>
                <td>{row["exclusionary"]}</td>
                <td>{row["actions_taken"]}</td>
                <td>{row["referred_to"]}</td>
                <td>{row["reviewer"]}</td>
                <td>{row["notes"]}</td>
                <td><a href={row.url} target="_blank">Link</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Home
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './CSS/Home.css'
import Loading from '../Components/Loading/Loading'

const Home = () => {
  const [ allListings, setAllListings ] = useState([])

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
              <th>ID</th>
              <th>Audit Status</th>
              <th>Date Posted</th>
              <th>Title</th>
              <th>Exclusionary</th>
              <th>Actions Taken</th>
              <th>Referred To</th>
              <th>Reviewer</th>
              <th>URL</th>
            </tr>
          </thead>
          <tbody>
            {allListings.map((row, index) => (
              <tr key={index}>
                <td><Link to={`/listing/${row.id}`}>{row.id}</Link></td>
                <td>{row["status"]}</td>
                <td>{row["dateposted"].substring(0,11)}</td>
                <td>{row["title"]}</td>
                <td>{row["exclusionary"]}</td>
                <td>{row["actions_taken"]}</td>
                <td>{row["referred_to"]}</td>
                <td>{row["reviewer"]}</td>
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
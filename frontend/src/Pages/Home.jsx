import React, { useContext } from 'react'
import { ListContext } from '../Context/ListContext'
import { Link } from 'react-router-dom'
import './CSS/Home.css'

const Home = () => {
  const {allListings, user} = useContext(ListContext)

  return (
    <div>
      {user==='' ? (
      <div className='login-reminder'>
        Please log in before auditing listings.
      </div>): null}
      {allListings.length ? (
        <table className='table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Audit Status</th>
              <th>Title</th>
              <th>City</th>
              <th>URL</th>
            </tr>
          </thead>
          <tbody>
            {allListings.map((row, index) => (
              <tr key={index}>
                <td><Link to={`/listing/${row.id}`}>{row.id}</Link></td>
                <td>{row["status"]}</td>
                <td>{row["title"]}</td>
                <td>{row["city"]}</td>
                <td><a href={row.url} target="_blank">Link</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      ): null}
    </div>
  )
}

export default Home
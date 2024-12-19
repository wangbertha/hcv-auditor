import { useState } from 'react'
import { Link } from 'react-router-dom'

import Loading from '../components/Loading/Loading'

import './css/Listings.css'
import { useGetListingsQuery } from '../services/listingsSlice'

const Listings = () => {
  const { data: allListings, isLoading, error } = useGetListingsQuery();
  const [ sortedListings, setSortedListings ] = useState(undefined);
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
      setSortedListings(sorted)
    }

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return <p>Error retrieving listings.</p>
  }
  
  return (
    <table className='table'>
      <thead>
        <tr>
          {columns.map(({ label, field }) => {
            const arrows = field==="url" ? "none" : sortField===field && sortAsc ? "down"
              : sortField===field && !sortAsc ? "up"
              : "both"
            return <th className={arrows} id={field} key={field} onClick={() => handleSort(field)}>{label}</th>
          })}
        </tr>
      </thead>
      <tbody>
        {/* If user indicates column-sorting, display sorted listings. Otherwise, list raw listings */}
        {(sortedListings ? sortedListings : allListings).map((row, index) => (
          <tr key={index}>
            {columns.map(({ field }) => {
              if (field==="id") {
                return <td key={field}><Link to={`/listings/${row.id}`}>{row.id}</Link></td>
              }
              else if (field==="dateposted") {
                return <td key={field}>{row.dateposted.substring(0,11)}</td>
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
  )
}

export default Listings
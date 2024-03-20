import React, { useContext, useState } from 'react'
import './Dropdown.css'
import { ListContext } from '../../Context/ListContext'

export const Dropdown = (props) => {
  const { allListings, updateExclusionary } = useContext(ListContext)
    const [open, setOpen] = useState(false)

    // Initialize the dropdown menu
    if (props.field === "exclusionary") {
      // console.log(allListings.find((e) => Number(e.id) === Number(props.id)))
    }
    const [display, setDisplay] = useState(props.options[0])

    const toggleMenu = () => {
      setOpen(!open)
    }

    const handleClick = (opt) => {
      setDisplay(opt)
      setOpen(false)
      if (props.field==="exclusionary") {
        updateExclusionary(props.id, opt)
      }
    }

  return (
    <div>
      <button className='dropdown-btn' onClick={toggleMenu}>
        {display}
      </button>
      {open && <div className="options-menu">
        {props.options.map((opt, index) => (
          <ul onClick={() => {handleClick(opt)}} key={index}>{opt}</ul>
        ))}
      </div>}
    </div>
  )
}

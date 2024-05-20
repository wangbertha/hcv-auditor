import React, { useState } from 'react'
import './Dropdown.css'

export const Dropdown = (props) => {
    const [open, setOpen] = useState(false)
    const [display, setDisplay] = useState(props.display)

    const toggleMenu = () => {
      setOpen(!open)
    }

    const handleClick = async (field, value) => {
      setOpen(false)
      setDisplay(value)
      try {
        const body = { field, value }
        await fetch(`http://localhost:4000/listing/${props.id}`,{
          method: 'PUT',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        })
      }
      catch (err) {
        console.error(err.message)
      }
    }

    // useEffect(() => {
    //   document.addEventListener("mousedown", handleOutsideClick)
    //   return () => {
    //     document.removeEventListener("mousedown", handleOutsideClick)
    //   }
    // })

  return (
    <div>
      <button className='dropdown-btn' onClick={toggleMenu}>
        {display}
      </button>
      {open && <div className="options-menu">
        {props.options.map((opt, index) => (
          <ul onClick={() => {handleClick(props.field, opt)}} key={index}>{opt}</ul>
        ))}
      </div>}
    </div>
  )
}

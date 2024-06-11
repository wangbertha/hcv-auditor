import React, { useState, useEffect, useRef } from 'react'
import './Dropdown.css'
import ReactDOM from 'react-dom'

export const Dropdown = (props) => {
    const [open, setOpen] = useState(false)
    const [display, setDisplay] = useState(props.display)
    const ref = useRef(null)

    const toggleMenu = () => {
      setOpen(!open)
    }

    const handleClick = async (field, value) => {
      setOpen(false)
      setDisplay(value)
      try {
        const body = { field, value }
        await fetch(process.env.REACT_APP_API_ADDRESS+'/put/listing/'+props.id,{
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        })
      }
      catch (err) {
        console.error(err.message)
      }
    }

    const handleOutsideClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false)
      }
    }

    useEffect(() => {
      document.addEventListener('click', handleOutsideClick, true)
      return () => {
        document.removeEventListener('click', handleOutsideClick, true)
      }
    }, [])

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

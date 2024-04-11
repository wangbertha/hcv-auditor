import React, { useContext, useState } from 'react'
import './Dropdown.css'
import { ListContext } from '../../Context/ListContext'

export const Dropdown = (props) => {
  const { updateField } = useContext(ListContext)
    const [open, setOpen] = useState(false)

    const [display, setDisplay] = useState(props.display)

    const toggleMenu = () => {
      setOpen(!open)
    }

    const handleClick = (selection) => {
      setDisplay(selection)
      setOpen(false)
      updateField(props.id, props.field, selection)
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
          <ul onClick={() => {handleClick(opt)}} key={index}>{opt}</ul>
        ))}
      </div>}
    </div>
  )
}

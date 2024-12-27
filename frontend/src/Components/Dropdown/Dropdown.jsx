import './Dropdown.css'

const Dropdown = ({ title, value, field, options, toggle, setToggle, handleChange }) => {
  return (
    <div className="dropdown-bundle">
        <h5>{title}</h5>
        <button className='dropdown-btn' onClick={() => setToggle(toggle === field ? "" : field)}>
        {value || "-Choose One-"}
        </button>
        {(toggle===field) && <div className="options-menu">
        {options.map((opt, index) => (
            <ul onClick={() => {handleChange(field, opt)}} key={index}>{opt}</ul>
        ))}
        </div>}
    </div>
  )
}

export default Dropdown
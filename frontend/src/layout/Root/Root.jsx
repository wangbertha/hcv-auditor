import { Outlet } from "react-router-dom"
import { Navbar } from "../Navbar/Navbar"
import { Footer } from "../Footer/Footer"

import "./Root.css"

const Root = () => {
  return (
    <>
        <Navbar />
        <div className="container">
            <Outlet />
        </div>
        <Footer />
    </>
  )
}

export default Root
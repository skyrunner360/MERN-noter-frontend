import React from 'react'
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
    let location = useLocation();
    // Just to show that the location object contains a key pathname which has the path of the current location

    // useEffect(() => {
    //     console.log(location.pathname);   
    // }, [location])
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">Noter</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
            {/* Set the Link to active when the location matches using the useLocation Hook from react-router */}
            <Link className={`nav-link ${location.pathname==="/"? "active":"" }`} to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/about"? "active":"" }`} to="/about">About</Link>
        </li>
      </ul>
      <form className="d-flex">
      <Link className="btn btn-success mx-1" to='/login' role="button">Login</Link>
      <Link className="btn btn-primary mx-1" to='/signup' role="button">Signup</Link>
      </form>
    </div>
  </div>
</nav>
        </div>
    )
}

export default Navbar

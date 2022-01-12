import React, {useState, useEffect} from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
    let location = useLocation();
    // Just to show that the location object contains a key pathname which has the path of the current location

    // useEffect(() => {
    //     console.log(location.pathname);   
    // }, [location])
    const history= useNavigate()
    const handlelogout = ()=>{
      localStorage.removeItem('token');
      history("/login");
    }
    useEffect(() => {
      if(location.pathname==="/"){
        userData()
      }
    },[location])
    const [user, setUser] = useState({})
    const userData = async ()=>{
      const response = await fetch(`http://localhost:5000/api/auth/getuser`, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
      });
      const json = await response.json();
      setUser(json)
    }
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
      {!localStorage.getItem('token')?<form className="d-flex">
      <Link className="btn btn-success mx-1" to='/login' role="button">Login</Link>
      <Link className="btn btn-primary mx-1" to='/signup' role="button">Signup</Link>
      </form>:
      <>
      <div className="accordion accordion-flush" id="accordionFlushExample">
  <div className="accordion-item">
    <h2 className="accordion-header" id="flush-headingOne">
      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
       Welcome {user.name} ! &nbsp;
      </button>
    </h2>
    <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
      <div className="accordion-body">Your Email is - &nbsp;{user.email}</div>
    </div>
  </div>
</div>

      <button onClick={handlelogout} className='btn btn-primary'>Logout</button>
      </>   
      }
    </div>
  </div>
</nav>
        </div>
    )
}

export default Navbar

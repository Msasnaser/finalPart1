import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'
export default function Navbar() {
  return (
    <>

      <nav className="navbar navbar-expand-lg bg-dark text-light position-sticky top-0 transition:.8s z-3">
        <div className="container-fluid container">
          <img src="logo.png" className="mx-2" alt="Logo" width="104" height="24" />
          <button className="navbar-toggler bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ">
              <NavLink className="nav-link text-light " to='/'>Home</NavLink>
              <NavLink className="nav-link text-light" to='/Product' >Product</NavLink>
              <NavLink className="nav-link text-light" to='/Categories'>Categories</NavLink>
              <NavLink className="nav-link text-light" to='/Cart' >Cart</NavLink>
            </div>
            <form className="d-flex mx-auto" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-secondary" type="submit">Search</button>
            </form>
            <ul className="nav gap-3 justify-content-end  mb-2 mb-lg-0 ">
              <li className="nav-item">
                <NavLink className="nav-link text-light" to='/login'>Log in</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link text-light" to='/register'>Register</NavLink>
              </li>
            </ul>
          </div>

        </div>
      </nav>


    </>
  )
}

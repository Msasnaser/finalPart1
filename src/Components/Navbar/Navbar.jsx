
import { NavLink, useNavigate } from 'react-router-dom'
import './Navbar.css'
import React from 'react'
import { useContext } from 'react'
import { UserInfo } from '../context/User'
import { useMyContext } from '../context/CartItem'

export default function Navbar() {
  const { cartNum } = useMyContext();
  const { isLogin, setUserToken, setUserName } = useContext(UserInfo);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('userToken');
    setUserToken(null);
    setUserName(null);
    navigate('/');
  }

  return (
    <>

      <nav className="navbar navbar-expand-lg bg-dark text-light position-sticky top-0 transition:.8s z-3">
        <div className="container-fluid container">
          <img src="logo.png" className="mx-2" alt="Logo" width="104" height="24" />
          <button className="navbar-toggler bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav flex-grow-1 ">
              <NavLink className="nav-link text-light " to='/'>Home</NavLink>
              <NavLink className="nav-link text-light" to='/Product' >Product</NavLink>
              <NavLink className="nav-link text-light" to='/Categories'>Categories</NavLink>
              {
                isLogin &&
                <NavLink className="nav-link text-light" to='/Cart' >Cart <span>{cartNum?.length || "0"}</span></NavLink>

              }
            </div>
            {
              isLogin ?
                <>
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className='dropdown nav-item'>
                      <a className="nav-link dropdown-toggle text-light" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Account
                      </a>
                      <ul className=" bg-black gap-1 justify-content-end mb-2 mb-lg-0 dropdown-menu ">
                        <li className="nav-item">
                          <NavLink className="nav-link text-danger dropdown-item" to="Profile">Profile</NavLink>
                        </li>
                        <li className="nav-item">
                          <button onClick={logout} className="nav-link text-danger justify-content-end dropdown-item">Log Out</button>
                        </li>
                        <li className="nav-item">
                          <NavLink className="nav-link text-danger dropdown-item" to='/register'>Register</NavLink>
                        </li>
                      </ul></li>
                  </ul>
                </>
                :
                <>
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className='dropdown nav-item'>
                      <a className="nav-link dropdown-toggle text-light" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Account
                      </a>
                      <ul className=" bg-black gap-1 justify-content-end mb-2 mb-lg-0 dropdown-menu">
                        <li className="nav-item">
                          <NavLink className="nav-link text-danger dropdown-item" to='/login'>Log in</NavLink>
                        </li>
                        <li className="nav-item">
                          <NavLink className="nav-link text-danger dropdown-item" to='/register'>Register</NavLink>
                        </li>
                      </ul></li></ul>
                </>
            }
          </div>
        </div>
      </nav>
    </>
  )
}

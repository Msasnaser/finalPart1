import axios from 'axios';
import React, { useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import Navbar from '../../../Components/Navbar/Navbar';
import '../profile/Profile.css'
import Footer from '../../../Components/footer/Footer';
export default function Profile() {
  return (
    <>
      <>
        <Navbar />
      </>
      {/* <div className="text-center"> */}
        <div className="row Profile d-flex " style={{gap:'70px'}} >
           {/* <div className="col-4">   */}
            <div className="rightSide">
              <ul className="rightSideList mt-5">

                <NavLink className="text" to='About'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 iconsp "  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                  </svg>
                  Account</NavLink>

                <NavLink className="text" to='Order'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 iconsp ">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                  </svg>
                  My Order</NavLink>
                  
                <NavLink className="text" to='/Sendcode'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 iconsp ">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                  Change Password</NavLink>
              </ul>
            </div>
          
          <div className="leftSide">
            <Outlet />
            </div></div>
        {/* </div> */}
         {/* </div>  */}
    <Footer />
    </>
  )
}

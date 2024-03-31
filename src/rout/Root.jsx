import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Components/footer/Footer'
//import MyCartContextProvider from '../Components/context/CartItem'


export default function Root() {
  return (
    <>
     {/* <MyCartContextProvider>  */}
    <Navbar />
     {/* </MyCartContextProvider>  */}
    <Outlet />
    <Footer />
    </>
  )
}

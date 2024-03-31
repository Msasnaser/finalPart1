import React from 'react'
import '../footer/Footer.css'
import { Link } from 'react-router-dom'
export default function() {
  return (
   
 <footer className="footer-distributed"> <div className='container'>
  <div className="footer-left">
  <img src="logo.png" className="mx-2" alt="Logo" width="104" height="24" />
    <p className="footer-company-name mt-4"> © 2024 Molla. </p>
    <p className="footer-company-name mt-4"> All rights reserved </p>  
  </div>
  <div className="footer-center">
    <div>
    <i class='bx bx-map' />
      <p><span>Palestine</span></p>
    </div>
    <div>
    <i class='bx bxs-phone' />
      <p>+9725922172</p>
    </div>
    <div>
      <i className="bx bx-envelope" />
      <p><a href="mailto:sagar00001.co@gmail.com">MollaStore@gmail.com</a></p>
    </div>
  </div>
  <div className="footer-right">
    <p className="footer-company-about">
    <span>About the company</span>
      <strong>Molla</strong> The best website for shopping, containing all types of clothes for all ages.
    </p>
    <div class="footer-icons">
                <a href="#"><i class='bx bxl-facebook-circle'></i></a>
                <a href="#"><i class='bx bxl-instagram'></i></a>
                <a href="#"><i class='bx bxl-twitter'></i></a>
            </div>
  </div></div>
</footer>


  )
}

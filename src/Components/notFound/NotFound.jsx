import React from 'react'
import '../notFound/NotFound.css'
import { Link } from 'react-router-dom'
export default function NotFound() {
  return (
    <>
<div className="mt-5">
  <h1 className="notFoundTitle">This page doesn’t exist.</h1>
  <section className="error-container">
    <span className="four"><span className="screen-reader-text">4</span></span>
    <span className="zero"><span className="screen-reader-text">0</span></span>
    <span className="four"><span className="screen-reader-text">4</span></span>
  </section>
  <div className="link-container">
    <Link to="/" className="btn btn-outline-dark btn-lg">Back Home</Link>
  </div>
</div>


    </>
  )}
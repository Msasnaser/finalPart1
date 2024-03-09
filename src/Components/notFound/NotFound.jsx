import React from 'react'
import '../notFound/NotFound.css'
import { Link } from 'react-router-dom'
export default function NotFound() {
  return (
    <>
      <div className="mt-5">
        <h1 className="notFoundTitle">This page doesn’t exist.</h1>
        <section className="errorContainer">
          <span className="four"><span className="screenReaderText">4</span></span>
          <span className="zero"><span className="screenReaderText">0</span></span>
          <span className="four"><span className="screenReaderText">4</span></span>
        </section>
        <div className="linkContainer">
          <Link to="/" className="btn btn-outline-dark btn-lg">Back Home</Link>
        </div>
      </div>
    </>
  )
}
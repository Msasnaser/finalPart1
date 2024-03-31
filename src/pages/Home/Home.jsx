import React from 'react'
import style from './Home.module.css'
import Categories from '../Categories/Categories'
import { Link } from 'react-router-dom'
export default function Home() {
  return (

    <>
{
    <section className={style.section}>
  <div className='container'>
    <div className={style.info}>
      <h3 className="animated no-style" >Enjoy This Offer Today</h3>
      <h1 className="animated ">New Collection<br/> Sale 40%</h1>
      <div className={style.shopeNow}>
        <Link to="/product">SHOP NOW</Link>
      </div>
     </div> 
  </div>
</section>
}
<Categories />
    </>
  )
}

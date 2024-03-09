import React from 'react'
import style from './Home.module.css'
import Categories from '../Categories/Categories'
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
        <a href="#">SHOP NOW</a>
      </div>
     </div> 
  </div>
</section>
}
<Categories />
    </>
  )
}

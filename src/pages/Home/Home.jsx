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
      <h3>Sale Off 20%</h3>
      <h1>Summer Offer<br />2020 Collection</h1>
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

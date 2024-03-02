import axios from 'axios';
import React, { useEffect, useState } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Link } from 'react-router-dom'
export default function Categories() {
const [category,setCategory] = useState([]);
  const getCategory = async()=>{
    const {data} = await axios.get(`https://ecommerce-node4.vercel.app/categories/active?page=1&limit=20`);
    setCategory(data.categories);
  }  
  useEffect(() =>{
     getCategory();
  },[])

  return (
      <Swiper className='mt-5'
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={3}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
          {
          category.length > 0 ? category.map(categories =>
          <div className="col-lg-6 col-md-4 col-sm-6 mt-5" key={categories._id}>
            <SwiperSlide className="swiperSlide" key={categories._id}>
            <Link>
          <img className="circular-image" src={categories.image.secure_url} alt={categories.name}/>
        </Link>
            </SwiperSlide>
          </div>
        ): <h2>Empty Category</h2>
        } 
  </Swiper>
  )
}
 
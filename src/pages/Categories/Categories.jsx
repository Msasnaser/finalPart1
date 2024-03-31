import axios from 'axios';
import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import '../Categories/Categoris.css'
import { Navigation, A11y } from 'swiper/modules';
import { Link} from 'react-router-dom';
import { Zoom, toast } from 'react-toastify';
import '../ProductList/ProductList';
import Loading from '../../loading/Loading';
export default function Categories() {
  const [category, setCategory] = useState([]);
  const [loader ,setLoader] = useState(true);
  const getCategory = async () => {
try{
   const { data } = await axios.get(`${import.meta.env.VITE_API}/categories/active?limit=10`);
    setCategory(data.categories);
}
  catch(err){
    toast.error(err,{
      position: "bottom-center",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Zoom,
      });
    }
    finally{
      setLoader(false);
    }
  }
  useEffect(() => {
    getCategory();
  }, [])
   if(loader){
    return <Loading />
  } 
  return (
    <Swiper className='mt-5'
      modules={[Navigation, A11y]}
      spaceBetween={50}
      slidesPerView={3}
      navigation
    >
      {

category.map(categories =>
          <div className="col-lg-6 col-md-4 col-sm-6 mt-5" key={categories._id}>
            <SwiperSlide className="swiperSlide" key={categories._id}>
              <Link to={`/productList/${categories._id}`}>
                <img className="circular-image" src={categories.image.secure_url} alt={categories.name} />
              </Link>
            </SwiperSlide>
          </div>
        )
      }
    </Swiper>
  )
}

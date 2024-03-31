
import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'
import Loading from '../../loading/Loading';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Navigation, A11y } from 'swiper/modules';
import '../Products/Product.css'
import { useContext } from 'react'
import { UserInfo } from '../../Components/context/User'
import { Zoom, toast,Bounce } from 'react-toastify';
import { useMyContext } from '../../Components/context/CartItem';
export default function Product() {
  const { productId } = useParams();
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [Product, setProduct] = useState({});
  const [loader, setLoader] = useState(true);
  const { cartNum, setCartNum } = useMyContext();

  const { isLogin } = useContext(UserInfo);
  const getProduct = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API}/products/${productId}`);
      setProduct(data.product);
    }
    catch (err) {
      console.log(err);
    }
    finally {
      setLoader(false);
    }
  }
  useEffect(() => {
    getProduct();
  }, []);
  const addToCart = async (productId) => {
    const token = localStorage.getItem('userToken');

    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API}/cart`, { productId },
        {
          headers: {
            Authorization: `Tariq__${token}`
          }
        });
      setCartNum([...cartNum, data]);
      if (data.message == 'success') {
        toast.success('The item is added to cart', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Zoom,
        });
      }
    }
    catch (error) {
      toast.error(error.response.data.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Zoom,
      });
    }
  }
  if (loader) {
    return <Loading />;
  }
  return (
    <>
      <section className="prod">
        <div className="container">
          <div className="row" >
            <div className="col-md-6" >
              <div className="big-img mt-5" key={Product.id}>
                <img className="mainImage" src={Product.mainImage.secure_url} />
                <Swiper className="mt-5"
                  modules={[Navigation, A11y]}
                  spaceBetween={3}
                  slidesPerView={1}
                  navigation
                >
                  {
                    Product.subImages.map((image, index) => (
                      <SwiperSlide className="swiperSlide" key={index}>
                        <div className="subImgs">
                          <img className="subImg" src={image.secure_url} />
                        </div>
                      </SwiperSlide>
                    ))}
                </Swiper>
              </div>
            </div>
            <div className="detailPart col-md-6 mt-5 d-flex flex-column gap-3">
              <h4 className="ProdName">{Product.name}</h4>
              <div className="d-flex gap-3 align-items-center fs-5">
                <div className="d-flex flex-column gap-3">
                  {
                    Product.discount == 0 ? <span className="price">Price: {Product.finalPrice}$</span> :
                      (
                        <div className="d-flex gap-3 ">
                          <span className="price">Price:</span>
                          <span className="text-decoration-line-through text-body-tertiary price">{Product.price}$</span>
                          <span className="text-danger price">{Product.finalPrice}$</span>
                        </div>
                      )
                  }
                  <span className="price text-danger">Discount: {Product.discount}%</span>
                </div>
              </div>
              <p className="description">
                {
                  Product.description.length < 500 ? (
                    Product.description
                  ) : (
                    showFullDescription ? Product.description : `${Product.description.slice(0, 300)}   ... `
                  )}
                {
                  Product.description.length >= 500 && !showFullDescription && (
                    <button className="btn btn-light" onClick={() => setShowFullDescription(true)}> Read More</button>
                  )}
              </p>
              <div className="addCart d-flex gap-3">
                {isLogin ? (
                  <>
                    <button onClick={() => { addToCart(Product._id) }} className="btn btn-outline-dark">add to cart</button>
                    <Link to={`/review?id=${Product._id}`} className="btn btn-outline-dark">add Review</Link>
                  </>
                ) : (
                  <>
                    <Link className="btn btn-outline-dark" to="/login">add to cart</Link>
                    <Link className="btn btn-outline-dark disabled" disabled>add Review</Link>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="card mt-5">
            <h6 className="card__title">FeedBack:</h6>
            {

              Product.reviews.length > 0 ? (
                Product.reviews.map(review =>
                  <div className="review" key={review.id}>
                    <span> Comment: {review.comment} </span>
                    <br />
                    <span>Rating:{review.rating}</span>
                    <br />
                  </div>
                )
              ) : (
                <span>No comments yet</span>
              )}
          </div>
        </div>
      </section>

    </>
  )
}
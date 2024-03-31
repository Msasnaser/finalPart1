
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import style from './ProductList.module.css'
import { Zoom, toast } from 'react-toastify';
import Loading from '../../loading/Loading';
export default function ProductList() {
  const [productWithCatogery, setProductWithCatogery] = useState([]);
  const { id } = useParams();
  const navidated = useNavigate();
  const [loader ,setLoader] = useState(true);
  const getProductWithCatogery = async () => {
    try {
       const { data } = await axios.get(`${import.meta.env.VITE_API}/products/category/${id}`);
      if (data.products.length > 0) {
        setProductWithCatogery(data.products);
        return true;
      }
      else {
        toast.info("Product not found the length is 0",{
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
        navidated('/ProductNotFound');
        return false;
      }
    }
    catch (e) {
      toast.error(`ERROR: Couldn't get product :${e}`,{
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
    getProductWithCatogery();
  }, [])
  if(loader){
    return <Loading />
  } 
  return (
    <section className="container">
      <div className="d-flex flex-column gap-3 align-items-center">
        <div className={style.products}>
          {
            productWithCatogery.map(prod =>
              <div className={style.product} key={prod._id}>
                <div className={style.productInfo}>
                  <img className={style.productsImages} src={prod.mainImage.secure_url} />
                  <div className={style.aboutItem}>
                    {/* <div className={style.proWishlist}>
                      <button className={style.addToWishlist} title="Add to wishlist">
                        <i className="bx bx-heart"></i>
                      </button>
                    </div> */}
                    {/* <div className={style.productCart}>
                      <Link to={`/product/${prod._id}`} >Select Option</Link>
                    </div> */}
                  </div>
                </div>
                <h4 className="ps-3 mt-2">{prod.name}</h4>
                <div className={style.productRating}>
                  <i className="bx bx-star text-warning"></i>
                  <i className="bx bx-star text-warning"></i>
                  <i className="bx bx-star text-warning"></i>
                  <i className="bx bx-star"></i>
                </div>

                <span className={style.productPrice}>{prod.price} $</span>
                <Link className="btn btn-outline-dark" to={`/products/${prod._id}`}>more details</Link>
              </div>
            )}
        </div>
      </div>
    </section>
  )
}
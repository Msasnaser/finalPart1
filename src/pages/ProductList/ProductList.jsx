
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import style from './ProductList.module.css'
export default function ProductList() {
  const [productWithCatogery, setProductWithCatogery] = useState([]);
  const { id } = useParams();
  //console.log("ID",id);
  const navidated = useNavigate();
  const getProductWithCatogery = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API}/products/category/${id}`);
      if (data.products.length > 0) {
        setProductWithCatogery(data.products);
        return true;
      }
      else {
        console.log("Product not found the length is 0");
        navidated('/ProductNotFound');
        return false;
      }
    }
    catch (e) {
      console.log("ERROR: Couldn't get product",e);
    }
  }
  useEffect(() => {
    getProductWithCatogery();
  }, [])
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
                    <div className={style.proWishlist}>
                      <button className={style.addToWishlist} title="Add to wishlist">
                        <i className="bx bx-heart"></i>
                      </button>
                    </div>
                    <div className={style.productCart}>
                      <a >Select Option</a>
                    </div>
                  </div>
                </div>
                <h4 className="px-3">{prod.name}</h4>
                <div className={style.productRating}>
                  <i className="bx bx-star text-warning"></i>
                  <i className="bx bx-star text-warning"></i>
                  <i className="bx bx-star text-warning"></i>
                  <i className="bx bx-star"></i>
                </div>

                <span className={style.productPrice}>{prod.price} $</span>
                <button className="btn btn-outline-dark">Add to cart</button>
              </div>
            )}
        </div>
      </div>
    </section>
  )

}
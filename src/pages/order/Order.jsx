


import React, { useEffect } from 'react'
import style from '../order/Order.module.css'
import axios from 'axios';
import { useState } from 'react';
import Loading from '../../loading/Loading';
export default function Order() {
    const [loader, setLoader] = useState(true);
  //  const {cartItems}= useContext(CartInfo);
    const token = localStorage.getItem('userToken');
    const [cartItems, setCartItems] = useState([]);

    const getCart = async () => {
        try {
          const { data } = await axios.get(`${import.meta.env.VITE_API}/cart`, {
            headers: {
              Authorization: `Tariq__${token}`
            }
          });
          console.log(data);
          setCartItems(data.products);
        } catch (error) {
          console.log(error);
        }
       finally {
        setLoader(false);
    }
      };
      useEffect(()=>{
        getCart();
      },[]);
    const [orderData,setOrderData] = useState(
        {
            couponName:'',
            phone: '',
            address: '',
        }
    );
    const handleChangeForm = (e) => {
      const { name, value } = e.target;
      setOrderData({
     ...orderData,
        [name]: value,
      });
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
        try{
     const {data} = await axios.post(`${import.meta.env.VITE_API}/order`, orderData,
      {
        headers: {Authorization : `Tariq__${token}`}
    });
    console.log(data);
    setOrderData(
      {
        couponName:'',
        phone: '',
        address: '',
      }
    );}
    catch(err){
        console.log(err);
    }
     };
     return (
      <>
      {
                 loader ? (
                 <Loading />
                   ) :
                    (
          <section className="Order">
              <div className='container'>
                  <div className="row d-flex gap-3 flex-column mt-5">
                      <div className="itemsCart d-flex flex-row gap-3">
                          {
                          cartItems.map(item =>
                              <div className="cartItem card" key={item._id}>
                                  <div >
                                      <img className='MainImage' src={item.details.mainImage.secure_url} />
                                  </div>
                                  <h4 className="ps-3 mt-2">{item.details.name} </h4>
                                  <span> Quantity {item.quantity}</span>
                              </div>
                          )}
                      </div>
                      <div className="orderForm ">
                          <form className={style.box} onSubmit={handleSubmit}>
                              <h1>Order</h1>
                              <div className={style.inputemail}>
                                  <input type="text" name="couponName" value={orderData.couponName} onChange={handleChangeForm} placeholder='Coupon Name' />
                              </div>
                              <div className={style.inputemail}>
                                  <input type="text" name="address" value={orderData.address} onChange={handleChangeForm} required placeholder='address' />
                              </div>
                              <div className={style.inputemail}>
                                  <input type="text" name="phone" value={orderData.phone} onChange={handleChangeForm} required placeholder='phone' />
                              </div>
                              <button className={style.SubmitBtn} type="submit">Create Order</button>
                          </form>
                      </div>
                  </div>
              </div>
          </section>
                    )}
      </>
  )}
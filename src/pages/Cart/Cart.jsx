
import axios from 'axios';
import React, { useContext, useEffect, useState} from 'react';
import '../Cart/Cart.css'
import { Link} from 'react-router-dom';
import Loading from '../../loading/Loading';
import { Zoom, toast } from 'react-toastify';
export default function Cart({ updateCartNumber }) {
  //const {cartItems,loader,setCartItems}= useContext(CartInfo);
 const [cartItems, setCartItems] = useState([]);
 const [totalPrice, setTotalPrice] = useState(0);
 const [shippingCost, setShippingCost] = useState(0);
   const token = localStorage.getItem('userToken');
  const getCart = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API}/cart`, {
          headers: {
            Authorization: `Tariq__${token}`
          }
        });
        console.log(data);
        setCartItems(data.products);
        calculateTotalPrice(data.products);
      } catch (error) {
        console.log(error);
      }
      // finally {
      //   setLoader(false);
      // }
    };
    useEffect(()=>{
      getCart();
    },[]);
  const removeItem= async(productId) =>{
    try{
   const{data}= await axios.patch(`${import.meta.env.VITE_API}/cart/removeItem`,{productId},{
      headers: {
        Authorization:`Tariq__${token}`
      }
    });
    console.log(data.cart.products);
    if(data.message=='success')
      { 
        const updatedCartItems = cartItems.filter(item => item.productId !== productId);
        setCartItems(updatedCartItems);
        updateCartNumber(updatedCartItems.length);
        toast.success('The item is removed succssfully ', {
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
  catch(err){
    console.log(err);
  }
}
const increaseQuantity = async(productId) =>{
  try{
    const updatedCartItems = cartItems.map(item =>
      item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCartItems);
  const{data}= await axios.patch(`${import.meta.env.VITE_API}/cart/incraseQuantity`,{productId},{
    headers: {
      Authorization:`Tariq__${token}`
    }
  });
}
  catch(err){
    console.log(err);
  }
}
const decreaseQuantity=async (productId) =>{
 // const token = localStorage.getItem('userToken');
  try{
    const updatedCartItems = cartItems.map(item =>
      item.productId === productId? {...item, quantity: item.quantity - 1 } : item
    );
    setCartItems(updatedCartItems);
  const{data}= await axios.patch(`${import.meta.env.VITE_API}/cart/decraseQuantity`,{productId},{
    headers: {
      Authorization:`Tariq__${token}`
    }
  });
  }
  catch(err){
    console.log(err);
  }
}
const clearCart = async()=>{
  //const token = localStorage.getItem('userToken');
  try{
     
  const{data}= await axios.patch(`${import.meta.env.VITE_API}/cart/clear`,{},{
    headers: {
      Authorization:`Tariq__${token}`
    }
  });
 
  if(data.message=='success')
  {
    setCartItems([]);
    setTotalPrice(0);
    toast.success('all item are deleted', {
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
catch(error){
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
  // if (loader) {
  //   return <Loading />;
  // }
  const calculateTotalPrice = (items) => {
    let total = 0;
    items.forEach(item => {
      total += item.details.finalPrice * item.quantity;
    });
    setTotalPrice(total);
  };
  const handleShippingOptionChange = (event) => {
    const { id } = event.target;
    let shipping = 0;
    if (id === 'expressShipping') {
      shipping = 10;
    }
    setShippingCost(shipping);
    calculateTotalPrice(shipping); // Recalculate total price when shipping option changes
  };
  return (
    <>
      <section className="cart d-flex justify-content-between">
      <div className="cart-table-container mt-4 mx-3">
        <h2>Shopping Cart</h2>
      <table className="cart-table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {
          cartItems.map((item) => (
            <tr key={item.productId}>
              <td>
            <img className="MainImage"src={item.details.mainImage.secure_url} />
            <div className="productDetails">
             {item.details.name} 
             <div className="remove d-flix gap-3 align-content-center align-items-center">
             <button className="btn btn-outline-dark" onClick={()=>{removeItem(item.productId)}}>remove</button>
             </div>
             </div>
             </td>
              <td>${item.details.finalPrice}</td>
              <td>
                <button className="addButton" onClick={()=>{increaseQuantity(item.productId)}}>+</button>
              {item.quantity} 
                <button className="minButton" onClick={()=>{decreaseQuantity(item.productId)}}>-</button>
              </td>
              <td>${item.details.finalPrice * item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
<div className="cartSummary">
  <h3>Cart Summary</h3>
  <ul className="list-group gap-3">
    <li className="list-group-item">
      <input type="radio" id="freeShipping" name="shippingOption" onChange={handleShippingOptionChange}/>
      <label htmlFor="freeShipping">Free Shipping   - $0.00</label>
    </li>
    <li className="list-group-item">
      <input type="radio" id="expressShipping" name="shippingOption" onChange={handleShippingOptionChange}/>
      <label htmlFor="expressShipping">Express Shipping   - $10.00</label>
    </li>
  </ul>
  <p className="mt-3">Total Price: ${totalPrice+shippingCost}</p>
      <Link className="btn btn-outline-dark" to="/order"><span>Chekout</span></Link>
      </div> 

      </section>
      <div className="d-flex justify-content-center">
      <button className="btn btn-outline-dark mt-5 " onClick={clearCart} >Clear Cart</button>
   </div> </>
  );
}



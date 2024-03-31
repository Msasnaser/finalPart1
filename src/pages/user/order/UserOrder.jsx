

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../order/UserOrder.css';
export default function UserOrder() {
  const [order, setOrder] = useState([]);
  const [products, setProducts] = useState([]);

  const getAllOrder = async () => {
    const token = localStorage.getItem('userToken');
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API}/order`, {
        headers: {
          Authorization: `Tariq__${token}`
        }
      });
      setOrder(data.orders);
      console.log(data.orders);
      // Extract products from orders
      // const allProducts = data.orders.reduce((acc, curr) => {
      //   // Check if current order has products
      //   if (curr.products.length > 0) {
      //      // تقسيم كل الاوردرز(curr)
      //   // البرودكت(acc)
      //     return [...acc, ...curr.products];
      //   }
      //   return acc;
      // }, []);
    //  setProducts(allProducts);
    } catch (e) {
      console.log(e);
    }
  };  
  
  useEffect(() => {
    getAllOrder();
  }, []);
 // const filteredOrders = order.filter(orderItem => orderItem.products.length > 0);



  return (
 
  // filteredOrders.map(orderItem => (
  //   <div key={orderItem._id} className="card d-flex mt-3 flex-row align-items-center">
  //     {
  //     orderItem.products.length >0 && (
  //       orderItem.products.map(product => (
  //         <div key={product._id} className="product d-flex flex-column">
  //           <img src={product.productId.mainImage.secure_url} className="productImage" />
  //           <span>Final Price : {product.finalPrice}</span>
  //         </div>
  //       ))
  //     )}
  //   </div>
  // ))} 
  <section className="mt-5 orderInfo">
  
  <table className="table">
  <thead>
    <tr>
      <th scope="col">Address</th>
      <th scope="col">Phone Number</th>
      <th scope="col">Final Price</th>
      <th scope="col">Status</th>
    </tr>
  </thead>
  <tbody>
    {order.map(orderItem => (
      <tr key={orderItem.id}>
        <td>{orderItem.address}</td>
        <td>{orderItem.phoneNumber}</td>
        <td>{orderItem.finalPrice}</td>
        <td>{orderItem.status}</td>
      </tr>
    ))}
  </tbody>
</table>
</section>
  );
}


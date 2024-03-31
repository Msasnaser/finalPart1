import axios from 'axios'
import React, { useEffect,useState } from 'react'
import style from '../ProductList/ProductList.module.css'
import { Link } from 'react-router-dom';
import Loading from '../../loading/Loading';
import '../allProducts/AllProduct.css'
import  _ from "lodash";
export default function AllProduct() {
    const [products, setProducts] = useState([]);
    const [loader ,setLoader] = useState(true);
    const [search, setSearch] = useState('');
    const Limt =4;
    const[pageinate , setpageinate] =useState();
    const [current , setcurrent]=useState(1);
    const getAllProducts = async()=>{
      try{
         const{data} = await axios.get(`${import.meta.env.VITE_API}/products?page=1&limit=9`);
     setProducts(data.products);
     setpageinate(_(data.products).slice(0).take(Limt).value());
    }
   catch(err){
     console.log(err);
   }
   finally{
     setLoader(false);
   }
    }
    useEffect(() => {
      getAllProducts();
    }, []);
    
    const Countpage = products? Math.ceil(products.length/Limt) :0;
    if (Countpage === 1) return null;
     const pages = _.range(1 ,Countpage+1);
   const pagination  =(pageNum) =>
   {
     setcurrent(pageNum);
     const start =(pageNum -1) *Limt;
     const pageinate  = _(products).slice(start).take(Limt).value();
     setpageinate(pageinate) ;
   }
  
const getSearchProducts = async () => {
  try {
      const { data } = await axios.get(`${import.meta.env.VITE_API}/products?search=${search}`);
      setpageinate(data.products.length > 0 ? data.products : []); // Set products or empty array if no results to show
  } catch (err) {
      console.log(err);
  }
};

useEffect(() => {
  // Only call getSearchProducts if search is not empty not every render because there are another useEffect
  if (search !== '') {
      getSearchProducts();
  }
}, [search]);


const sortProducts = async(sortBy) => {
  console.log(sortBy);
 const {data}= await axios.get(`${import.meta.env.VITE_API}/products?sort=${sortBy}`);
 setpageinate(data.products);
};
    if(loader){
      return <Loading />;
    } 
  return (
    <>
    {
        <section className="container">
            <div className="d-flex align-items-center"> 
            <div className="mt-5">
                       <span> Sort By </span>  
                        <select  onChange={(e) => sortProducts(e.target.value)}>
                        <option value="-name">default</option>
                            <option value="price">price</option>
                            <option value="-price">-price</option>
                            <option value="name">name</option>
                            <option value="-name">-name</option>
                        </select>
                    </div>
        <form className="ProductSearch d-flex mt-5 align-items-center justify-content-center" role="search">
            <input className="form-control me-2" type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search" aria-label="Search" />
        </form>
        
                    </div>
        <div className="d-flex flex-column gap-3 align-items-center">
       
            {products.length > 0 ? (
                <div className={style.products}>
                    {pageinate.map(prod =>
                        <div className={style.product} key={prod._id}>
                            <div className={style.productInfo}>
                                <img className={style.productsImages} src={prod.mainImage.secure_url} />
                                <div className={style.aboutItem}></div>
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
            ) : (
                <div>
                    <h1>No product found</h1>
                </div>
            )}
        </div>
    </section> }

    <nav>
        <ul className="pagination justify-content-center mt-5">
          {
          pages.map(page => (
             <li className={page === current?" page-item active":"page-item"} key={page._id}>
                <p className="page-link" onClick={()=>pagination(page)}>{page}</p>
                </li>
            ))
          }
        </ul>
    </nav>
    </>
  )
}











































































// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function ProductDisplay() {
//     const [data, setData] = useState({ products: [], total: 0, limit: 10 });
//     const [currentPage, setCurrentPage] = useState(1);

//     useEffect(() => {
//         const fetchData = async () => {
//             const skip = (currentPage - 1) * 10;
//             const response = await axios.get(`https://dummyjson.com/products?limit=10&skip=${skip}`);
//             setData(response.data);
//         };

//         fetchData();
//     }, [currentPage]);

//     const handlePageClick = (pageNumber) => {
//         setCurrentPage(pageNumber);
//     };

//     const renderPagination = () => {
//         const numOfPages = Math.ceil(data.total / data.limit);
//         const paginationItems = [];
        
//         if (currentPage === 1) {
//             paginationItems.push(<li key="prev" className="page-item"><button className="page-link" disabled>Previous</button></li>);
//         } else {
//             paginationItems.push(<li key="prev" className="page-item"><button className="page-link" onClick={() => handlePageClick(currentPage - 1)}>Previous</button></li>);
//         }
        
//         for (let i = 1; i <= numOfPages; i++) {
//             paginationItems.push(
//                 <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
//                     <button className="page-link" onClick={() => handlePageClick(i)}>{i}</button>
//                 </li>
//             );
//         }
        
//         if (currentPage === numOfPages) {
//             paginationItems.push(<li key="next" className="page-item"><button className="page-link" disabled>Next</button></li>);
//         } else {
//             paginationItems.push(<li key="next" className="page-item"><button className="page-link" onClick={() => handlePageClick(currentPage + 1)}>Next</button></li>);
//         }
        
//         return paginationItems;
//     };

//     const renderProducts = () => {
//         return data.products.map(product => (
//             <div key={product.id} className="product">
//                 <img src={product.thumbnail} alt={product.title} />
//                 <h2>{product.title}</h2>
//                 <p>{product.description}</p>
//                 <a href={`details.html?id=${product.id}`}>Details</a>
//             </div>
//         ));
//     };

//     return (
//         <div>
//             <ul className="pagination">
//                 {renderPagination()}
//             </ul>
//             <div className="All products">
//                 {renderProducts()}
//             </div>
//         </div>
//     );
// }

// export default ProductDisplay;






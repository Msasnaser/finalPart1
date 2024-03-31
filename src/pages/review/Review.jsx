import axios from 'axios';
import React, { useState } from 'react'
import style from '../order/Order.module.css'
import Loading from '../../loading/Loading'; 
import { toast,Bounce } from 'react-toastify';
export default function Review() {
  const [loader, setLoader] = useState(true);
 
    const [rev, setRev] = useState(
      {
        comment: '',
        rating: '',
      }
    );
  const handleChangeForm=(e)=>{
    const { name, value } = e.target;
    setRev({
      ...rev,
      [name]: value
    });
  }
  const handleSubmit= async(e)=>{
    e.preventDefault();
    const urlParams= new URLSearchParams(window.location.search);
    const id=urlParams.get('id');   
    console.log(id)

    const token = localStorage.getItem('userToken');
    try{
    const {data} = await axios.post(`${import.meta.env.VITE_API}/products/${id}/review`,rev,
    {
      headers: {
        Authorization : `Tariq__${token}`
      }
    });
    if(data.message= 'success')
    { 
    toast('Your comment has been successfully posted', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
      });
      }
  
  console.log(data);
}
  catch(error){
    console.log(error);
  }
  finally {
    setLoader(false);
  }
  }
  // if (loader) {
  //   return <Loading />;
  // }
return (
  <>
  {/* {
      loader ? (
        <Loading />
          ) :
           ( */}
    <div className="mt-5" >
    <form  className={style.box} onSubmit={handleSubmit}>
    <h1 className="h1">review</h1>
      {/* <label className="lable">comment</label> */}
      <input type="text" className={style.inputemail}  value={rev.comment} name="comment" onChange={handleChangeForm} placeholder='comment'/>
   
      {/* <label className="lable"> rating</label> */}
      <input type="text"  className={style.inputemail} value={rev.rating} name="rating" onChange={handleChangeForm} placeholder='rating'/>
     <button type="submit" className={style.SubmitBtn} >Add Review</button>
    </form>
    </div>
{/* )} */}
  </>
)
}

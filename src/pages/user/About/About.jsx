
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import '../About/About.css'
import Loading from '../../../loading/Loading';
export default function About() {   
   // const {UserName}=useContext(UserInfo);
   const token = localStorage.getItem('userToken');
   const [userInfo, setUserInfo] =useState({});
   const [userImg, setUserImg] = useState({});
   const [loader, setLoader] = useState(true);
   const getInfo = async()=>{
    try{
    const {data} = await axios.get(`${import.meta.env.VITE_API}/user/profile`,{
            headers:{
                Authorization:`Tariq__${token}`
            }
    });
    console.log(data.user);
    setUserInfo(data.user)
    setUserImg(data.user.image)}
    catch(error){
      console.log(error);
    }
    finally {
        setLoader(false);
      }
 }
    useEffect(()=>{
        getInfo();
    },[]);
    if (loader) {
        return <Loading />;
      }
    return (
        <>
       <div className="container">
        <div className="d-flex flex-column gap-3 mt-5">
            <span className="info"><strong className="text-danger">User Name : </strong>   {userInfo.userName}</span>
            <span className="info"><strong className="text-danger">Email : </strong>       {userInfo.email}</span>
            <div className="big-img">
                 <img className="mainImage"  src={userImg.secure_url}/> 
           </div> 
        </div>
       </div>
        </>
    );
}


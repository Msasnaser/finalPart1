import React, { useState } from 'react';
import style from '../ForgetPassword//ForgetPassword.module.css';
import axios from 'axios';
import { Bounce, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
export default function Sendcode() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.patch(`${import.meta.env.VITE_API}/auth/sendcode`, { email });
      if(data.message == 'success') {
        toast('Please check your email to get the code ', {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
          });
          navigate('/forgetPassword');
      }
    } catch (error) {
      toast.error("Error occurred:", error, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        });
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <>
      <section className={style.password}>
        <div className='container'>
          <form onSubmit={handleSubmit} className={style.box}>
            <h1>Send Code</h1>
            <div className={style.inputemail}>
              <input type="email" name="email" value={email} onChange={handleEmailChange} placeholder='Email'/>
            </div>
            <button className={style.SubmitBtn} type="submit" >Submit</button>
          </form>
        </div>
      </section>
    </>
  );
  }
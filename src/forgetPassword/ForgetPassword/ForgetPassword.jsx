import React, { useState } from 'react'
import { object, string } from 'yup';
import axios from 'axios';
import style from '../ForgetPassword/ForgetPassword.module.css';
export default function ForgetPassword() {
  const [loader, setLoader] = useState(false);
  const [userError, setUserError] = useState([]);
  const [user,setUser] = useState(
    {
      email: '',
      password: '', 
      code: '', 
    }
  );
  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setUser({
   ...user,
      [name]: value,
    });
  };
  const valideData = async () => {
    const forgetPasswordSchema = object({
      password: string().min(3).max(15),
    })
    try {
      await forgetPasswordSchema.validate(user, { abortEarly: false });
      return true;
    }
    catch (error) {
      setUserError(error.errors);
      setLoader(false);
      return false;
    }

  }
  const handleSubmit= async(e) => {
    e.preventDefault();
    setLoader(true);
    if ( await valideData()) {
      try {
        const { data } = await axios.patch(`${import.meta.env.VITE_API}/auth/forgotPassword`, user);
        setUser(
          {
            password: '',
            email: '',
            code: '',
          }
        );
        if(data.message == 'success') {
          toast.success('Your password is Change', {
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
            navigate('/login');
        }
      }
      catch(error){
      console.log(error);
      }
    }
  };
  return (
    <>
        <section className="mt-5">
        <div className='container'>
          <form onSubmit={handleSubmit} className={style.box}>
            <h1>Forget Password</h1>
            <div className={style.input}>
              <input type="email" name="email" value={user.email} onChange={handleChangeForm} placeholder='Email' required />
              {/* <label>Email</label> */}
            </div>
          <div className={style.input}>
                <input type="password" value={user.password} name="password" onChange={handleChangeForm} placeholder='New Password' required />
                {/* <label>New Password</label> */}
              </div>
            
            <div className={style.input}>
              <input type="text" name="code" value={user.code} onChange={handleChangeForm} placeholder='Code' required />
              {/* <label>Code</label> */}
            </div>
            <button className={style.SubmitBtn} type="submit">Submit</button>
          </form>
        </div>
      </section>
    </>
  )
}


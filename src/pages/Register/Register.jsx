import React, { useState } from 'react'
import axios from 'axios';
import { date, object, string } from 'yup';
import { Bounce, Zoom, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import  '../Register/Register.css';
export default function Register() {
  const [user, setUser] = useState(
    {
      userName: '',
      password: '',
      email: '',
      image: '',
    }
  );
  const [loader,setLoader] = useState(false);
  const navigate = useNavigate();
  const [userError, setUserError] = useState([]);
  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  };

  const handleChangeImage = (e) => {
    const { name, files } = e.target;
    setUser({
      ...user,
      [name]: files[0],
    });
  };
  const valideData = async () => {
   
    const RegisterSchema = object({
      userName: string().min(5).max(15).required(),
      password: string().min(5).max(15).required(),
      email: string().email().required(),
      image: string().required(),
    })
    try {
      await RegisterSchema.validate(user, { abortEarly: false });
      return true;
    }
    catch (error) {
      //console.log("validation error", error.errors);
      setUserError(error.errors); 
      setLoader(false);
      return false;
    }
  }

  const handelSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    if (await valideData()) {
      const formData = new FormData();
      formData.append('userName', user.userName);
      formData.append('password', user.password);
      formData.append('email', user.email);
      formData.append('image', user.image);
      // for (const pair of formData.entries()) {
      //   console.log(pair);
      // }
      try{
      const { data } = await axios.post(`${import.meta.env.VITE_API}/auth/signup`, formData);
      setUser(
        {
          userName: '',
          password: '',
          email: '',
          image: '',
        }
      );
      if(data.message == 'success'){
        toast.success('Your account has been created successfully', {
          position: "top-center",
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Zoom,
          });
          navigate('/login');
      }
     }
      catch(error){
        toast.error(error.response.data.message,{
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
    else {
     for(let i=0 ;i<userError.length;i++){
       toast.error(userError[i],{
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
         theme: "colored",
         transition: Bounce,
         });
     }
    }
  };
  return (
    <>
      <section className="login">
        <div className="wrapper">
          <div className="formBox login">
            <h2>Sign Up</h2>
            <form onSubmit={handelSubmit}>
              <div className="inputBox">
                <input type="text" value={user.userName} name="userName" onChange={handleChangeForm} required ></input>
                <label>Username</label>
                <i className="bx bxs-user" />
                {userError.username}
              </div>
              <div className="inputBox">
                <input type="email" value={user.email} name="email" onChange={handleChangeForm} required></input>
                <label>Email</label>
                <i className='bx bx-envelope'></i>
                 {userError.email} 
              </div>
              <div className="inputBox">
                <input type="password" value={user.password} name="password" onChange={handleChangeForm} required></input>
                <label>Password</label>
                <i className="bx bxs-lock-alt" />
                {userError.password}
              </div>
              <div className="inputBox">
                <input type="file" name="image" onChange={handleChangeImage}></input>
                <i className='bx bx-image-add'></i>
              </div>
              <button type="submit" className="Btn">{!loader?'Sign Up':'Please Wait..'}</button>
              {/* {!loader?'':<div classNamee="lod"><span className="Loader"></span></div>} */}
              <div className="logregLink">
                <p>Are have an account ?<Link className="registerLink" to="/login">Log In</Link></p>
              </div>
            </form>
          </div>
          <div className="infoText login1">
            <h2>Welcome Back!</h2>
            <p>Lorem ipsum dolor sit amet
              consectetur adipisicing elit.
              liquid nam, perferendis explicabo expedit
            </p>
          </div>
          <span className="bgAnimate"></span>
        </div>
        </section>  
    </>
  )
}

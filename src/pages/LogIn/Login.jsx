
import React, { useState } from 'react'
import axios from 'axios';
import '../LogIn/Login.css'
import 'boxicons/css/boxicons.css';
import { object, string } from 'yup';
import { Zoom, toast } from 'react-toastify';
import { Link,useNavigate } from 'react-router-dom';
export default function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState(
    {
      password: '',
      email: '',
    }
  );
  const [userError, setUserError] = useState([]);
  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  };
  const valideData = async () => {
    const RegisterSchema = object({
      password: string().min(3).max(15),
      email: string().email(),
    })
    try {
      await RegisterSchema.validate(user, { abortEarly: false });
      return true;
    }
    catch (error) {
      console.log("validation error", error.errors);
      setUserError(error.errors);
      return false;
    }
  }
  const handelSubmit = async (e) => {
    e.preventDefault();
    if (await valideData()) {
      try{
        const { data } = await axios.post(`${import.meta.env.VITE_API}/auth/signin`,user);
        setUser(
          {
            password: '',
            email: '',
          }
        );
        if(data.message == 'success'){
          toast.info('please confirm your email!', {
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
            navigate('/');
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
    }
    else {
      toast.error('Please Make sure your password or name is correct', {
        position: "bottom-center",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Zoom,
      });
   }}

  return (
    <>
      <section className="login">
        <div className="wrapper">
          <div className="formBox login">
            <h2>Login</h2>
            <form onSubmit={handelSubmit}>
              <div className="inputBox">
                <input type="email" value={user.email} name="email" onChange={handleChangeForm} required></input>
                <label>Email</label>
                <i className='bx bx-envelope'></i>
              </div>
              <div className="inputBox">
                <input type="password" value={user.password} name="password" onChange={handleChangeForm} required />
                <label>password</label>
                <i className="bx bxs-lock-alt" />
              </div>
              <button type="submit" className="Btn">Login</button>

              <div className="d-flex gap-3 mt-3">
                <div className="d-flex gap-1">
                  <input type="checkbox" />
                  <label className="ml-10 text-light">Remember me</label>
                </div>
                <Link>Forgot Password?</Link>
              </div>
              <div className="logregLink">
                <p>Dont have an account ? <Link className="registerLink" to="/register">Sign Up</Link></p>
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
          <span className="bgAnimate" />
        </div>
        </section>
    </>
  )  }



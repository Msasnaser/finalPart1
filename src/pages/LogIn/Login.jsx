
import React, { useContext, useState } from 'react'
import axios from 'axios';
import '../LogIn/Login.css'
import 'boxicons/css/boxicons.css';
import { object, string } from 'yup';
import { Zoom, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { UserInfo } from '../../Components/context/User';
export default function Login() {
  const navigate = useNavigate();
  //const {UserName}=useContext(UserInfo);
  const [user, setUser] = useState(
    {
      password: '',
      email: '',
    }
  );
  const [userError, setUserError] = useState([]);
  const [loader, setLoader] = useState(false);
  const { setUserToken } = useContext(UserInfo);
  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  };
  const valideData = async () => {
    const LoginSchema = object({
      password: string().min(3).max(15),
      email: string().email(),
    })
    try {
      await LoginSchema.validate(user, { abortEarly: false });
      return true;
    }
    catch (error) {
      setUserError(error.errors);
      setLoader(false);
      return false;
    }

  }
  const handelSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    if (await valideData()) {
      try {
        const { data } = await axios.post(`${import.meta.env.VITE_API}/auth/signin`, user);
        setUser(
          {
            password: '',
            email: '',
          }
        );
        if (data.message == 'success') {
          toast('Welcome', {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Zoom,
          });
            localStorage.setItem('userToken', data.token);
          setUserToken(data.token);
          navigate('/');
        }
      }
      catch (error) {
        toast.error(error.response.data.message, {
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
      finally {
        setLoader(false);
      }
    }
    else {
      toast.error('Please make sure your password or name is correct', {
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
    }
  }

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
              <button type="submit" className="Btn">{!loader ? 'Login' : 'Please Wait..'}</button>

              <div className="d-flex gap-3 mt-3">
                <div className="d-flex gap-1">
                  <input type="checkbox" />
                  <label className="ml-10 text-light">Remember me</label>
                </div>
                <Link to="/Sendcode">Forgot Password?</Link>
              </div>
              <div className="logregLink">
                <p>Dont have an account ? <Link className="registerLink" to="/register">Login</Link></p>
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
  )
}



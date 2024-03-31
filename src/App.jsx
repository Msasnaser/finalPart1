
import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Root from './rout/Root';
import Home from './pages/Home/Home';
import Products from './pages/Products/Products';
import Categories from './pages/Categories/Categories';
import Cart from './pages/Cart/Cart';
import Login from './pages/LogIn/Login';
import Register from './pages/Register/Register';
import ProductList from './pages/ProductList/ProductList';
import NotFound from "./Components/notFound/NotFound";
import ProductNotFound from "./pages/ProductList/ProductNotFound";
import UserInfoProvider from './Components/context/User';
import ForgetPassword from "./forgetPassword/ForgetPassword/ForgetPassword";
import Sendcode from "./forgetPassword/sendcode/Sendcode";
import AllProduct from "./pages/allProducts/AllProduct";
import Order from "./pages/order/Order";
import About from "./pages/user/About/About";
import Contact from "./pages/user/contact/Contact";
import Profile from "./pages/user/profile/Profile";
import UserOrder from "./pages/user/order/UserOrder";
import Review from "./pages/review/Review";
import MyCartContextProvider from "./Components/context/CartItem";
function App() {
  const MainRouter = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement :<NotFound />,
      children: [
        {
           path: "/",
            element: <Home /> 
          },
        { 
          path: "/products/:productId", 
        element:
        // <MyCartContextProvider>
         <Products /> 
        //  </MyCartContextProvider>
      },
        {
           path: "/product",
         element: <AllProduct />
       },
        { 
          path: "/categories", 
          element: <Categories /> 
      },
        {
           path: "/forgetPassword",
            element: <ForgetPassword /> 
      },
      {
        path: "/review",
         element: <Review /> 
   },
        {
           path: "/Sendcode",
            element: <Sendcode />
       },
        {
           path: "/cart",
         element: <Cart />
       },
        {
           path: "/ProductNotFound", 
           element:
         <ProductNotFound />
       },
        { 
          path: "/login",
           element: <Login /> 
      },
        { 
          path: "/productList/:id",
           element: <ProductList />
       },
        { 
          path: "/register",
           element: <Register />
       },
        {
           path: "/order",
         element: <Order />
       },
      ],
    },
    {
      path: "/profile",
      element: <Profile />,
      children: [
        { 
          path: "about", 
        element: <About />
       },
        {
           path: "contact",
         element: <Contact />
       },
       {
        path: "order",
      element: <UserOrder />
    },
      ],
    },
  ]);

  return (
    <>
        
      <UserInfoProvider>
        <MyCartContextProvider>
        <RouterProvider router={MainRouter} />
        <ToastContainer />
         </MyCartContextProvider>
      </UserInfoProvider>
    </>
  );
}

export default App;
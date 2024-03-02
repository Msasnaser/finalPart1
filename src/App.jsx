import { useState } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css'
import Root from './rout/Root';
import Home from './pages/Home/Home';
import Product from './pages/Products/Product';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import Categories from './pages/Categories/Categories';
import Cart from './pages/Cart/Cart';

function App() {
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/product",
        element: <Product />,
      },
      {
        path: "/categories",
        element: <Categories />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
    ]
    },
  ]);
  return (
   <RouterProvider router={router} />
  )
}

export default App

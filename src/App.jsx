
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css'
import Root from './rout/Root';
import Home from './pages/Home/Home';
import Product from './pages/Products/Product';
import Categories from './pages/Categories/Categories';
import Cart from './pages/Cart/Cart';
import Login from './pages/LogIn/Login';
 import Register from './pages/Register/Register';
 import { ToastContainer } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';
import ProductList from './pages/ProductList/ProductList';
import NotFound from "./Components/notFound/NotFound";
import ProductNotFound from "./pages/ProductList/ProductNotFound";

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
        path: "/ProductNotFound",
        element: <ProductNotFound />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/productList/:id",
        element: <ProductList />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ]
    },
  ]);
  return (
    <>
    <RouterProvider router={router} />
    <ToastContainer />
    </>
   
  )
}

export default App

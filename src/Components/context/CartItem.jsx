import { createContext, useContext, useState } from "react";

export const MyCartContext = createContext(); // Changed to named export

export const useMyContext = () => {
  return useContext(MyCartContext);
}

 const MyCartContextProvider = ({ children }) => { // Fixed typo in props name
  const [cartNum, setCartNum] = useState([]);

  const all = {
    cartNum,
    setCartNum,
  };

  return (
    <MyCartContext.Provider value={all }>
      {children}
    </MyCartContext.Provider>
  );
};
export default MyCartContextProvider;
// import { createContext, useEffect, useState } from "react";
// import axios from 'axios';
// export const CartInfo = createContext();

// const CartInfoProvider = ({ children }) => {
//     const [loader, setLoader] = useState(true);
//     const token = localStorage.getItem('userToken');
//     const [cartItems, setCartItems] = useState([]);
//     const getCart = async () => {
//         try {
//           const { data } = await axios.get(`${import.meta.env.VITE_API}/cart`, {
//             headers: {
//               Authorization: `Tariq__${token}`
//             }
//           });
//           console.log(data);
//           setCartItems(data.products);
//         } catch (error) {
//           console.log(error);
//         }
//         finally {
//           setLoader(false);
//         }
//       };
//       useEffect(()=>{
//         getCart();
//       },[]);
//       return <CartInfo.Provider value={{ setCartItems, cartItems, loader }}>{children}</CartInfo.Provider>}
// export default CartInfoProvider ;

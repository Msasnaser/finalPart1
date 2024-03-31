import { createContext, useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode"; // Correct import

export const UserInfo = createContext();

const UserInfoProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(localStorage.getItem('userToken'));
  const [userName, setUserName] = useState('');
  const [isLogin, setIsLogin] = useState(false);

  const getUserData = () => {
    if (userToken != null) {
      const decoded = jwtDecode(userToken);
      setUserName(decoded.userName);
      setIsLogin(true);
    } else {
      setUserName(null);
      setIsLogin(false);
    }
  }

  useEffect(() => {
    getUserData();
  }, [userToken]);

  return (
    <UserInfo.Provider value={{ userToken, setUserToken, isLogin, setUserName, userName }}>
      {children}
    </UserInfo.Provider>
  );
};

export default UserInfoProvider;

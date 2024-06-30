import React, { createContext, useState, useEffect, useContext } from "react";
import { useCookies } from "react-cookie";

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["authUser"]);
  const [authUser, setAuthUser] = useState(cookies.authUser || null);

  useEffect(() => {
    if (authUser) {
      setCookie("authUser", JSON.stringify(authUser), {
        path: "/",
        expires: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
      });
    } else {
      removeCookie("authUser", { path: "/" });
    }
  }, [authUser, setCookie, removeCookie]);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};

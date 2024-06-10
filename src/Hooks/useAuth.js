import React, { createContext, useContext } from "react";
import { useCookies } from "react-cookie";
import { login_url, register_url } from "../utils/urls";
import axios from "axios";

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE,
  // baseURL: process.env.REACT_APP_API_BASE,
});

function useProvideAuth() {
  const [cookies, setCookie, removeCookie] = useCookies([
    "jwt",
    "username",
    "role",
  ]);
  const isAdmin = cookies.role == "admin" ? 1 : 0;
  const isAuthenticated = !!cookies.username;
  const token = cookies.jwt;
  const currentUser = cookies.username;

  const login = async (email, password) => {
    return axiosClient
      .post(login_url, {
        email: email,
        password: password,
      })
      .then(function (response) {
        const expires = new Date();
        expires.setDate(expires.getDate() + 7); // Cookie will expire in 7 days

        removeCookie("jwt");
        removeCookie("username");
        removeCookie("role");
        setCookie("jwt", response.data.data.access_token, {
          path: "/",
          expires,
        });
        setCookie("username", response.data.data.username, {
          path: "/",
          expires,
        });
        setCookie("role", response.data.data.role, { path: "/", expires });
        return response.data;
      });
  };

  const logout = () => {
    removeCookie("jwt", { path: "/" });
    removeCookie("username", { path: "/" });
    removeCookie("role", { path: "/" });
  };

  const register = async (username, email, password) => {
    return axiosClient
      .post(register_url, {
        username: username,
        email: email,
        password: password,
      })
      .then(function (response) {
        return response.data;
      });
  };

  return {
    isAdmin,
    isAuthenticated,
    token,
    currentUser,
    login,
    logout,
    register,
  };
}

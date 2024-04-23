import React from "react";
import { CREATE_USER, CHECK_USER, USER_LOGIN } from "../utils/api/api";
import { useNavigate, useLocation } from "react-router-dom";

export const userStorage = React.createContext();

export const UserContext = ({ children }) => {
  const [login, setLogin] = React.useState(null);
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(null);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  async function createUser(user) {
    try {
      setLoading(true);
      const { url, options } = CREATE_USER(user);
      const data = await fetch(url, options);
      const json = await data.json();
      if (!json.token) {
        throw new Error(json.message);
      }
      if (json.token) {
        window.localStorage.token = json.token;
        setLogin(true);
        setData(json);
        console.log(json);
        navigate("/");
      }
    } catch (err) {
      setError(err.message);
      setLoading(null);
    } finally {
      setLoading(null);
    }
  }

  async function userLogin(user) {
    try {
      setLoading(true);
      const { url, options } = USER_LOGIN(user);
      const data = await fetch(url, options);
      const json = await data.json();
      if (!json.token) throw new Error(json.message);
      localStorage.token = json.token;
      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(null);
    }
  }

  function userLogout() {
    setData(null);
    setLogin(null);
    window.localStorage.removeItem("token");
  }

  React.useEffect(() => {
    async function autoLogin() {
      const token = localStorage.token;
      setError(null);
      if (token) {
        try {
          setLoading(true);
          const { url, options } = CHECK_USER(token);
          const data = await fetch(url, options);
          const json = await data.json();
          if (!json.currentUser) throw new Error("Token inválido");
          setLogin(true);
          setData(json.currentUser);
        } catch (error) {
          setError(error.message);
          setLogin(false);
          setData(null);
          userLogout();
        } finally {
          setLoading(null);
        }
      }
    }
    autoLogin();
  }, [location.pathname]);

  return (
    <userStorage.Provider
      value={{ login, data, createUser, error, userLogout, loading, userLogin }}
    >
      {children}
    </userStorage.Provider>
  );
};

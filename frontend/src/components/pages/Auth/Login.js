import React from "react";
import styles from "./Form.module.css";
import Input from "../../form/Input";
import GreenButton from "../../greenButton/GreenButton";
import { userStorage } from "../../../context/UserContext";
import useForm from "../../../hooks/useForm/useForm";
import Error from "../../error/Error";
import { Navigate } from "react-router-dom";
const Login = () => {
  const [user, setUser] = React.useState({});
  const email = useForm("email");
  const password = useForm("password");

  const { userLogin, error, login, loading } = React.useContext(userStorage);

  function handleChange(e) {
    setUser({ ...user, [e.target.id]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    userLogin(user);
  }
  if(login) return <Navigate to='/'/>
  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
      onChange={handleChange}
    >
      <h1>Entrar</h1>
      <Input
        id="email"
        type="text"
        label="Email"
        placeholder="Digite o email"
        {...email}
      />
      <Input
        id="password"
        type="password"
        label="Senha"
        placeholder="Digite a senha"
        {...password}
      />
      <GreenButton disabled={loading}>Entrar</GreenButton>
      {error ? <Error>{error}</Error> : null}
    </form>
  );
};

export default Login;

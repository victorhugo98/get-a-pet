import React from "react";
import Input from "../../form/Input";
import useForm from "../../../hooks/useForm/useForm";
import styles from "./Form.module.css";
import GreenButton from "../../greenButton/GreenButton";
import { Navigate } from "react-router-dom";
import { userStorage } from "../../../context/UserContext";
import Error from "../../error/Error";

const Register = () => {
  const email = useForm("email");
  const name = useForm(false);
  const phone = useForm("number");
  const password = useForm("password");
  const confirmPassword = useForm("password");
  const [user, setUser] = React.useState({});

  const { createUser, error, login, loading } = React.useContext(userStorage);

  function handleChange(e) {
    setUser({ ...user, [e.target.id]: e.target.value });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (
      email.validate() &&
      name.validate() &&
      phone.validate() &&
      password.validate()
    ) {
      createUser(user);
    }
  }

  if (login) return <Navigate to="/" />;
  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
      onChange={handleChange}
    >
      <h1>Registrar</h1>
      <Input
        label="Nome"
        id="name"
        type="text"
        placeholder="Digite o nome"
        {...name}
      />

      <Input
        label="Email"
        id="email"
        type="text"
        placeholder="Digite a email"
        {...email}
      />

      <Input
        label="Telefone"
        id="phone"
        type="text"
        placeholder="(00)00000-0000"
        {...phone}
      />

      <Input
        label="Senha"
        id="password"
        type="password"
        placeholder="Digite a senha"
        {...password}
      />

      <Input
        label="Confirmar senha"
        id="confirmPassword"
        type="password"
        placeholder="Confirme a senha"
        {...confirmPassword}
      />
      <GreenButton disabled={loading ? true : false}>Cadastrar</GreenButton>
      {error ? <Error>{error}</Error> : null}
    </form>
  );
};

export default Register;

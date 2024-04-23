import React from "react";
import Logo from "../../assets/img/logo.png";
import { NavLink, Link } from "react-router-dom";
import styles from "./Header.module.css";
import { userStorage } from "../../context/UserContext";

const Header = () => {
  const { data, login, userLogout } = React.useContext(userStorage);

  return (
    <header className={styles.header}>
      <div>
        <NavLink to="">
          <img src={Logo} alt="Logo Get a Pet" />
        </NavLink>
      </div>

      <nav>
        <ul className={styles.list}>
          <li>
            <Link className="bold" to="/adotar">
              Adotar
            </Link>
          </li>

          {data ? (
            <>
              <li>
                <NavLink className="bold" to="/user/profile">
                  Perfil
                </NavLink>
              </li>
              <li>
                <Link className="bold" to="/login" onClick={userLogout}>
                  Sair
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink className="bold" to="/login">
                  Entrar
                </NavLink>
              </li>
              <li>
                <NavLink className="bold" to="/register">
                  Cadastrar
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;

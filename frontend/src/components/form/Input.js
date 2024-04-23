import React from "react";
import styles from "./Input.module.css";
import Error from "../error/Error";
const Input = ({
  type,
  label,
  onChange,
  error,
  onBlur,
  id,
  placeholder,
  value,
}) => {
  return (
    <div className={styles.inputContainer}>
      <label>
        {label}
        <input
          value={value}
          type={type}
          id={id}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
        />
      </label>
      {error ? <Error>{error}</Error> : null}
    </div>
  );
};

export default Input;

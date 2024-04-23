import React from "react";
import styles from "./GreenButton.module.css";

const GreenButton = ({ disabled, children }) => {
  return <button disabled={disabled} className={styles.button}>{children}</button>;
};

export default GreenButton;

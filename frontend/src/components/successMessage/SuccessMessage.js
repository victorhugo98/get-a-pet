import React from "react";
import styles from "./SuccessMessage.module.css";
const SuccessMessage = ({ children }) => {
  return <p className={styles.message}>{children}</p>;
};

export default SuccessMessage;

import React from "react";
import styles from "./Container.module.css";
const Container = ({ children }) => {
  return <main className={styles.appBody}>{children}</main>;
};

export default Container;

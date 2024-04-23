import React from "react";
import styles from "./Skeleton.module.css";

const Skeleton = ({
  width = "300px",
  height = "40px",
  borderRadius = "10px",
}) => {
  return (
    <div
      className={styles.skeleton}
      style={{ width: width, height: height, borderRadius: borderRadius }}
    ></div>
  );
};

export default Skeleton;

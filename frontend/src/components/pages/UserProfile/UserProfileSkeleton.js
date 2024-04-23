import React from "react";
import formStyles from "../Auth/Form.module.css";
import Skeleton from "../../skeleton/Skeleton";
import styles from "./UserProfileSkeleton.module.css";

const UserProfileSkeleton = () => {
  return (
    <div className={`${formStyles.form} ${styles.skeleton}`}>
      <h1>Editar</h1>
      <Skeleton borderRadius="50%" height="300px" />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </div>
  );
};

export default UserProfileSkeleton;

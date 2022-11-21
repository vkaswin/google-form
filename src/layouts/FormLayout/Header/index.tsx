import React from "react";

import styles from "./FormHeader.module.scss";

export type FormHeaderProps = {
  disable?: boolean;
};

export const FormHeader = ({ disable = false }: FormHeaderProps) => {
  return (
    <div className={styles.container}>
      <span>Header</span>
    </div>
  );
};

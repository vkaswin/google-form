import React, { ChangeEvent } from "react";
import { TextEditor } from "components/TextEditor";

import styles from "./FormHeader.module.scss";

export type FormHeaderProps = {
  disable?: boolean;
};

export const FormHeader = ({ disable = false }: FormHeaderProps) => {
  const handleChange = (event: ChangeEvent<HTMLDivElement>) => {
    console.log(event);
  };

  return (
    <div className={styles.container}>
      <h2>Form</h2>
      <TextEditor onChange={handleChange} />
    </div>
  );
};

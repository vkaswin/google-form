import React from "react";
import { FormData } from "types/Form";

import styles from "./FormCard.module.scss";

const FormCard = ({ _id, title }: FormData) => {
  return (
    <div className={styles.container}>
      <span>Form Card</span>
      <span>{title}</span>
    </div>
  );
};

export default FormCard;

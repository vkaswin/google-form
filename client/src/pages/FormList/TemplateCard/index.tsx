import React from "react";
import { FormData } from "types/Form";

import styles from "./TemplateCard.module.scss";

const TemplateCard = ({ _id, title }: FormData) => {
  return (
    <div className={styles.container}>
      <span>Template</span>
      <span>{title}</span>
    </div>
  );
};

export default TemplateCard;

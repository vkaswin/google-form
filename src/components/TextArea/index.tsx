import React from "react";
import { TextAreaProps } from "types/TextArea";

import styles from "./TextArea.module.scss";

export const TextArea = ({ onChange = () => {} }: TextAreaProps) => {
  return (
    <div>
      <span>TextArea</span>
    </div>
  );
};

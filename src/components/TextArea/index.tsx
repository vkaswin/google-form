import React from "react";

import styles from "./TextArea.module.scss";

type TextAreaProps = {
  onChange?: () => void;
};

export const TextArea = ({ onChange = () => {} }: TextAreaProps) => {
  return (
    <div>
      <span>TextArea</span>
    </div>
  );
};

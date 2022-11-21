import React from "react";

import styles from "./Input.module.scss";

type InputProps = {
  onChange?: () => void;
};

export const Input = ({ onChange = () => {} }: InputProps) => {
  return (
    <div>
      <span>Input</span>
    </div>
  );
};

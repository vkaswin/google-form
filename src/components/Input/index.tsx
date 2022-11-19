import React from "react";
import { InputProps } from "types/Input";

import styles from "./Input.module.scss";

export const Input = ({ onChange = () => {} }: InputProps) => {
  return (
    <div>
      <span>Input</span>
    </div>
  );
};

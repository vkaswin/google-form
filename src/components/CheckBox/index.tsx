import React from "react";
import { CheckBoxProps } from "types/CheckBox";

import styles from "./CheckBox.module.scss";

export const CheckBox = ({ onChange = () => {} }: CheckBoxProps) => {
  return (
    <div>
      <span>CheckBox</span>
    </div>
  );
};

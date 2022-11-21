import React from "react";

import styles from "./CheckBox.module.scss";

type CheckBoxProps = {
  onChange?: () => void;
};

export const CheckBox = ({ onChange = () => {} }: CheckBoxProps) => {
  return (
    <div>
      <span>CheckBox</span>
    </div>
  );
};

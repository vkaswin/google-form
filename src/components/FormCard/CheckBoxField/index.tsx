import React from "react";

import styles from "./CheckBoxField.module.scss";

type CheckBoxFieldProps = {
  readOnly: boolean;
};

export const CheckBoxField = ({ readOnly }: CheckBoxFieldProps) => {
  return (
    <div>
      <span>Checkbox</span>
    </div>
  );
};

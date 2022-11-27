import React from "react";

import styles from "./DropDownField.module.scss";

type DropDownFieldProps = {
  readOnly: boolean;
};

export const DropDownField = ({ readOnly }: DropDownFieldProps) => {
  return (
    <div>
      <span>DropDown Field</span>
    </div>
  );
};

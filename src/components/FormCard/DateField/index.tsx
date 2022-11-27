import React from "react";

import styles from "./DateField.module.scss";

type DateFieldProps = {
  readOnly: boolean;
};

export const DateField = ({ readOnly }: DateFieldProps) => {
  return (
    <div>
      <span>Date Field</span>
    </div>
  );
};

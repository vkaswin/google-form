import React from "react";

import styles from "./DatePicker.module.scss";

type DatePickerProps = {
  onChange?: () => void;
};

export const DatePicker = ({ onChange = () => {} }: DatePickerProps) => {
  return (
    <div>
      <span>DatePicker</span>
    </div>
  );
};

import React from "react";
import { DatePickerProps } from "types/DatePicker";

import styles from "./DatePicker.module.scss";

export const DatePicker = ({ onChange = () => {} }: DatePickerProps) => {
  return (
    <div>
      <span>DatePicker</span>
    </div>
  );
};

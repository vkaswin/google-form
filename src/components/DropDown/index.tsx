import React from "react";
import { DropDownProps } from "types/DropDown";

import styles from "./DropDown.module.scss";

export const DropDown = ({ onChange = () => {} }: DropDownProps) => {
  return (
    <div>
      <span>DropDown</span>
    </div>
  );
};

import React from "react";

import styles from "./DropDown.module.scss";

type DropDownProps = {
  onChange?: () => void;
};

export const DropDown = ({ onChange = () => {} }: DropDownProps) => {
  return (
    <div>
      <span>DropDown</span>
    </div>
  );
};

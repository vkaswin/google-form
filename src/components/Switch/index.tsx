import React from "react";
import { SwitchProps } from "types/Switch";

import styles from "./Switch.module.scss";

export const Switch = ({ onChange = () => {} }: SwitchProps) => {
  return (
    <div>
      <span>Switch</span>
    </div>
  );
};

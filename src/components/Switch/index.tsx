import React from "react";

import styles from "./Switch.module.scss";

export type SwitchProps = {
  onChange?: () => void;
};

export const Switch = ({ onChange = () => {} }: SwitchProps) => {
  return (
    <div>
      <span>Switch</span>
    </div>
  );
};

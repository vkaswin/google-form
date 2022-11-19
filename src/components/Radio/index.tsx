import React from "react";
import { RadioProps } from "types/Radio";

import styles from "./Radio.module.scss";

export const Radio = ({ onChange = () => {} }: RadioProps) => {
  return (
    <div>
      <span>Radio</span>
    </div>
  );
};

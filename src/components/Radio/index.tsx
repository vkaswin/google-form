import React from "react";

import styles from "./Radio.module.scss";

type RadioProps = {
  onChange?: () => void;
};

export const Radio = ({ onChange = () => {} }: RadioProps) => {
  return (
    <div>
      <span>Radio</span>
    </div>
  );
};

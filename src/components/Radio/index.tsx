import React from "react";

import styles from "./Radio.module.scss";

type RadioProps = {
  onChange?: () => void;
};

const Radio = ({ onChange = () => {} }: RadioProps) => {
  return (
    <div>
      <span>Radio</span>
    </div>
  );
};

export default Radio;

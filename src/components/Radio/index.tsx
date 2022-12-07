import { ComponentProps } from "react";

import styles from "./Radio.module.scss";

type RadioProps = {
  label?: string;
} & ComponentProps<"input">;

const Radio = ({ label = "", id = "", ...props }: RadioProps) => {
  return (
    <div className={styles.field}>
      <input type="radio" {...(id.length > 0 && { id })} {...props} />
      {label.length > 0 && <label htmlFor={id}>{label}</label>}
    </div>
  );
};

export default Radio;

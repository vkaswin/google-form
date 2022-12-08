import { ComponentProps } from "react";

import styles from "./CheckBox.module.scss";

type CheckBoxProps = {
  label?: string;
} & ComponentProps<"input">;

const CheckBox = ({ label = "", id = "", ...props }: CheckBoxProps) => {
  return (
    <div className={styles.field}>
      <input type="checkbox" {...(id.length > 0 && { id })} {...props} />
      {label.length > 0 && <label htmlFor={id}>{label}</label>}
    </div>
  );
};

export default CheckBox;

import { ComponentProps } from "react";

import styles from "./Switch.module.scss";

type SwitchProps = {
  label?: string;
} & ComponentProps<"input">;

const Switch = ({ id, label = "", className, ...props }: SwitchProps) => {
  return (
    <div className={`${styles.field} ${className || ""}`.trim()}>
      {label.length > 0 && <label htmlFor={id}>{label}</label>}
      <input id={id} type="checkbox" {...props} />
    </div>
  );
};

export default Switch;

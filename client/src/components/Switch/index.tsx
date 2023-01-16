import { ComponentProps } from "react";
import { FormRegister } from "types/UseForm";

import styles from "./Switch.module.scss";

type SwitchProps = {
  label?: string;
  register?: ReturnType<FormRegister> | {};
} & ComponentProps<"input">;

const Switch = ({
  id,
  label = "",
  className,
  register = {},
  ...props
}: SwitchProps) => {
  return (
    <div className={`${styles.field} ${className || ""}`.trim()}>
      {label.length > 0 && <label htmlFor={id}>{label}</label>}
      <input id={id} type="checkbox" {...register} {...props} />
    </div>
  );
};

export default Switch;

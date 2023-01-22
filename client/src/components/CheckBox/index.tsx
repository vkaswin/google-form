import { ComponentProps } from "react";
import { FormRegister } from "types/UseForm";

import styles from "./CheckBox.module.scss";

type CheckBoxProps = {
  label?: string;
  register?: ReturnType<FormRegister> | {};
} & ComponentProps<"input">;

const CheckBox = ({
  label = "",
  id = "",
  register = {},
  ...props
}: CheckBoxProps) => {
  return (
    <div className={styles.field}>
      <input
        type="checkbox"
        {...(id.length > 0 && { id })}
        {...register}
        {...props}
      />
      {label.length > 0 && <label htmlFor={id}>{label}</label>}
    </div>
  );
};

export default CheckBox;

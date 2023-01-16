import { ComponentProps } from "react";
import { FormRegister } from "types/UseForm";

import styles from "./Radio.module.scss";

type RadioProps = {
  label?: string;
  register?: ReturnType<FormRegister> | {};
} & ComponentProps<"input">;

const Radio = ({
  label = "",
  id = "",
  register = {},
  ...props
}: RadioProps) => {
  return (
    <div className={styles.field}>
      <input
        type="radio"
        {...(id.length > 0 && { id })}
        {...register}
        {...props}
      />
      {label.length > 0 && <label htmlFor={id}>{label}</label>}
    </div>
  );
};

export default Radio;

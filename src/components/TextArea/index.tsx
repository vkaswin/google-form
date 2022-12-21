import { ComponentProps } from "react";
import { FormRegister } from "types/UseForm";

import styles from "./TextArea.module.scss";

type TextAreaProps = {
  register?: ReturnType<FormRegister>;
} & ComponentProps<"textarea">;

const TextArea = ({
  placeholder = "Enter Here",
  className,
  register,
  ...props
}: TextAreaProps) => {
  return (
    <textarea
      placeholder={placeholder}
      className={`${styles.field} ${className || ""}`.trim()}
      {...register}
      {...props}
    />
  );
};

export default TextArea;

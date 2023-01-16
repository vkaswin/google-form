import { ComponentProps } from "react";
import { FormRules } from "types/Form";
import { FormRegister } from "types/UseForm";

import styles from "./TextArea.module.scss";

type TextAreaProps = {
  register?: ReturnType<FormRegister>;
} & ComponentProps<"textarea">;

const TextArea = ({
  placeholder = "Enter Here",
  register,
  className,
  ...props
}: TextAreaProps) => {
  return (
    <textarea
      placeholder={placeholder}
      className={`${styles.field} ${className || ""}`.trim()}
      {...(register && register)}
      {...props}
    />
  );
};

export default TextArea;

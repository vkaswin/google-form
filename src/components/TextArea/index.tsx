import { ComponentProps } from "react";
import { FormRules } from "types/Form";
import { FormRegister } from "types/UseForm";

import styles from "./TextArea.module.scss";

type TextAreaProps = {
  name: string;
  register?: FormRegister;
  rules?: FormRules;
} & ComponentProps<"textarea">;

const TextArea = ({
  placeholder = "Enter Here",
  className,
  name,
  rules = {},
  register,
  ...props
}: TextAreaProps) => {
  return (
    <textarea
      placeholder={placeholder}
      className={`${styles.field} ${className || ""}`.trim()}
      {...(typeof register === "function" && register(name, rules))}
      {...props}
    />
  );
};

export default TextArea;

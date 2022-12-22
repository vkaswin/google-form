import { ComponentProps, useRef } from "react";
import { FormRules } from "types/Form";
import { FormRegister } from "types/UseForm";

import styles from "./Input.module.scss";

type InputProps = {
  name: string;
  rules?: FormRules | {};
  register?: FormRegister;
} & ComponentProps<"input">;

const Input = ({
  name,
  className,
  type = "text",
  placeholder = "Enter Here",
  rules = {},
  register,
  ...props
}: InputProps) => {
  let inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = (): void => {
    inputRef.current?.classList.remove(styles.blur);
    inputRef.current?.classList.add(styles.focus);
  };

  const handleBlur = (): void => {
    inputRef.current?.classList.remove(styles.focus);
    inputRef.current?.classList.add(styles.blur);
  };

  return (
    <div ref={inputRef} className={styles.field}>
      <input
        type={type}
        placeholder={placeholder}
        className={`${styles.field} ${className || ""}`.trim()}
        onFocus={handleFocus}
        {...(typeof register === "function" &&
          register(name, { ...rules, onBlur: handleBlur }))}
        {...props}
      />
    </div>
  );
};

export default Input;

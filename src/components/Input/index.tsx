import { ComponentProps, useEffect, useRef } from "react";
import { FormRegister } from "types/UseForm";

import styles from "./Input.module.scss";

type InputProps = {
  register?: ReturnType<FormRegister>;
} & ComponentProps<"input">;

const Input = ({
  className,
  type = "text",
  placeholder = "Enter Here",
  register,
  ...props
}: InputProps) => {
  let inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!inputRef.current) return;
    let inputField = inputRef.current.querySelector("input");
    if (!inputField) return;
    inputField.addEventListener("blur", handleBlur);
    return () => {
      if (!inputField) return;
      inputField.removeEventListener("blur", handleBlur);
    };
  }, []);

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
        {...(register && register)}
        {...props}
      />
    </div>
  );
};

export default Input;

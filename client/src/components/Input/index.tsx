import { ComponentProps, Fragment, useEffect, useRef, useState } from "react";
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

  let [mask, setMask] = useState(true);

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
        type={type === "password" ? (mask ? "password" : "text") : type}
        placeholder={placeholder}
        className={`${styles.field} ${
          type === "password" ? styles.space : ""
        } ${className || ""}`.trim()}
        onFocus={handleFocus}
        {...(type === "number" && {
          onWheel: (e) => (e.target as HTMLInputElement).blur(),
        })}
        {...(register && register)}
        {...props}
      />
      {type === "password" && (
        <Fragment>
          {mask ? (
            <i className="bx-hide" onClick={() => setMask(false)}></i>
          ) : (
            <i className="bx-show" onClick={() => setMask(true)}></i>
          )}
        </Fragment>
      )}
    </div>
  );
};

export default Input;

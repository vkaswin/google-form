import { ComponentProps, useRef, useEffect } from "react";
import { FormRegister } from "types/UseForm";

import styles from "./TextArea.module.scss";

type TextAreaProps = {
  register?: ReturnType<FormRegister>;
} & ComponentProps<"textarea">;

const TextArea = ({
  placeholder = "Enter Here",
  register,
  className,
  disabled = false,
  ...props
}: TextAreaProps) => {
  let inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!inputRef.current) return;
    let inputField = inputRef.current.querySelector("textarea");
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
      <textarea
        placeholder={placeholder}
        className={className || "".trim()}
        onFocus={handleFocus}
        rows={disabled ? 1 : 4}
        disabled={disabled}
        {...(register && register)}
        {...props}
      />
    </div>
  );
};

export default TextArea;

import { ComponentProps } from "react";

import styles from "./Input.module.scss";

type InputProps = {} & ComponentProps<"input">;

export const Input = ({
  className,
  type = "text",
  placeholder = "Enter Here",
  ...props
}: InputProps) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`${styles.field} ${className || ""}`.trim()}
      {...props}
    />
  );
};

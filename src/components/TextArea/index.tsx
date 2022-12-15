import { ComponentProps } from "react";

import styles from "./TextArea.module.scss";

type TextAreaProps = {} & ComponentProps<"textarea">;

const TextArea = ({
  placeholder = "Enter Here",
  className,
  ...props
}: TextAreaProps) => {
  return (
    <textarea
      placeholder={placeholder}
      className={`${styles.field} ${className || ""}`.trim()}
      {...props}
    />
  );
};

export default TextArea;
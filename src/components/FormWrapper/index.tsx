import { ComponentProps, ReactNode } from "react";

import styles from "./FormWrapper.module.scss";

type BoxProps = {
  isSelected?: boolean;
  isHeader?: boolean;
  children: ReactNode;
} & ComponentProps<"div">;

export const FormWrapper = ({
  children,
  isHeader = false,
  isSelected = false,
  className,
  ...props
}: BoxProps) => {
  return (
    <div
      {...(isHeader && { "aria-label": "header" })}
      className={`${styles.container} ${className || ""}`.trim()}
      {...props}
    >
      {!isHeader && (
        <div className={styles.drag_icon}>
          <i className="bx-dots-horizontal-rounded"></i>
          <i className="bx-dots-horizontal-rounded"></i>
        </div>
      )}
      {children}
      {isHeader && <div className={styles.indicator}></div>}
      {isSelected && <div className={styles.highlight}></div>}
    </div>
  );
};

import { ComponentPropsWithoutRef, ReactNode } from "react";

import styles from "./Box.module.scss";

type BoxProps = {
  isSelected?: boolean;
  isHeader?: boolean;
  children: ReactNode;
} & ComponentPropsWithoutRef<"div">;

export const Box = ({
  children,
  isHeader = false,
  isSelected = false,
  ...props
}: BoxProps) => {
  return (
    <div
      {...(isHeader && { "aria-label": "header" })}
      className={styles.container}
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

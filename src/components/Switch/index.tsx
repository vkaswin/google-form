import { ComponentProps } from "react";

import styles from "./Switch.module.scss";

export type SwitchProps = {} & ComponentProps<"div">;

export const Switch = ({ ...props }: SwitchProps) => {
  return (
    <div {...props}>
      <span>Switch</span>
    </div>
  );
};

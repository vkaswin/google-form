import { ComponentProps } from "react";

import styles from "./Switch.module.scss";

type SwitchProps = {} & ComponentProps<"div">;

const Switch = ({ ...props }: SwitchProps) => {
  return (
    <div {...props}>
      <span>Switch</span>
    </div>
  );
};

export default Switch;

import { ReactNode } from "react";

import styles from "./ToolTip.module.scss";

type ToolTipProps = {
  children: ReactNode;
};

export const ToolTip = ({ children }: ToolTipProps) => {
  return (
    <div>
      <span>ToolTip</span>
    </div>
  );
};

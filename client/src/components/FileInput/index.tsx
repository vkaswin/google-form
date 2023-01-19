import { ComponentProps } from "react";

import styles from "./FileInput.module.scss";

type FileInputProps = ComponentProps<"input">;

const FileInput = ({ className }: FileInputProps) => {
  return (
    <div className={`${styles.field} ${className || ""}`.trim()}>
      <input type="file" />
    </div>
  );
};

export default FileInput;

import React from "react";

import styles from "./FileInput.module.scss";

type FileInputProps = {};

const FileInput = ({}: FileInputProps) => {
  return (
    <div className={styles.filed}>
      <input type="file" />
    </div>
  );
};

export default FileInput;

import React from "react";

import styles from "./FileField.module.scss";

type FileFieldProps = {
  readOnly: boolean;
};

export const FileField = ({ readOnly }: FileFieldProps) => {
  return (
    <div>
      <span>File Field</span>
    </div>
  );
};

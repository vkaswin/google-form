import React from "react";
import { FormField } from "types/Form";

import styles from "RadioField.module.scss";

type RadioFieldProps = {
  readOnly: boolean;
} & FormField;

export const RadioField = ({
  readOnly,
  options,
  id,
  type,
  value,
  description,
  label,
  other,
  validation,
}: RadioFieldProps) => {
  return (
    <div>
      <i className="bx-circle"></i>
      <span>Radio</span>
    </div>
  );
};

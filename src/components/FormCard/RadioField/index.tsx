import React from "react";
import { Input } from "components";
import { FormField } from "types/Form";

import styles from "./RadioField.module.scss";

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
  question,
  other = "",
  validation,
}: RadioFieldProps) => {
  return (
    <div className={styles.container}>
      {options?.map((option, index) => {
        return (
          <div className={styles.option_field} key={index}>
            <i className="bx-circle"></i>
            <Input defaultValue={`Option ${index + 1}`} />
            <i className="bx-x"></i>
          </div>
        );
      })}
      {other.length !== 0 && (
        <div className={styles.option_field}>
          <i className="bx-circle"></i>
          <Input defaultValue={other} />
          <i className="bx-x"></i>
        </div>
      )}
      <div className={styles.wrapper}>
        <i className="bx-circle"></i>
        <div className={styles.add_option}>
          <div>
            <span>Add Option</span>
          </div>
          {other.length === 0 && (
            <div className={styles.other_option}>
              <span>or </span>
              <span>add "Other"</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

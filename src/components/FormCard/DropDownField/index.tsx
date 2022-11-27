import React from "react";
import { FormField } from "types/Form";
import { Input } from "components";

import styles from "./DropDownField.module.scss";

type DropDownFieldProps = {
  readOnly: boolean;
} & FormField;

export const DropDownField = ({
  readOnly,
  options,
  id,
  type,
  value,
  description,
  question,
  other = "",
  validation,
}: DropDownFieldProps) => {
  return (
    <ul className={styles.container}>
      {options?.map((option, index) => {
        return (
          <li className={styles.option_field} key={index}>
            <span>{index + 1}.</span>
            <Input defaultValue={`Option ${index + 1}`} />
            <i className="bx-x"></i>
          </li>
        );
      })}
      <li className={styles.wrapper}>
        <span>{options && options.length + 1}.</span>
        <div className={styles.add_option}>
          <div>
            <span>Add Option</span>
          </div>
        </div>
      </li>
    </ul>
  );
};

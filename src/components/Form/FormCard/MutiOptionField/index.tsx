import React, { useMemo } from "react";
import { Input } from "components";
import { FormContextType, FormField, FormIndexes } from "types/Form";

import styles from "./MultiOptionField.module.scss";

type MutiOptionFieldProps = {
  readOnly: boolean;
} & Pick<FormContextType, "handleChangeForm" | "handleDeleteOptions"> &
  FormIndexes &
  FormField;

export const MutiOptionField = ({
  readOnly,
  options,
  id,
  type,
  value,
  description,
  question,
  other = "",
  validation,
  fieldindex,
  sectionindex,
  handleChangeForm,
  handleDeleteOptions,
}: MutiOptionFieldProps) => {
  let icon = useMemo<string>(() => {
    switch (type) {
      case "checkbox":
        return "bx-square";
      case "radio":
        return "bx-circle";
      default:
        return "";
    }
  }, [type]);

  return (
    <div className={styles.container}>
      {options?.map((option, index) => {
        return (
          <div className={styles.option_field} key={index}>
            {type === "dropdown" ? (
              <span>{index + 1}.</span>
            ) : (
              <i className={icon}></i>
            )}
            <Input
              data-name="options"
              data-type={type}
              data-fieldindex={fieldindex}
              data-sectionindex={sectionindex}
              data-optionindex={index}
              value={option}
              onChange={handleChangeForm}
            />
            <i
              className="bx-x"
              onClick={() =>
                handleDeleteOptions(sectionindex, fieldindex, index.toString())
              }
            ></i>
          </div>
        );
      })}
      {type !== "dropdown" && other.length !== 0 && (
        <div className={styles.option_field}>
          <i className={icon}></i>
          <Input
            data-name="other"
            data-type={type}
            data-fieldindex={fieldindex}
            data-sectionindex={sectionindex}
            value={other}
            onChange={handleChangeForm}
          />
          <i className="bx-x"></i>
        </div>
      )}
      <div className={styles.wrapper}>
        {type === "dropdown" ? (
          <span>{options && options.length + 1}.</span>
        ) : (
          <i className={icon}></i>
        )}
        <div className={styles.add_option}>
          <div>
            <span>Add Option</span>
          </div>
          {type !== "dropdown" && other.length === 0 && (
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

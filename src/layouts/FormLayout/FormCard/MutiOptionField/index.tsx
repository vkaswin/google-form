import { useMemo } from "react";
import {
  FormField,
  FormIndexes,
  HandleFormAction,
  HandleFormChange,
} from "types/Form";
import Input from "components/Input";

import styles from "./MultiOptionField.module.scss";

type MutiOptionFieldProps = {
  isEditPage: boolean;
  field: FormField;
  indexes: Omit<FormIndexes, "optionIndex">;
  handleFormAction: HandleFormAction;
  handleFormChange: HandleFormChange;
};

const MutiOptionField = ({
  field: { id, type, value, description, question, options, other, required },
  isEditPage,
  indexes,
  handleFormChange,
  handleFormAction,
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
              value={option}
              onChange={(e) =>
                handleFormChange({
                  key: "options",
                  value: e.target.value,
                  type,
                  indexes: { ...indexes, optionIndex: index },
                })
              }
            />
            <i
              className="bx-x"
              style={{ visibility: index === 0 ? "hidden" : "visible" }}
              onClick={() =>
                handleFormAction("delete-option", {
                  ...indexes,
                  optionIndex: index,
                })
              }
            ></i>
          </div>
        );
      })}
      {other?.enabled && (
        <div className={styles.option_field}>
          <i className={icon}></i>
          <Input
            placeholder="Other..."
            disabled={isEditPage}
            value={other.value}
            onChange={(e) =>
              handleFormChange({
                key: "other",
                value: e.target.value,
                type,
                indexes,
              })
            }
            {...(!isEditPage && { value: other.value })}
          />
          <i
            className="bx-x"
            onClick={() => handleFormAction("other", indexes)}
          ></i>
        </div>
      )}
      <div className={styles.wrapper}>
        {type === "dropdown" ? (
          <span>{options && options.length + 1}.</span>
        ) : (
          <i className={icon}></i>
        )}
        <div className={styles.add_option}>
          <div onClick={() => handleFormAction("add-option", indexes)}>
            <span>Add Option</span>
          </div>
          {type !== "dropdown" && other && !other.enabled && (
            <div
              className={styles.other_option}
              onClick={() => handleFormAction("other", indexes)}
            >
              <span>or </span>
              <span>add "Other"</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MutiOptionField;

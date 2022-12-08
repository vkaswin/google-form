import { Fragment, ReactNode, useMemo } from "react";
import {
  FormField,
  FormIndexes,
  FormPages,
  HandleFormAction,
  HandleFormChange,
} from "types/Form";
import Input from "components/Input";
import Radio from "components/Radio";
import CheckBox from "components/CheckBox";
import Select from "components/Select";

import styles from "./MultiOptionField.module.scss";

type MutiOptionFieldProps = {
  field: FormField;
  formPage: FormPages;
  indexes: Omit<FormIndexes, "optionIndex">;
  handleFormAction: HandleFormAction;
  handleFormChange: HandleFormChange;
};

const MutiOptionField = ({
  field: { id, type, value, description, question, options, other, required },
  formPage,
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
      {formPage.isEdit &&
        options?.map((option, index) => {
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
                    type,
                    indexes: { ...indexes, optionIndex: index },
                    key: "options",
                    value: e.target.value,
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
      {!formPage.isEdit &&
        type === "checkbox" &&
        options?.map((option, index) => {
          return (
            <CheckBox
              key={index}
              id={id + index}
              label={option}
              value={option}
              checked={Array.isArray(value) && value.includes(option)}
              onChange={(e) =>
                handleFormChange({
                  type,
                  indexes,
                  key: "value",
                  value: e.target.value,
                  checked: e.target.checked,
                })
              }
            />
          );
        })}
      {!formPage.isEdit &&
        type === "radio" &&
        options?.map((option, index) => {
          return (
            <Radio
              key={index}
              id={id + index}
              name={id}
              label={option}
              value={option}
              checked={value === option}
              onChange={(e) =>
                handleFormChange({
                  type,
                  indexes,
                  key: "value",
                  value: e.target.value,
                  checked: e.target.checked,
                })
              }
            />
          );
        })}
      {!formPage.isEdit && type === "dropdown" && <Select />}
      {other?.enabled && (
        <div className={styles.option_field}>
          {formPage.isEdit && <i className={icon}></i>}
          {!formPage.isEdit && type === "checkbox" && (
            <CheckBox
              label="Other"
              checked={other.checked}
              onChange={(e) =>
                handleFormChange({
                  type,
                  indexes,
                  key: "other",
                  value: e.target.value,
                  checked: e.target.checked,
                })
              }
            />
          )}
          {!formPage.isEdit && type === "radio" && (
            <Radio
              name={id}
              label="Other"
              checked={other.checked}
              onChange={(e) =>
                handleFormChange({
                  type,
                  indexes,
                  key: "other",
                  value: e.target.value,
                  checked: e.target.checked,
                })
              }
            />
          )}
          <Input
            placeholder="Other..."
            disabled={formPage.isEdit}
            value={!formPage.isEdit ? other.value : ""}
            onChange={(e) =>
              handleFormChange({
                indexes,
                key: "other",
                type: "input",
                value: e.target.value,
              })
            }
          />
          {formPage.isEdit && (
            <i
              className="bx-x"
              onClick={() => handleFormAction("other", indexes)}
            ></i>
          )}
        </div>
      )}
      {formPage.isEdit && (
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
      )}
    </div>
  );
};

export default MutiOptionField;

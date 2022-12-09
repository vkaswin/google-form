import { Fragment, useMemo } from "react";
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
import { debounce } from "helpers/index";

import styles from "./MultiOptionField.module.scss";

type MutiOptionFieldProps = {
  field: FormField;
  formPage: FormPages;
  indexes: Omit<FormIndexes, "optionIndex">;
  handleFormAction: HandleFormAction;
  handleFormChange: HandleFormChange;
};

type DropDownOption = { label: string; value: string };

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

  let dropdownOptions = useMemo<DropDownOption[] | undefined>(() => {
    if (type !== "dropdown") return;

    return options?.map((option) => {
      return { label: option, value: option };
    });
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
                defaultValue={option}
                onChange={debounce(
                  (e) =>
                    handleFormChange({
                      indexes: { ...indexes, optionIndex: index },
                      type: type,
                      key: "options",
                      value: e.target.value,
                    }),
                  500
                )}
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
      {!formPage.isEdit && type === "dropdown" && (
        <Select
          className={styles.select_field}
          size="auto"
          options={dropdownOptions}
          value={typeof value === "string" ? value : ""}
          onChange={(value) =>
            handleFormChange({ indexes, type, value, key: "value" })
          }
        />
      )}
      {other?.enabled && (
        <Fragment>
          <div className={styles.option_field}>
            {formPage.isEdit && <i className={icon}></i>}
            {!formPage.isEdit && type === "checkbox" && (
              <CheckBox
                id="checkbox-other-option"
                placeholder="Enter here"
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
                id="radio-other-option"
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
              placeholder={formPage.isEdit ? "Other..." : "Enter here"}
              disabled={formPage.isEdit}
              defaultValue={!formPage.isEdit ? other.value : ""}
              onChange={debounce(
                (e) =>
                  handleFormChange({
                    indexes,
                    type: "input",
                    key: "other",
                    value: e.target.value,
                  }),
                500
              )}
            />
            {formPage.isEdit && (
              <i
                className="bx-x"
                onClick={() => handleFormAction("other", indexes)}
              ></i>
            )}
          </div>
          {other.error && (
            <span className={styles.error_msg}>Other field is Required</span>
          )}
        </Fragment>
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

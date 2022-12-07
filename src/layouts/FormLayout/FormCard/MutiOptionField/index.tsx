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

  let field = useMemo<ReactNode>(() => {
    if (formPage.isEdit) return null;

    switch (type) {
      case "checkbox":
        return <CheckBox />;
      case "radio":
        return <Radio />;
      case "dropdown":
        return <Select />;
      default:
        return null;
    }
  }, [formPage]);

  const otherField = useMemo<ReactNode>(() => {
    switch (type) {
      case "checkbox":
        return <CheckBox />;
      case "radio":
        return <Radio />;
      default:
        return null;
    }
  }, [formPage]);

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
                name="options"
                onChange={(e) =>
                  handleFormChange(e, {
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
      {!formPage.isEdit &&
        type === "checkbox" &&
        options?.map((option, index) => {
          return (
            <CheckBox
              key={index}
              id={id + index}
              name="value"
              label={option}
              value={option}
              checked={Array.isArray(value) && value.includes(option)}
              onChange={(e) =>
                handleFormChange(e, {
                  type,
                  indexes,
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
              name="value"
              label={option}
              value={option}
              radioGroup={id}
              checked={value === option}
              onChange={(e) =>
                handleFormChange(e, {
                  type,
                  indexes,
                })
              }
            />
          );
        })}
      {!formPage.isEdit && type === "dropdown" && <Fragment>DropDown</Fragment>}
      {other?.enabled && (
        <div className={styles.option_field}>
          {formPage.isEdit && <i className={icon}></i>}
          {!formPage.isEdit && type === "checkbox" && (
            <CheckBox
              label="Other"
              checked={other.checked}
              onChange={(e) => handleFormChange(e, { type, indexes })}
            />
          )}
          {!formPage.isEdit && type === "radio" && (
            <Radio
              name="other"
              label="Other"
              radioGroup={id}
              checked={other.checked}
              onChange={(e) => handleFormChange(e, { type, indexes })}
            />
          )}
          <Input
            placeholder="Other..."
            name="other"
            disabled={formPage.isEdit}
            onChange={(e) =>
              handleFormChange(e, {
                type,
                indexes,
              })
            }
            {...(!formPage.isEdit && { value: other.value })}
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

import { Fragment, useMemo, useState } from "react";
import { FormField, FormIndexes, FormPages } from "types/Form";
import Input from "components/Input";
import Radio from "components/Radio";
import CheckBox from "components/CheckBox";
import Select from "components/Select";
import { useFormContext } from "context/form";

import styles from "./MultiOptions.module.scss";

type DropDownOption = { label: string; value: string };

type MultiOptionsProps = { formPage: FormPages } & FormField & FormIndexes;

const MultiOptions = ({
  id,
  type,
  options,
  other,
  rules,
  sectionIndex,
  fieldIndex,
  formPage: { isEdit },
}: MultiOptionsProps) => {
  const { register, setValue, clearValue, watch, formValues, formErrors } =
    useFormContext();

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
  }, [type, options]);

  const name = `sections.${sectionIndex}.fields.${fieldIndex}.value`;
  const field = register(name, rules);
  const value = formValues.sections[sectionIndex].fields[fieldIndex].value;

  const handleOtherOption = () => {
    if (!other) return;

    setValue(
      `sections.${sectionIndex}.fields.${fieldIndex}.other.enabled`,
      !other.enabled
    );
  };

  return (
    <div className={styles.container}>
      {isEdit ? (
        <Fragment>
          {options?.map((option, index) => {
            let errorMsg =
              formErrors?.sections?.[sectionIndex]?.fields?.[fieldIndex]
                ?.options?.[index];
            return (
              <div key={index} className={styles.option_field}>
                <div>
                  {type === "dropdown" ? (
                    <span>{index + 1}.</span>
                  ) : (
                    <i className={icon}></i>
                  )}
                  <Input
                    defaultValue={option}
                    register={register(
                      `sections.${sectionIndex}.fields.${fieldIndex}.options.${index}`,
                      { required: true }
                    )}
                  />
                  <i
                    className="bx-x"
                    style={{ visibility: index === 0 ? "hidden" : "visible" }}
                    onClick={() =>
                      clearValue(
                        `sections.${sectionIndex}.fields.${fieldIndex}.options.${index}`
                      )
                    }
                  ></i>
                </div>
                <div>
                  {errorMsg && (
                    <span className={styles.error_msg}>{errorMsg}</span>
                  )}
                </div>
              </div>
            );
          })}
        </Fragment>
      ) : (
        <Fragment>
          {(type === "checkbox" || type === "radio") &&
            options?.map((option, index) => {
              let props = {
                key: index,
                id: `${id}${index}`,
                label: option,
                value: option,
                register: field,
                defaultChecked:
                  type === "checkbox"
                    ? Array.isArray(value) && value.includes(option)
                    : value === option,
              };

              const Component = type === "checkbox" ? CheckBox : Radio;

              return <Component {...props} />;
            })}
          {type === "dropdown" && (
            <Select
              className={styles.select_field}
              size="auto"
              options={dropdownOptions}
              value={(!Array.isArray(value) && value) || ""}
              register={field}
              onChange={(value) => setValue(name, value)}
            />
          )}
        </Fragment>
      )}
      {other?.enabled && (
        <Fragment>
          <div className={styles.option_field}>
            {isEdit ? (
              <div>
                <i className={icon}></i>
                <Input placeholder="Other..." disabled />
                <i className="bx-x" onClick={handleOtherOption}></i>
              </div>
            ) : (
              <div>
                {type === "checkbox" && (
                  <CheckBox
                    id="checkbox-other-option"
                    placeholder="Enter here"
                    label="Other"
                    defaultChecked={other.checked}
                    value="Other"
                    register={field}
                  />
                )}
                {type === "radio" && (
                  <Radio
                    id="radio-other-option"
                    label="Other"
                    defaultChecked={other.checked}
                    value="Other"
                    register={field}
                  />
                )}
                <Input
                  placeholder="Enter here"
                  register={register(
                    `sections.${sectionIndex}.fields.${fieldIndex}.other.value`
                  )}
                />
              </div>
            )}
          </div>
        </Fragment>
      )}
      {isEdit && (
        <div className={styles.wrapper}>
          {type === "dropdown" ? (
            <span>{options && options.length + 1}.</span>
          ) : (
            <i className={icon}></i>
          )}
          <div className={styles.add_option}>
            <div
              onClick={() =>
                setValue(
                  `sections.${sectionIndex}.fields.${fieldIndex}.options.${options?.length} `,
                  `Option ${options && options?.length + 1}`
                )
              }
            >
              <span>Add Option</span>
            </div>
            {type !== "dropdown" && other && !other.enabled && (
              <div
                className={styles.other_option}
                onClick={() =>
                  setValue(
                    `sections.${sectionIndex}.fields.${fieldIndex}.other.enabled`,
                    !other.enabled
                  )
                }
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

export default MultiOptions;

import { Fragment, useMemo } from "react";
import { FormDetail, FormField, FormIndexes, FormPages } from "types/Form";
import Input from "components/Input";
import Radio from "components/Radio";
import CheckBox from "components/CheckBox";
import Select from "components/Select";
import { useFormContext } from "hooks/useForm";

import styles from "./MultiOptionField.module.scss";

type MutiOptionFieldProps = {
  field: FormField;
  formPage: FormPages;
} & FormIndexes;

type DropDownOption = { label: string; value: string };

const MutiOptionField = ({
  field: { id, type, value, description, question, options, other, required },
  formPage,
  sectionIndex,
  fieldIndex,
}: MutiOptionFieldProps) => {
  const { register, setValue, clearValue, formErrors } =
    useFormContext<FormDetail>();

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

  let otherErrorMsg =
    formErrors?.sections?.[sectionIndex]?.fields?.[fieldIndex]?.other?.value;

  const handleOtherOption = () => {
    if (!other) return;

    setValue(
      `sections.${sectionIndex}.fields.${fieldIndex}.other.enabled`,
      !other.enabled
    );
  };

  return (
    <div className={styles.container}>
      {formPage.isEdit &&
        options?.map((option, index) => {
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
      {!formPage.isEdit &&
        type === "checkbox" &&
        options?.map((option, index) => {
          return (
            <CheckBox
              key={index}
              id={id + index}
              label={option}
              value={option}
              defaultChecked={Array.isArray(value) && value.includes(option)}
              register={register(
                `sections.${sectionIndex}.fields.${fieldIndex}.value`
              )}
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
              defaultChecked={value === option}
              register={register(
                `sections.${sectionIndex}.fields.${fieldIndex}.value`
              )}
            />
          );
        })}
      {!formPage.isEdit && type === "dropdown" && (
        <Select
          className={styles.select_field}
          size="auto"
          options={dropdownOptions}
          value={typeof value === "string" ? value : ""}
          //   onChange={(value) =>
          //     handleFormChange({ indexes, type, value, key: "value" })
          //   }
        />
      )}
      {other?.enabled && (
        <Fragment>
          <div className={styles.option_field}>
            <div>
              {formPage.isEdit && <i className={icon}></i>}
              {!formPage.isEdit && type === "checkbox" && (
                <CheckBox
                  id="checkbox-other-option"
                  placeholder="Enter here"
                  label="Other"
                  checked={other.checked}
                  register={register(
                    `sections.${sectionIndex}.fields.${fieldIndex}.other.checked`
                  )}
                />
              )}
              {!formPage.isEdit && type === "radio" && (
                <Radio
                  id="radio-other-option"
                  name={id}
                  label="Other"
                  checked={other.checked}
                  register={register(
                    `sections.${sectionIndex}.fields.${fieldIndex}.other.checked`
                  )}
                />
              )}
              <Input
                placeholder={formPage.isEdit ? "Other..." : "Enter here"}
                disabled={formPage.isEdit}
                defaultValue={!formPage.isEdit ? other.value : ""}
                register={register(
                  `sections.${sectionIndex}.fields.${fieldIndex}.other.value`
                )}
              />
              {formPage.isEdit && (
                <i className="bx-x" onClick={handleOtherOption}></i>
              )}
            </div>
          </div>
          <div>
            {otherErrorMsg && (
              <span className={styles.error_msg}>{otherErrorMsg}</span>
            )}
          </div>
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
            <div
              onClick={() =>
                setValue(
                  `sections.${sectionIndex}.fields.${fieldIndex}.options.${options?.length} `,
                  `Option ${Array.isArray(options) && options.length + 1}`
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

export default MutiOptionField;

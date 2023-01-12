import { Fragment, useMemo } from "react";
import { FormField, FormIndexes } from "types/Form";
import Input from "components/Input";
import { useFormContext } from "context/form";

import styles from "./MultiOptions.module.scss";

type MultiOptionsProps = FormField & FormIndexes;

const MultiOptions = ({
  id,
  type,
  options,
  other,
  rules,
  sectionIndex,
  fieldIndex,
}: MultiOptionsProps) => {
  const { register, setValue, clearValue, formErrors } = useFormContext();

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

  const handleOtherOption = () => {
    if (!other) return;

    setValue(
      `sections.${sectionIndex}.fields.${fieldIndex}.other.enabled`,
      !other.enabled
    );
  };

  return (
    <div className={styles.container}>
      {options?.map((option, index) => {
        let errorMsg =
          formErrors?.sections?.[sectionIndex]?.fields?.[fieldIndex]?.options?.[
            index
          ];

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
              {errorMsg && <span className={styles.error_msg}>{errorMsg}</span>}
            </div>
          </div>
        );
      })}
      {other?.enabled && (
        <Fragment>
          <div className={styles.option_field}>
            <div>
              <i className={icon}></i>
              <Input placeholder="Other..." disabled />
              <i className="bx-x" onClick={handleOtherOption}></i>
            </div>
          </div>
        </Fragment>
      )}
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
    </div>
  );
};

export default MultiOptions;

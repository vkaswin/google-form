import {
  ComponentProps,
  Fragment,
  ReactNode,
  useMemo,
  Dispatch,
  SetStateAction,
} from "react";
import {
  FormTypeOption,
  FormField as FormFieldType,
  FormIndexes,
  FormPages,
} from "types/Form";
import TextArea from "components/TextArea";
import Input from "components/Input";
import TextEditor from "components/TextEditor";
import DatePicker from "components/DatePicker";
import ToolTip from "components/ToolTip";
import FileInput from "components/FileInput";
import MutiOptions from "./MutiOptions";
import FormType from "./FormType";
import Switch from "components/Switch";
import { useFormContext } from "context/form";

import styles from "./Field.module.scss";

type FieldProps = {
  selectedId?: string | null;
  field: FormFieldType;
  formPage: FormPages;
  setDragId?: Dispatch<SetStateAction<string | null>>;
} & FormIndexes &
  ComponentProps<"div">;

let formTypes: FormTypeOption[] = [
  { type: "input", icon: "bx-text", label: "Short answer" },
  { type: "textarea", icon: "bx-paragraph", label: "Paragraph" },
  { type: "checkbox", icon: "bx-checkbox-checked", label: "Checkboxes" },
  {
    type: "radio",
    icon: "bx-radio-circle-marked",
    label: "Multiple Choices",
  },
  { type: "dropdown", icon: "bx-down-arrow-circle", label: "Dropdown" },
  { type: "date", icon: "bx-calendar", label: "Date" },
  { type: "file", icon: "bx-cloud-upload", label: "File Upload" },
];

const formRules = [
  {
    label: "Pattern",
    name: "pattern",
  },
  {
    label: "MinLength",
    name: "minLength",
    type: "number",
  },
  {
    label: "MaxLength",
    name: "maxLength",
    type: "number",
  },
  {
    label: "Min",
    name: "min",
  },
  {
    label: "Max",
    name: "max",
  },
];

const Field = ({
  field,
  selectedId,
  sectionIndex,
  fieldIndex,
  className,
  formPage,
  setDragId,
  ...props
}: FieldProps) => {
  const { register, clearValue, setValue, formErrors, formValues } =
    useFormContext();

  let { isEdit } = formPage;

  let selectedOption = useMemo<FormTypeOption | undefined>(() => {
    return formTypes.find((option) => {
      return option.type === field.type;
    });
  }, [field.type]);

  const error =
    formErrors?.sections?.[sectionIndex]?.fields?.[fieldIndex]?.value;
  const name = `sections.${sectionIndex}.fields.${fieldIndex}.value`;
  const registerField = register(name, field.rules);

  let component = useMemo<ReactNode>(() => {
    if (
      field.type === "checkbox" ||
      field.type === "radio" ||
      field.type === "dropdown"
    ) {
      return (
        <MutiOptions
          sectionIndex={sectionIndex}
          fieldIndex={fieldIndex}
          formPage={formPage}
          {...field}
        />
      );
    } else if (field.type === "input") {
      return (
        <Input
          placeholder="Short answer text"
          defaultValue={field.value}
          register={registerField}
          {...(isEdit ? { disabled: true } : { register: registerField })}
        />
      );
    } else if (field.type === "textarea") {
      return (
        <TextArea
          placeholder="Long answer text"
          defaultValue={field.value}
          {...(isEdit ? { disabled: true } : { register: registerField })}
        />
      );
    } else if (field.type === "date") {
      return (
        <DatePicker
          placeholder="Month, day, year"
          value={field.value || ""}
          onChange={(value) => setValue(name, value)}
          {...(isEdit ? { disabled: true } : { register: registerField })}
        />
      );
    } else if (field.type === "file") {
      return <FileInput />;
    } else {
      return null;
    }
  }, [{ ...field }]);

  const handleDuplicate = (sectionIndex: number) => {
    setValue(
      `sections.${sectionIndex}.fields.${formValues.sections[sectionIndex].fields.length}`,
      field
    );
  };

  return (
    <div
      className={`${styles.container} ${className || ""}`.trim()}
      {...(!isEdit && { "data-error": !!error })}
      {...props}
    >
      <div className={styles.wrapper}>
        {isEdit ? (
          <Fragment>
            <div className={styles.field_label}>
              <TextEditor
                as="div"
                placeholder="Question"
                defaultValue={field.title}
                register={register(
                  `sections.${sectionIndex}.fields.${fieldIndex}.title`
                )}
              />
              {selectedId === field.id && (
                <FormType
                  id={field.id}
                  options={formTypes}
                  sectionIndex={sectionIndex}
                  fieldIndex={fieldIndex}
                  selectedOption={selectedOption}
                  onChange={setValue}
                />
              )}
            </div>
            {field.description && (
              <div className={styles.field_description}>
                <TextEditor
                  as="div"
                  placeholder="Description"
                  defaultValue={field.description}
                  register={register(
                    `sections.${sectionIndex}.fields.${fieldIndex}.description`
                  )}
                />
              </div>
            )}
          </Fragment>
        ) : (
          <Fragment>
            <div className={styles.field_label}>
              <span>{field.title}</span>
              {field.rules.required?.value && (
                <span className={styles.asterisk}>*</span>
              )}
            </div>
            {field.description && (
              <div
                dangerouslySetInnerHTML={{ __html: field.description }}
                className={styles.field_description}
              ></div>
            )}
          </Fragment>
        )}
        <div className={styles.field} data-type={field.type}>
          {component}
          {!isEdit && error && (
            <div className={styles.error_msg}>
              <i className="bx-error-circle"></i>
              <span>{error}</span>
            </div>
          )}
        </div>
        {isEdit && selectedId === field.id && (
          <Fragment>
            <div className={styles.footer}>
              <i
                id={`trash-${field.id}`}
                className="bx-trash"
                onClick={() =>
                  clearValue(`sections.${sectionIndex}.fields.${fieldIndex}`)
                }
              ></i>
              <ToolTip selector={`#trash-${field.id}`}>Trash</ToolTip>
              <i
                id={`duplicate-${field.id}`}
                className="bx-duplicate"
                onClick={() => handleDuplicate(sectionIndex)}
              ></i>
              <ToolTip selector={`#duplicate-${field.id}`}>Duplicate</ToolTip>
              <div className={styles.split}></div>
              <Switch
                id={field.id}
                label="Required"
                defaultChecked={field.rules.required?.value || false}
                register={register(
                  `sections.${sectionIndex}.fields.${fieldIndex}.rules.required.value`
                )}
              />
            </div>
            {field.type === "input" ||
              field.type === "textarea" ||
              (field.type === "date" && (
                <div className={styles.rules}>
                  {formRules.map(({ label, name, type }, index) => {
                    return (
                      <div key={index} className={styles.rule_field}>
                        <div>
                          <label>{label}</label>
                          <Input
                            placeholder="Enter here"
                            register={register(
                              `sections.${sectionIndex}.fields.${fieldIndex}.rules.${name}.value`
                            )}
                            {...(type && { type })}
                          />
                        </div>
                        <div>
                          <label>Error Message</label>
                          <Input
                            placeholder="Enter here"
                            register={register(
                              `sections.${sectionIndex}.fields.${fieldIndex}.rules.${name}.message`
                            )}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            <div className={styles.highlight}></div>
          </Fragment>
        )}

        {isEdit && (
          <div
            className={styles.drag_icon}
            onPointerDown={() => setDragId?.(field.id)}
          >
            <i className="bx-dots-horizontal-rounded"></i>
            <i className="bx-dots-horizontal-rounded"></i>
          </div>
        )}
      </div>
    </div>
  );
};

export default Field;

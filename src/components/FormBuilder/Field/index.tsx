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
  HandleFormAction,
  FormActions,
  FormIcon,
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

const icons: FormIcon[] = [
  {
    label: "Add new field",
    name: "add",
    icon: "bx-add-to-queue",
    action: "add-field",
  },
  {
    label: "Add new section",
    name: "section",
    icon: "bx-git-branch",
    action: "add-section",
  },
  {
    label: "Duplicate",
    name: "duplicate",
    icon: "bx-duplicate",
    action: "duplicate-field",
  },
  {
    label: "Delete",
    name: "delete",
    icon: "bx-trash",
    action: "delete-field",
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

  const handleFormAction: HandleFormAction = ({
    fieldIndex,
    sectionIndex,
    action,
  }) => {
    let field;

    if (action === "add-section" || action === "add-field") {
      field = {
        id: crypto.randomUUID(),
        title: "",
        type: "radio",
        options: ["Option 1"],
        other: {
          enabled: false,
          checked: false,
          value: "",
        },
        description: "",
        rules: {
          required: { value: false },
        },
        value: "",
      };
    }

    switch (action) {
      case "delete-field":
        clearValue(`sections.${sectionIndex}.fields.${fieldIndex}`);
        break;

      case "duplicate-field":
        setValue(
          `sections.${sectionIndex}.fields.${formValues.sections[sectionIndex].fields.length}`,
          field
        );
        break;

      case "add-section":
        setValue(`sections.${formValues.sections.length}`, {
          id: crypto.randomUUID(),
          title: "",
          description: "",
          fields: [field],
        });
        break;

      case "add-field":
        setValue(
          `sections.${sectionIndex}.fields.${
            formValues.sections[sectionIndex].fields.length - 1
          }`,
          field
        );
        break;

      default:
        return;
    }
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
              {icons.map(({ icon, name, action, label }, index) => {
                return (
                  <Fragment key={index}>
                    <i
                      id={`${name}-${field.id}`}
                      className={icon}
                      onClick={() =>
                        handleFormAction({ sectionIndex, fieldIndex, action })
                      }
                    ></i>
                    <ToolTip selector={`#${name}-${field.id}`}>{label}</ToolTip>
                  </Fragment>
                );
              })}
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

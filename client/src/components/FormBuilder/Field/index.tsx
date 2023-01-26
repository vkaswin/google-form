import {
  ComponentProps,
  Fragment,
  ReactNode,
  useMemo,
  Dispatch,
  SetStateAction,
  MutableRefObject,
} from "react";
import {
  FormTypeOption,
  FormField as FormFieldType,
  FormIndexes,
  FormPages,
  HandleFormAction,
  FormIcon,
  FormField,
} from "types/Form";
import TextArea from "components/TextArea";
import Input from "components/Input";
import TextEditor from "components/TextEditor";
import ToolTip from "components/ToolTip";
import Rating from "components/Rating";
import Switch from "components/Switch";
import FileInput from "components/FileInput";
import MutiOptions from "./MutiOptions";
import FormType from "./FormType";
import { useFormContext } from "context/form";

import styles from "./Field.module.scss";

type FieldProps = {
  selectedId?: string | null;
  field: FormFieldType;
  formPage: FormPages;
  focusFieldId: MutableRefObject<string | null>;
  fieldId: string;
  isSelected: Boolean;
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
  {
    type: "rating",
    icon: "bx-star",
    label: "Rating",
  },
];

const formRules = [
  {
    label: "Pattern",
    name: "pattern",
    type: "text",
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
    type: "text",
  },
  {
    label: "Max",
    name: "max",
    type: "text",
  },
] as const;

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
  focusFieldId,
  isSelected,
  fieldId,
  setDragId,
  ...props
}: FieldProps) => {
  const { register, clearValue, setValue, setFormData, formErrors, formData } =
    useFormContext();

  let { isEdit } = formPage;

  let selectedOption = useMemo<FormTypeOption | undefined>(() => {
    return formTypes.find((option) => {
      return option.type === field.fieldType;
    });
  }, [field.fieldType]);

  const error =
    formErrors?.sections?.[sectionIndex]?.fields?.[fieldIndex]?.response;
  const name = `sections.${sectionIndex}.fields.${fieldIndex}.response`;
  const registerField = register(name, field.rules);

  let component = useMemo<ReactNode>(() => {
    if (
      field.fieldType === "checkbox" ||
      field.fieldType === "radio" ||
      field.fieldType === "dropdown"
    ) {
      return (
        <MutiOptions
          sectionIndex={sectionIndex}
          fieldIndex={fieldIndex}
          formPage={formPage}
          fieldId={fieldId}
          {...field}
        />
      );
    } else if (field.fieldType === "input") {
      return (
        <Input
          type={
            field.rules?.max?.value || field.rules?.min?.value
              ? "number"
              : "text"
          }
          placeholder="Short answer text"
          defaultValue={field.response}
          register={registerField}
          {...(isEdit ? { disabled: true } : { register: registerField })}
        />
      );
    } else if (field.fieldType === "textarea") {
      return (
        <TextArea
          placeholder="Long answer text"
          defaultValue={field.response}
          {...(isEdit ? { disabled: true } : { register: registerField })}
        />
      );
    } else if (field.fieldType === "date") {
      return (
        <Input
          type="date"
          placeholder="Month, day, year"
          defaultValue={field.response}
          {...(isEdit
            ? { disabled: true }
            : {
                register: registerField,
              })}
        />
      );
    } else if (field.fieldType === "file") {
      return <FileInput />;
    } else if (field.fieldType === "rating") {
      return (
        <Rating
          {...(field.response && {
            rating: !Array.isArray(field.response)
              ? parseInt(field.response)
              : 0,
          })}
          {...(isEdit
            ? { disabled: true }
            : {
                register: registerField,
                onChange: (rating) => setValue(name, rating),
              })}
        />
      );
    } else {
      return null;
    }
  }, [
    field,
    fieldId,
    fieldIndex,
    formPage,
    isEdit,
    name,
    registerField,
    sectionIndex,
    setValue,
  ]);

  const handleFormAction: HandleFormAction = ({
    fieldIndex,
    sectionIndex,
    action,
  }) => {
    if (action === "delete-field") {
      clearValue(`sections.${sectionIndex}.fields.${fieldIndex}`);
    } else if (action === "duplicate-field") {
      let formField = JSON.parse(JSON.stringify(field)) as FormField;
      focusFieldId.current = `${sectionIndex}${fieldIndex + 1}`;
      let form = { ...formData };
      form.sections[sectionIndex].fields.splice(fieldIndex + 1, 0, formField);
      setFormData(form);
    } else if (action === "add-field" || action === "add-section") {
      let field = {
        title: "",
        fieldType: "radio",
        options: ["Option 1"],
        other: false,
        description: "",
        rules: {
          required: { value: false },
        },
      };

      if (action === "add-field") {
        let fieldIndex = formData.sections[sectionIndex].fields.length;
        focusFieldId.current = `${fieldIndex}`;
        setValue(`sections.${sectionIndex}.fields.${fieldIndex}`, field);
      } else {
        let section = {
          title: "",
          description: "",
          fields: [field],
        };
        focusFieldId.current = `${formData.sections.length}`;
        setValue(`sections.${formData.sections.length}`, section);
      }
    }
  };

  const handleFormType = (value: string) => {
    setValue(`sections.${sectionIndex}.fields.${fieldIndex}.fieldType`, value);
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
            <div data-edit className={styles.field_label}>
              <TextEditor
                as="div"
                placeholder="Question"
                defaultValue={field.title}
                register={register(
                  `sections.${sectionIndex}.fields.${fieldIndex}.title`
                )}
              />
              {isSelected && (
                <FormType
                  id={fieldId}
                  options={formTypes}
                  sectionIndex={sectionIndex}
                  fieldIndex={fieldIndex}
                  selectedOption={selectedOption}
                  onChange={handleFormType}
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
        <div className={styles.field} data-type={field.fieldType}>
          {component}
          {!isEdit && error && (
            <div className={styles.error_msg}>
              <i className="bx-error-circle"></i>
              <span>{error}</span>
            </div>
          )}
        </div>
        {isEdit && isSelected && (
          <Fragment>
            <div className={styles.footer}>
              {icons.map(({ icon, name, action, label }, index) => {
                return (
                  <Fragment key={index}>
                    <i
                      id={`${name}-${fieldId}`}
                      className={icon}
                      onClick={() =>
                        handleFormAction({ sectionIndex, fieldIndex, action })
                      }
                    ></i>
                    <ToolTip selector={`#${name}-${fieldId}`}>{label}</ToolTip>
                  </Fragment>
                );
              })}
              <div className={styles.split}></div>
              <Switch
                id={fieldId}
                label="Required"
                value=""
                defaultChecked={field.rules.required?.value || false}
                register={register(
                  `sections.${sectionIndex}.fields.${fieldIndex}.rules.required.value`
                )}
              />
            </div>
            {(field.fieldType === "input" ||
              field.fieldType === "textarea") && (
              <div className={styles.rules}>
                {formRules.map(({ label, name, type }, index) => {
                  return (
                    <div key={index} className={styles.rule_field}>
                      <div>
                        <label>{label}</label>
                        <Input
                          defaultValue={
                            formData?.sections?.[sectionIndex]?.fields?.[
                              fieldIndex
                            ]?.rules?.[name]?.value as string
                          }
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
                          defaultValue={
                            formData?.sections?.[sectionIndex]?.fields?.[
                              fieldIndex
                            ]?.rules?.[name]?.message as string
                          }
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
            )}
            <div className={styles.highlight}></div>
          </Fragment>
        )}
        {isEdit && (
          <div
            className={styles.drag_icon}
            onPointerDown={() => setDragId?.(fieldId)}
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

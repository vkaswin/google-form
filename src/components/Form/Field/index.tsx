import {
  ComponentProps,
  Fragment,
  ReactNode,
  useMemo,
  Dispatch,
  SetStateAction,
  MouseEvent,
} from "react";
import {
  FormTypeOption,
  FormField as FormFieldType,
  FormPages,
  FormIndexes,
  FormDetail,
} from "types/Form";
import TextArea from "components/TextArea";
import Input from "components/Input";
import TextEditor from "components/TextEditor";
import DatePicker from "components/DatePicker";
import DropDown from "components/DropDown";
import ToolTip from "components/ToolTip";
import FileInput from "components/FileInput";
import MutiOptions from "./MutiOptions";
import FormType from "./FormType";
import Switch from "components/Switch";
import { shuffleArray } from "helpers/index";
import { useFormContext } from "hooks/useForm";

import styles from "./Field.module.scss";

type FieldProps = {
  selectedId: string | null;
  field: FormFieldType;
  formPage: FormPages;
  setDragId: Dispatch<SetStateAction<string | null>>;
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

let moreOptions = [
  {
    label: "Description",
    option: "description",
  },
  {
    label: "Validation Rules",
    option: "validation",
  },
  {
    label: "Shuffle option order",
    option: "shuffle",
  },
];

const Field = ({
  field,
  selectedId,
  sectionIndex,
  fieldIndex,
  formPage,
  className,
  setDragId,
  ...props
}: FieldProps) => {
  const { register, clearValue, setValue, formValues, formErrors } =
    useFormContext<FormDetail>();

  let selectedOption = useMemo<FormTypeOption | undefined>(() => {
    return formTypes.find((option) => {
      return option.type === field.type;
    });
  }, [field.type]);

  let component = useMemo<ReactNode>(() => {
    let fieldName = `sections.${sectionIndex}.fields.${fieldIndex}.value`;

    if (
      field.type === "checkbox" ||
      field.type === "radio" ||
      field.type === "dropdown"
    ) {
      return (
        <MutiOptions
          field={field}
          formPage={formPage}
          sectionIndex={sectionIndex}
          fieldIndex={fieldIndex}
        />
      );
    } else if (field.type === "input") {
      return (
        <Input
          name={fieldName}
          placeholder="Short answer text"
          disabled={formPage.isEdit}
          defaultValue={field.value}
          register={register}
          rules={field.rules}
        />
      );
    } else if (field.type === "textarea") {
      return (
        <TextArea
          placeholder="Long answer text"
          defaultValue={field.value}
          disabled={formPage.isEdit}
          name={fieldName}
          register={register}
          rules={field.rules}
        />
      );
    } else if (field.type === "date") {
      return <DatePicker disabled={formPage.isEdit} />;
    } else if (field.type === "file") {
      return <FileInput />;
    } else {
      return null;
    }
  }, [{ ...field }]);

  const handleClick = (option: string) => {
    if (option === "description") {
      setValue(
        `sections.${sectionIndex}.fields.${fieldIndex}.description.enabled`,
        !field.description.enabled
      );
    } else if (option === "shuffle") {
      if (!field.options) return;
      //TODO INPUT DEFAULT VALUE NOT UPDATING ON RENDER
      let shuffledOptions = shuffleArray(field.options);
      setValue(
        `sections.${sectionIndex}.fields.${fieldIndex}.options`,
        shuffledOptions
      );
    }
  };

  const valueErrorMsg =
    formErrors?.sections?.[sectionIndex]?.fields?.[fieldIndex]?.value;

  return (
    <div
      className={`${styles.container} ${className || ""}`.trim()}
      {...(!formPage.isEdit && { "data-error": !!valueErrorMsg })}
      {...props}
    >
      <div className={styles.wrapper}>
        <Fragment>
          <div className={styles.field_label}>
            <TextEditor
              as="div"
              placeholder="Question"
              defaultValue={`${field.question} ${
                !formPage.isEdit && field.required
                  ? `<span class=${styles.asterisk}>*</span>`
                  : ""
              }`}
              disabled={!formPage.isEdit}
              register={register(
                `sections.${sectionIndex}.fields.${fieldIndex}.question`
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
        </Fragment>
        {field?.description?.enabled &&
          (formPage.isEdit ? (
            <div className={styles.field_description}>
              <TextEditor
                as="div"
                placeholder="Description"
                defaultValue={field.description.value}
                disabled={!formPage.isEdit}
                register={register(
                  `sections.${sectionIndex}.fields.${fieldIndex}.description`
                )}
              />
            </div>
          ) : (
            <div
              dangerouslySetInnerHTML={{ __html: field.description.value }}
            ></div>
          ))}
        <div className={styles.field} data-type={field.type}>
          {component}
          {valueErrorMsg && (
            <span className={styles.error_msg}>{valueErrorMsg}</span>
          )}
        </div>
        {!formPage.isEdit && false && (
          <div className={styles.error_msg}>
            <i className="bx-error-circle"></i>
            <span>This is a required field</span>
          </div>
        )}
        {formPage.isEdit && selectedId === field.id && (
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
                onClick={() =>
                  setValue(
                    `sections.${sectionIndex}.fields.${formValues?.sections?.[sectionIndex].fields?.length}`,
                    field
                  )
                }
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
              <div
                id={`more-options-${field.id}`}
                className={styles.more_options}
              >
                <i className="bx-dots-vertical-rounded"></i>
              </div>
            </div>
            <DropDown
              selector={`#more-options-${field.id}`}
              className={styles.option_drop_down}
            >
              {moreOptions.map(({ label, option }, index) => {
                if (
                  option === "shuffle" &&
                  !(
                    field.type === "checkbox" ||
                    field.type === "dropdown" ||
                    field.type === "radio"
                  )
                )
                  return null;

                return (
                  <DropDown.Item
                    key={index}
                    onClick={() => handleClick(option)}
                  >
                    {label}
                  </DropDown.Item>
                );
              })}
            </DropDown>
          </Fragment>
        )}
        {formPage.isEdit && selectedId === field.id && (
          <div className={styles.highlight}></div>
        )}
        {formPage.isEdit && (
          <div
            className={styles.drag_icon}
            onPointerDown={() => setDragId(field.id)}
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

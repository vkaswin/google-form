import {
  ChangeEvent,
  ComponentProps,
  Fragment,
  ReactNode,
  useMemo,
  FocusEvent,
} from "react";
import {
  FormTypeOption,
  FormField as FormFieldType,
  FormMoreOption,
  FormIndexes,
  HandleFormAction,
  HandleFormChange,
  FormPages,
} from "types/Form";
import TextArea from "components/TextArea";
import Input from "components/Input";
import TextEditor from "components/TextEditor";
import DatePicker from "components/DatePicker";
import DropDown from "components/DropDown";
import ToolTip from "components/ToolTip";
import MutiOptionField from "./MutiOptionField";
import FormType from "./FormType";
import Switch from "components/Switch";

import { debounce } from "helpers/index";

import styles from "./FormCard.module.scss";

type FormCardProps = {
  selectedId: string | null;
  field: FormFieldType;
  formPage: FormPages;
  indexes: Omit<FormIndexes, "optionIndex">;
  handleFormAction: HandleFormAction;
  handleFormChange: HandleFormChange;
} & ComponentProps<"div">;

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

let moreOptions: FormMoreOption[] = [
  {
    label: "Description",
    option: "description",
  },
  {
    label: "Shuffle option order",
    option: "shuffle",
  },
];

const FormField = ({
  field,
  selectedId,
  indexes,
  formPage,
  className,
  onBlur,
  handleFormAction,
  handleFormChange,
  ...props
}: FormCardProps) => {
  let selectedOption = useMemo<FormTypeOption | undefined>(() => {
    return formTypes.find((option) => {
      return option.type === field.type;
    });
  }, [field.type]);

  let component = useMemo<ReactNode>(
    () => {
      switch (field.type) {
        case "checkbox":
          return (
            <MutiOptionField
              field={field}
              formPage={formPage}
              indexes={indexes}
              handleFormChange={handleFormChange}
              handleFormAction={handleFormAction}
            />
          );

        case "dropdown":
          return (
            <MutiOptionField
              field={field}
              formPage={formPage}
              indexes={indexes}
              handleFormChange={handleFormChange}
              handleFormAction={handleFormAction}
            />
          );
        case "radio":
          return (
            <MutiOptionField
              field={field}
              formPage={formPage}
              indexes={indexes}
              handleFormChange={handleFormChange}
              handleFormAction={handleFormAction}
            />
          );
        case "input":
          return (
            <Input
              placeholder="Short answer text"
              disabled={formPage.isEdit}
              defaultValue={field.value}
              onChange={debounce(
                (e) =>
                  handleFormChange({
                    indexes,
                    type: field.type,
                    key: "value",
                    value: e.target.value,
                  }),
                500
              )}
            />
          );
        case "textarea":
          return (
            <TextArea
              placeholder="Long answer text"
              defaultValue={field.value}
              disabled={formPage.isEdit}
              onChange={debounce(
                (e) =>
                  handleFormChange({
                    indexes,
                    type: field.type,
                    key: "value",
                    value: e.target.value,
                  }),
                500
              )}
            />
          );
        case "file":
          return <div>File Input</div>;
        case "date":
          return <DatePicker disabled={formPage.isEdit} />;
        default:
          return null;
      }
    },
    // eslint-disable-next-line
    [indexes, formPage]
  );

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    handleFormAction("blur", indexes, { type: field.type });
    if (typeof onBlur === "function") onBlur(event);
  };

  return (
    <div
      className={`${styles.container} ${className || ""}`.trim()}
      onBlur={handleBlur}
      {...(!formPage.isEdit && { "data-error": field.error })}
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
              onInput={debounce<ChangeEvent<HTMLDivElement>>(
                (e) =>
                  handleFormChange({
                    indexes,
                    type: "texteditor",
                    key: "question",
                    value: e.target.innerHTML,
                  }),
                500
              )}
            />
            {selectedId === field.id && (
              <FormType
                id={field.id}
                options={formTypes}
                indexes={indexes}
                selectedOption={selectedOption}
                handleFormAction={handleFormAction}
              />
            )}
          </div>
        </Fragment>
        {field.description.enabled &&
          (formPage.isEdit ? (
            <div className={styles.field_description}>
              <TextEditor
                as="div"
                placeholder="Description"
                defaultValue={field.description.value}
                disabled={!formPage.isEdit}
                onInput={debounce<ChangeEvent<HTMLDivElement>>(
                  (e) =>
                    handleFormChange({
                      indexes,
                      type: field.type,
                      key: "description",
                      value: e.target.innerHTML,
                    }),
                  500
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
        </div>
        {!formPage.isEdit && field.error && (
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
                onClick={() => handleFormAction("delete-form", indexes)}
              ></i>
              <ToolTip selector={`#trash-${field.id}`}>Trash</ToolTip>
              <i
                id={`duplicate-${field.id}`}
                className="bx-duplicate"
                onClick={() => handleFormAction("duplicate-form", indexes)}
              ></i>
              <ToolTip selector={`#duplicate-${field.id}`}>Duplicate</ToolTip>
              <div className={styles.split}></div>
              <Switch
                id={field.id}
                label="Required"
                checked={field.required}
                onChange={() => handleFormAction("required", indexes)}
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
                    onClick={() =>
                      handleFormAction("more-option", indexes, { option })
                    }
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
          <div className={styles.drag_icon}>
            <i className="bx-dots-horizontal-rounded"></i>
            <i className="bx-dots-horizontal-rounded"></i>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormField;

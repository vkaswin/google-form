import { ChangeEvent, FormEvent, ReactNode, useMemo } from "react";
import { TypeDropDown } from "./TypeDropDown";
import {
  FormTypeOption,
  FormField,
  FormContextType,
  FormMoreOption,
  FormIndexes,
} from "types/Form";
import {
  TextEditor,
  Input,
  TextArea,
  DatePicker,
  DropDown,
  ToolTip,
} from "components";
import { MutiOptionField } from "./MutiOptionField";

import styles from "./FormCard.module.scss";

type FormFieldProps = {
  selectedId: string | null;
  readOnly: boolean;
} & Pick<
  FormContextType,
  | "handleChangeForm"
  | "handleClickForm"
  | "handleDeleteForm"
  | "handleDuplicateForm"
  | "handleMoreOptions"
  | "handleFormType"
  | "handleDeleteOptions"
> &
  FormIndexes &
  FormField;

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
    action: "description",
  },
  {
    label: "Shuffle option order",
    action: "shuffle",
  },
];

export const FormCard = ({
  selectedId,
  readOnly,
  handleClickForm,
  handleChangeForm,
  handleDeleteForm,
  handleDuplicateForm,
  handleMoreOptions,
  handleFormType,
  handleDeleteOptions,
  ...field
}: FormFieldProps) => {
  let selectedOption = useMemo<FormTypeOption | undefined>(() => {
    return formTypes.find((option) => {
      return option.type === field.type;
    });
  }, [field.type]);

  let component = useMemo<ReactNode>(() => {
    switch (field.type) {
      case "checkbox":
        return (
          <MutiOptionField
            readOnly={readOnly}
            handleChangeForm={handleChangeForm}
            handleDeleteOptions={handleDeleteOptions}
            {...field}
          />
        );
      case "date":
        return <DatePicker disabled={readOnly} />;
      case "dropdown":
        return (
          <MutiOptionField
            readOnly={readOnly}
            handleChangeForm={handleChangeForm}
            handleDeleteOptions={handleDeleteOptions}
            {...field}
          />
        );
      case "file":
        return <Input disabled={readOnly} onChange={handleChangeForm} />;
      case "input":
        return (
          <Input
            placeholder="Short answer text"
            disabled={readOnly}
            value={field.value}
            onChange={handleChangeForm}
          />
        );
      case "textarea":
        return (
          <TextArea
            placeholder="Long answer text"
            disabled={readOnly}
            onChange={handleChangeForm}
          />
        );
      case "radio":
        return (
          <MutiOptionField
            readOnly={readOnly}
            handleChangeForm={handleChangeForm}
            handleDeleteOptions={handleDeleteOptions}
            {...field}
          />
        );
      default:
        return null;
    }
  }, [field]);

  return (
    <div className={styles.container} onClick={() => handleClickForm(field.id)}>
      <div className={styles.wrapper}>
        <TextEditor
          as="div"
          data-name="question"
          data-type={field.type}
          data-fieldindex={field.fieldindex}
          data-sectionindex={field.sectionindex}
          placeholder="Question"
          defaultValue={field.question}
          onInput={(e: ChangeEvent<HTMLDivElement>) => handleChangeForm(e)}
        />
        {selectedId === field.id && (
          <TypeDropDown
            id={field.id}
            handleFormType={handleFormType}
            options={formTypes}
            selectedOption={selectedOption}
            sectionindex={field.sectionindex}
            fieldindex={field.fieldindex}
          />
        )}
      </div>
      <div className={styles.field} data-type={field.type}>
        {component}
      </div>
      <div className={styles.footer}>
        <i
          id={`trash-${field.id}`}
          className="bx-trash"
          onClick={() => handleDeleteForm(field.sectionindex, field.fieldindex)}
        ></i>
        <ToolTip selector={`#trash-${field.id}`}>Trash</ToolTip>
        <i
          id={`duplicate-${field.id}`}
          className="bx-duplicate"
          onClick={() =>
            handleDuplicateForm(field.sectionindex, field.fieldindex)
          }
        ></i>
        <ToolTip selector={`#duplicate-${field.id}`}>Duplicate</ToolTip>
        <div className={styles.split}></div>
        <div>
          <span>Required</span>
        </div>
        <div id={`more-options-${field.id}`} className={styles.more_options}>
          <i className="bx-dots-vertical-rounded"></i>
        </div>
      </div>
      <DropDown
        selector={`#more-options-${field.id}`}
        className={styles.option_drop_down}
      >
        {moreOptions.map(({ label, action }, index) => {
          return (
            <DropDown.Item
              key={index}
              onClick={() => handleMoreOptions(action, field.id)}
            >
              {label}
            </DropDown.Item>
          );
        })}
      </DropDown>
      {selectedId === field.id && <div className={styles.highlight}></div>}
      <div className={styles.drag_icon}>
        <i className="bx-dots-horizontal-rounded"></i>
        <i className="bx-dots-horizontal-rounded"></i>
      </div>
    </div>
  );
};

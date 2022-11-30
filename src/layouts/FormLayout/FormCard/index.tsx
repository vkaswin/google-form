import { ChangeEvent, ComponentProps, ReactNode, useMemo } from "react";
import {
  FormTypeOption,
  FormField,
  FormTypes,
  FormMoreOption,
  FormIndexes,
} from "types/Form";
import TextArea from "components/TextArea";
import Input from "components/Input";
import TextEditor from "components/TextEditor";
import DatePicker from "components/DatePicker";
import DropDown from "components/DropDown";
import ToolTip from "components/ToolTip";
import MutiOptionField from "./MutiOptionField";
import TypeDropDown from "./TypeDropDown";

import styles from "./FormCard.module.scss";

type FormFieldProps = {
  selectedId: string | null;
  readOnly: boolean;
  field: FormField;
  sectionHeader: string | null;
} & Pick<
  FormTypes,
  | "handleChangeForm"
  | "handleClickForm"
  | "handleDeleteForm"
  | "handleDuplicateForm"
  | "handleMoreOptions"
  | "handleFormType"
  | "handleDeleteOptions"
  | "handleDeleteOther"
  | "handleAddOther"
  | "handleAddOption"
  | "handleRequired"
> &
  FormIndexes &
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
  field,
  selectedId,
  readOnly,
  fieldindex,
  sectionindex,
  sectionHeader,
  className,
  handleClickForm,
  handleChangeForm,
  handleDeleteForm,
  handleDuplicateForm,
  handleMoreOptions,
  handleFormType,
  handleDeleteOptions,
  handleDeleteOther,
  handleAddOther,
  handleAddOption,
  handleRequired,
  ...props
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
            field={field}
            readOnly={readOnly}
            sectionindex={sectionindex}
            fieldindex={fieldindex}
            handleChangeForm={handleChangeForm}
            handleDeleteOptions={handleDeleteOptions}
            handleDeleteOther={handleDeleteOther}
            handleAddOther={handleAddOther}
            handleAddOption={handleAddOption}
          />
        );

      case "dropdown":
        return (
          <MutiOptionField
            field={field}
            readOnly={readOnly}
            sectionindex={sectionindex}
            fieldindex={fieldindex}
            handleChangeForm={handleChangeForm}
            handleDeleteOptions={handleDeleteOptions}
            handleDeleteOther={handleDeleteOther}
            handleAddOther={handleAddOther}
            handleAddOption={handleAddOption}
          />
        );
      case "radio":
        return (
          <MutiOptionField
            field={field}
            readOnly={readOnly}
            sectionindex={sectionindex}
            fieldindex={fieldindex}
            handleChangeForm={handleChangeForm}
            handleDeleteOptions={handleDeleteOptions}
            handleDeleteOther={handleDeleteOther}
            handleAddOther={handleAddOther}
            handleAddOption={handleAddOption}
          />
        );
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
      case "file":
        return <Input disabled={readOnly} onChange={handleChangeForm} />;
      case "date":
        return <DatePicker disabled={readOnly} />;
      default:
        return null;
    }
  }, [{ ...field }]);

  return (
    <div
      className={`${styles.container} ${className || ""}`.trim()}
      data-section={!!sectionHeader}
      {...props}
    >
      {sectionHeader && (
        <div className={styles.section}>
          <span>{sectionHeader}</span>
        </div>
      )}
      <div className={styles.wrapper}>
        <div className={styles.field_label}>
          <TextEditor
            as="div"
            data-name="question"
            data-type={field.type}
            data-fieldindex={fieldindex}
            data-sectionindex={sectionindex}
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
              sectionindex={sectionindex}
              fieldindex={fieldindex}
            />
          )}
        </div>
        {field.description.enabled && (
          <div className={styles.field_description}>
            <TextEditor
              as="div"
              data-name="description"
              data-type={field.type}
              data-fieldindex={fieldindex}
              data-sectionindex={sectionindex}
              placeholder="Description"
              defaultValue={field.description.value}
              onInput={(e: ChangeEvent<HTMLDivElement>) => handleChangeForm(e)}
            />
          </div>
        )}
        <div className={styles.field} data-type={field.type}>
          {component}
        </div>
        <div className={styles.footer}>
          <i
            id={`trash-${field.id}`}
            className="bx-trash"
            onClick={() => handleDeleteForm(sectionindex, fieldindex)}
          ></i>
          <ToolTip selector={`#trash-${field.id}`}>Trash</ToolTip>
          <i
            id={`duplicate-${field.id}`}
            className="bx-duplicate"
            onClick={() => handleDuplicateForm(sectionindex, fieldindex)}
          ></i>
          <ToolTip selector={`#duplicate-${field.id}`}>Duplicate</ToolTip>
          <div className={styles.split}></div>
          <div onClick={() => handleRequired(sectionindex, fieldindex)}>
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
            if (
              action === "shuffle" &&
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
                  handleMoreOptions(sectionindex, fieldindex, action)
                }
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
    </div>
  );
};

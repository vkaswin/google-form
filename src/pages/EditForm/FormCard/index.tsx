import {
  ChangeEvent,
  ComponentProps,
  Fragment,
  ReactNode,
  useMemo,
} from "react";
import {
  FormTypeOption,
  FormField,
  FormMoreOption,
  FormIndexes,
  HandleFormAction,
  HandleFormChange,
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
  isEditPage: boolean;
  field: FormField;
  sectionHeader: string | null;
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

export const FormCard = ({
  field,
  selectedId,
  isEditPage,
  indexes,
  sectionHeader,
  className,
  handleFormAction,
  handleFormChange,
  ...props
}: FormFieldProps) => {
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
              isEditPage={isEditPage}
              indexes={indexes}
              handleFormChange={handleFormChange}
              handleFormAction={handleFormAction}
            />
          );

        case "dropdown":
          return (
            <MutiOptionField
              field={field}
              isEditPage={isEditPage}
              indexes={indexes}
              handleFormChange={handleFormChange}
              handleFormAction={handleFormAction}
            />
          );
        case "radio":
          return (
            <MutiOptionField
              field={field}
              isEditPage={isEditPage}
              indexes={indexes}
              handleFormChange={handleFormChange}
              handleFormAction={handleFormAction}
            />
          );
        case "input":
          return (
            <Input
              placeholder="Short answer text"
              disabled={isEditPage}
              value={field.value}
              onChange={(e) =>
                handleFormChange({
                  key: "value",
                  value: e.target.innerHTML,
                  type: field.type,
                  indexes,
                })
              }
            />
          );
        case "textarea":
          return (
            <TextArea
              placeholder="Long answer text"
              disabled={isEditPage}
              onChange={(e) =>
                handleFormChange({
                  key: "value",
                  value: e.target.value,
                  type: field.type,
                  indexes,
                })
              }
            />
          );
        case "file":
          return (
            <Input
              disabled={isEditPage}
              onChange={(e) =>
                handleFormChange({
                  key: "value",
                  value: e.target.value,
                  type: field.type,
                  indexes,
                })
              }
            />
          );
        case "date":
          return <DatePicker disabled={isEditPage} />;
        default:
          return null;
      }
    },
    // eslint-disable-next-line
    [field, indexes, isEditPage]
  );

  return (
    <div
      className={`${styles.container} ${className || ""}`.trim()}
      {...(!!sectionHeader && { "data-section": true })}
      {...props}
    >
      {sectionHeader && (
        <div className={styles.section}>
          <span>{sectionHeader}</span>
        </div>
      )}
      <div className={styles.wrapper}>
        {isEditPage ? (
          <Fragment>
            <div className={styles.field_label}>
              <TextEditor
                as="div"
                placeholder="Question"
                defaultValue={field.question}
                onInput={(e: ChangeEvent<HTMLDivElement>) =>
                  handleFormChange({
                    key: "description",
                    value: e.target.innerHTML,
                    type: "texteditor",
                    indexes,
                  })
                }
              />
              {selectedId === field.id && (
                <TypeDropDown
                  id={field.id}
                  options={formTypes}
                  indexes={indexes}
                  selectedOption={selectedOption}
                  handleFormAction={handleFormAction}
                />
              )}
            </div>
          </Fragment>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: field.question }}></div>
        )}
        {field.description.enabled &&
          (isEditPage ? (
            <div className={styles.field_description}>
              <TextEditor
                as="div"
                placeholder="Description"
                defaultValue={field.description.value}
                onInput={(e: ChangeEvent<HTMLDivElement>) =>
                  handleFormChange({
                    key: "description",
                    value: e.target.innerHTML,
                    type: field.type,
                    indexes,
                  })
                }
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
          <div onClick={() => handleFormAction("required", indexes)}>
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
        {selectedId === field.id && <div className={styles.highlight}></div>}
        {isEditPage && (
          <div className={styles.drag_icon}>
            <i className="bx-dots-horizontal-rounded"></i>
            <i className="bx-dots-horizontal-rounded"></i>
          </div>
        )}
      </div>
    </div>
  );
};

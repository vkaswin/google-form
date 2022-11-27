import { ReactNode, useMemo } from "react";
import { TypeDropDown } from "./TypeDropDown";
import { FormDropDown, FormField, FormContextType } from "types/Form";
import {
  TextEditor,
  FormWrapper,
  Input,
  TextArea,
  DatePicker,
  DropDown,
} from "components";
import { MutiOptionField } from "./MutiOptionField";

import styles from "./FormCard.module.scss";

type FormFieldProps = {
  selectedId: string | null;
  readOnly: boolean;
  handleClickForm: (id: string) => void;
} & Pick<FormContextType, "handleChange"> &
  FormField;

let formDropDown: FormDropDown[] = [
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

export const FormCard = ({
  selectedId,
  readOnly,
  handleClickForm,
  handleChange,
  ...field
}: FormFieldProps) => {
  let selectedOption = useMemo<FormDropDown | undefined>(() => {
    return formDropDown.find((option) => {
      return option.type === field.type;
    });
  }, [field.type]);

  let component = useMemo<ReactNode>(() => {
    switch (field.type) {
      case "checkbox":
        return <MutiOptionField readOnly={readOnly} {...field} />;
      case "date":
        return <DatePicker disabled={readOnly} />;
      case "dropdown":
        return <MutiOptionField readOnly={readOnly} {...field} />;
      case "file":
        return <Input disabled={readOnly} />;
      case "input":
        return <Input placeholder="Short answer text" disabled={readOnly} />;
      case "textarea":
        return <TextArea placeholder="Long answer text" disabled={readOnly} />;
      case "radio":
        return <MutiOptionField readOnly={readOnly} {...field} />;
      default:
        return null;
    }
  }, [field.type]);

  return (
    <FormWrapper
      className={styles.card}
      onClick={() => handleClickForm(field.id)}
      isSelected={selectedId === field.id}
    >
      <div className={styles.wrapper}>
        <TextEditor as="div" placeholder="Question" />
        {selectedId === field.id && (
          <TypeDropDown
            id={field.id}
            type={field.type}
            handleChange={handleChange}
            options={formDropDown}
            selectedOption={selectedOption}
          />
        )}
      </div>
      <div className={styles.field} data-type={field.type}>
        {component}
      </div>
      <div className={styles.footer}>
        <i className="bx-trash"></i>
        <i className="bx-duplicate"></i>
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
        <DropDown.Item>Descripton</DropDown.Item>
        <DropDown.Item>Shuffle option order</DropDown.Item>
      </DropDown>
    </FormWrapper>
  );
};

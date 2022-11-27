import { ReactNode, useMemo } from "react";
import { TypeDropDown } from "./TypeDropDown";
import { FormDropDown, FormField, FormContextType } from "types/Form";
import { TextEditor, Box, Input, TextArea } from "components";
import { RadioField } from "./RadioField";
import { CheckBoxField } from "./CheckBoxField";
import { DropDownField } from "./DropDownField";
import { DateField } from "./DateField";
import { FileField } from "./FileField";

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
        return <CheckBoxField readOnly={readOnly} />;
      case "date":
        return <DateField readOnly={readOnly} />;
      case "dropdown":
        return <DropDownField readOnly={readOnly} />;
      case "file":
        return <FileField readOnly={readOnly} />;
      case "input":
        return <Input disabled={readOnly} />;
      case "textarea":
        return <TextArea disabled={readOnly} />;
      case "radio":
        return <RadioField readOnly={readOnly} {...field} />;
      default:
        return null;
    }
  }, [field.type]);

  return (
    <Box
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
    </Box>
  );
};

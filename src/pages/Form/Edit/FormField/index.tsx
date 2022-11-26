import { ReactNode, useMemo } from "react";
import { TypeDropDown } from "./TypeDropDown";
import { FormOption, Field, FormType, FormContextType } from "types/Form";
import { TextEditor, Box } from "components";

import styles from "./FormField.module.scss";

type FormFieldProps = {
  selectedId: string | null;
  handleClickForm: (id: string) => void;
} & Pick<FormContextType, "handleChange"> &
  Field;

let formOptions: FormOption[] = [
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

const CheckBox = () => {
  return (
    <div>
      <span>Checkbox</span>
    </div>
  );
};

const Radio = () => {
  return (
    <div>
      <span>Radio</span>
    </div>
  );
};

const Paragraph = () => {
  return (
    <div>
      <span>Paragraph</span>
    </div>
  );
};

const ShortText = () => {
  return (
    <div>
      <span>Text</span>
    </div>
  );
};

const Date = () => {
  return (
    <div>
      <span>Date</span>
    </div>
  );
};

const File = () => {
  return (
    <div>
      <span>File</span>
    </div>
  );
};

const DropDown = () => {
  return (
    <div>
      <span>DropDown</span>
    </div>
  );
};

export const FormField = ({
  id,
  type,
  description,
  label,
  options,
  validation,
  value,
  selectedId,
  handleClickForm,
  handleChange,
}: FormFieldProps) => {
  let selectedOption = useMemo<FormOption | undefined>(() => {
    return formOptions.find((option) => {
      return option.type === type;
    });
  }, [type]);

  let component = useMemo<ReactNode>(() => {
    switch (type) {
      case "checkbox":
        return <CheckBox />;
      case "date":
        return <Date />;
      case "dropdown":
        return <DropDown />;
      case "file":
        return <File />;
      case "input":
        return <ShortText />;
      case "radio":
        return <Radio />;
      case "textarea":
        return <Paragraph />;
      default:
        return null;
    }
  }, [type]);

  return (
    <Box
      className={styles.card}
      onClick={() => handleClickForm(id)}
      isSelected={selectedId === id}
    >
      <div className={styles.wrapper}>
        <TextEditor as="div" placeholder="Question" />
        {selectedId === id && (
          <TypeDropDown
            id={id}
            type={type}
            handleChange={handleChange}
            options={formOptions}
            selectedOption={selectedOption}
          />
        )}
      </div>
      {component}
    </Box>
  );
};

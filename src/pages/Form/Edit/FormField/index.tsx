import { useMemo } from "react";
import { Options } from "./TypeDropDown";
import { FormOption, Field, FormType } from "types/Form";
import { TextEditor, Box } from "components";

import styles from "./FormField.module.scss";

type FormFieldProps = {
  selectedId: string | null;
  handleClickForm: (id: string) => void;
  handleSelectType: (type: FormType) => void;
} & Field;

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
  handleSelectType,
}: FormFieldProps) => {
  let selectedOption = useMemo(() => {
    return formOptions.find((option) => {
      return option.type === type;
    }) as FormOption;
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
          <Options
            id={id}
            type={type}
            handleSelectType={handleSelectType}
            options={formOptions}
            selectedOption={selectedOption}
          />
        )}
      </div>
      <div className={styles.short_para}></div>
      <div className={styles.long_para}></div>
      <div className={styles.date}></div>
      <div className={styles.options}></div>
    </Box>
  );
};

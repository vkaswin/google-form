import { ChangeEvent, ComponentProps } from "react";
import {
  FormPages,
  FormSection as FormSectionType,
  HandleFormSection,
} from "types/Form";
import TextEditor from "components/TextEditor";
import { debounce } from "helpers/index";

import styles from "./FormSection.module.scss";

export type FormSectionProps = {
  selectedId: string | null;
  disabled: boolean;
  sectionIndex: number;
  sectionHeader?: string;
  formPage: FormPages;
  handleFormSection: HandleFormSection;
} & ComponentProps<"div"> &
  Omit<FormSectionType, "fields">;

const FormSection = ({
  id,
  title,
  className,
  formPage,
  disabled,
  selectedId,
  description,
  sectionIndex,
  handleFormSection,
  sectionHeader = "",
  ...props
}: FormSectionProps) => {
  return formPage.isEdit ? (
    <div>
      <div className={styles.section}>
        <span>{sectionHeader}</span>
      </div>
      <div
        className={`${styles.container} ${className || ""}`.trim()}
        {...props}
      >
        <TextEditor
          as="h2"
          placeholder="Form title"
          defaultValue={title}
          disabled={disabled}
          onInput={debounce<ChangeEvent<HTMLDivElement>>(
            (e) =>
              handleFormSection({
                sectionIndex,
                key: "title",
                value: e.target.innerHTML,
              }),
            500
          )}
        />
        <TextEditor
          placeholder="Form description"
          defaultValue={description}
          disabled={disabled}
          onInput={debounce<ChangeEvent<HTMLDivElement>>(
            (e) =>
              handleFormSection({
                sectionIndex,
                key: "description",
                value: e.target.innerHTML,
              }),
            500
          )}
        />
        <div className={styles.indicator}></div>
        {selectedId === id && <div className={styles.highlight}></div>}
      </div>
    </div>
  ) : (
    <div className={styles.wrapper}>
      <div
        className={styles.header}
        dangerouslySetInnerHTML={{ __html: title }}
      ></div>
      <div
        className={styles.footer}
        dangerouslySetInnerHTML={{ __html: description }}
      ></div>
    </div>
  );
};

export default FormSection;

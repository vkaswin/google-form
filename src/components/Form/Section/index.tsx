import { ComponentProps } from "react";
import { FormDetail, FormPages, FormSection } from "types/Form";
import { useFormContext } from "hooks/useForm";
import TextEditor from "components/TextEditor";

import styles from "./Section.module.scss";

export type FormSectionProps = {
  selectedId: string | null;
  disabled: boolean;
  sectionIndex: number;
  sectionHeader?: string;
  formPage: FormPages;
} & ComponentProps<"div"> &
  Omit<FormSection, "fields">;

const Section = ({
  id,
  title,
  className,
  formPage,
  disabled,
  selectedId,
  description,
  sectionIndex,
  sectionHeader = "",
  ...props
}: FormSectionProps) => {
  const { register } = useFormContext<FormDetail>();

  return formPage.isEdit ? (
    <div>
      {sectionHeader.length > 0 && (
        <div className={styles.section}>
          <span>{sectionHeader}</span>
        </div>
      )}
      <div
        className={`${styles.container} ${className || ""}`.trim()}
        {...props}
      >
        <TextEditor
          as="h2"
          placeholder="Form title"
          defaultValue={title}
          disabled={disabled}
          register={register(`sections.${sectionIndex}.title`)}
        />
        <TextEditor
          placeholder="Form description"
          defaultValue={description}
          disabled={disabled}
          register={register(`sections.${sectionIndex}.description`)}
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

export default Section;

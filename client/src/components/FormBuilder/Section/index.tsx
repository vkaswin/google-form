import { ComponentProps } from "react";
import { FormPages, FormSection } from "types/Form";
import TextEditor from "components/TextEditor";
import { useFormContext } from "context/form";

import styles from "./Section.module.scss";

export type FormSectionProps = {
  selectedId: string | null;
  sectionIndex: number;
  sectionHeader?: string;
  formPage: FormPages;
  isSelected: Boolean;
} & ComponentProps<"div"> &
  Omit<FormSection, "fields">;

const Section = ({
  title,
  className,
  selectedId,
  description,
  sectionIndex,
  isSelected,
  sectionHeader = "",
  formPage: { isEdit },
  ...props
}: FormSectionProps) => {
  const { register } = useFormContext();

  return isEdit ? (
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
          register={register(`sections.${sectionIndex}.title`)}
        />
        <TextEditor
          placeholder="Form description"
          defaultValue={description}
          register={register(`sections.${sectionIndex}.description`)}
        />
        <div className={styles.indicator}></div>
        {isSelected && <div className={styles.highlight}></div>}
      </div>
    </div>
  ) : (
    <div className={styles.wrapper}>
      <div
        className={styles.header}
        dangerouslySetInnerHTML={{ __html: title || "" }}
      ></div>
      <div
        className={styles.footer}
        dangerouslySetInnerHTML={{ __html: description || "" }}
      ></div>
    </div>
  );
};

export default Section;

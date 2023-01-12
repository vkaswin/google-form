import { ComponentProps } from "react";
import { FormSection } from "types/Form";
import TextEditor from "components/TextEditor";
import { useFormContext } from "context/form";

import styles from "./Section.module.scss";

export type FormSectionProps = {
  selectedId: string | null;
  sectionIndex: number;
  sectionHeader?: string;
} & ComponentProps<"div"> &
  Omit<FormSection, "fields">;

const Section = ({
  id,
  title,
  className,
  selectedId,
  description,
  sectionIndex,
  sectionHeader = "",
  ...props
}: FormSectionProps) => {
  const { register } = useFormContext();

  return (
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
        {selectedId === id && <div className={styles.highlight}></div>}
      </div>
    </div>
  );
};

export default Section;

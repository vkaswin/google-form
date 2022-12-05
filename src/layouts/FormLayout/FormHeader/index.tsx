import { ComponentProps } from "react";
import { FormDetail, HandleFormChange } from "types/Form";
import TextEditor from "components/TextEditor";

import styles from "./FormHeader.module.scss";

export type FormHeaderProps = {
  field: FormDetail["header"];
  selectedId: string | null;
  handleFormChange: HandleFormChange;
} & ComponentProps<"div">;

export const FormHeader = ({
  field: { id, title, description },
  className,
  selectedId,
  handleFormChange,
  ...props
}: FormHeaderProps) => {
  return (
    <div className={`${styles.container} ${className || ""}`.trim()} {...props}>
      <TextEditor
        as="h1"
        placeholder="Form title"
        name="title"
        defaultValue={title}
        onInput={(e: any) => handleFormChange(e, { type: "header" })}
      />
      <TextEditor
        placeholder="Form description"
        name="description"
        defaultValue={description}
        onInput={(e: any) => handleFormChange(e, { type: "header" })}
      />
      <div className={styles.indicator}></div>
      {selectedId === id && <div className={styles.highlight}></div>}
    </div>
  );
};

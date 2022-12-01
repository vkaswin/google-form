import { ChangeEvent, ComponentProps } from "react";
import { HandleFormHeader, FormDetail } from "types/Form";
import TextEditor from "components/TextEditor";

import styles from "./FormHeader.module.scss";

export type FormHeaderProps = {
  field: FormDetail["header"];
  selectedId: string | null;
  handleFormHeader: HandleFormHeader;
} & ComponentProps<"div">;

export const FormHeader = ({
  field: { id, title, description },
  className,
  selectedId,
  handleFormHeader,
  ...props
}: FormHeaderProps) => {
  return (
    <div className={`${styles.container} ${className || ""}`.trim()} {...props}>
      <TextEditor
        as="h1"
        placeholder="Form title"
        defaultValue={title}
        onInput={(e: ChangeEvent<HTMLDivElement>) =>
          handleFormHeader({ key: "title", value: e.target.innerHTML })
        }
      />
      <TextEditor
        placeholder="Form description"
        defaultValue={description}
        onInput={(e: ChangeEvent<HTMLDivElement>) =>
          handleFormHeader({ key: "description", value: e.target.innerHTML })
        }
      />
      <div className={styles.indicator}></div>
      {selectedId === id && <div className={styles.highlight}></div>}
    </div>
  );
};

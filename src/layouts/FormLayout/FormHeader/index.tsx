import { ChangeEvent } from "react";
import { TextEditor } from "components";
import { FormContextType } from "types/Form";

import styles from "./FormHeader.module.scss";

export type FormHeaderProps = {
  selectedId: string | null;
  handleClickForm: FormContextType["handleClickForm"];
};

let headerId: string = crypto.randomUUID();

export const FormHeader = ({
  selectedId,
  handleClickForm,
}: FormHeaderProps) => {
  const handleChange = (event: ChangeEvent<HTMLDivElement>) => {
    console.log(event);
  };

  return (
    <div className={styles.container} onClick={() => handleClickForm(headerId)}>
      <TextEditor as="h1" placeholder="Form title" onInput={handleChange} />
      <TextEditor placeholder="Form description" onInput={handleChange} />
      <div className={styles.indicator}></div>
      {selectedId === headerId && <div className={styles.highlight}></div>}
    </div>
  );
};

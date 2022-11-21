import { ChangeEvent } from "react";

import styles from "./TextEditor.module.scss";

type TextEditorProps = {
  onChange?: () => void;
};

export const TextEditor = ({ onChange = () => {} }: TextEditorProps) => {
  return (
    <div
      contentEditable={true}
      onInput={(e: ChangeEvent<HTMLDivElement>) =>
        console.dir(e.target.innerHTML)
      }
      onChange={(e) => console.log(e.target)}
      style={{ width: "40px", height: "20px" }}
    >
      <span>TextEditor</span>
    </div>
  );
};

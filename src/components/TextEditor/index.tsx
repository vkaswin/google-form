import { ChangeEvent, FocusEvent, ElementType, useRef } from "react";

import styles from "./TextEditor.module.scss";

type TextEditorProps = {
  onChange?: (event: ChangeEvent<HTMLDivElement>) => void;
  defaultValue?: string;
  as?: ElementType;
};

export const TextEditor = ({
  onChange = () => {},
  defaultValue = "",
  as = "div",
  ...rest
}: TextEditorProps) => {
  let editorRef = useRef<HTMLDivElement>(null);
  let toolBarRef = useRef<HTMLUListElement>(null);
  let Component = as;
  const handleFocus = (event: FocusEvent<HTMLDivElement>): void => {
    editorRef.current?.classList.remove(styles.blur);
    editorRef.current?.classList.add(styles.focus);
    toolBarRef.current?.classList.add(styles.show);
  };

  const handleBlur = (event: FocusEvent<HTMLDivElement>): void => {
    editorRef.current?.classList.remove(styles.focus);
    editorRef.current?.classList.add(styles.blur);
    toolBarRef.current?.classList.remove(styles.show);
  };

  return (
    <div className={styles.container}>
      <Component
        ref={editorRef}
        className={styles.editor}
        contentEditable={true}
        onInput={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="Enter Here"
        dangerouslySetInnerHTML={{ __html: defaultValue }}
      />
      <ul ref={toolBarRef} className={styles.toolbar}>
        <li>
          <i className="bx-bold"></i>
        </li>
        <li>
          <i className="bx-italic"></i>
        </li>
        <li>
          <i className="bx-underline"></i>
        </li>
        <li>
          <i className="bx-link-alt"></i>
        </li>
        <li>
          <i className="bx-strikethrough"></i>
        </li>
        <li>
          <i className="bx-eraser"></i>
        </li>
        <li>
          <i className="bx-undo"></i>
        </li>
        <li>
          <i className="bx-redo"></i>
        </li>
      </ul>
    </div>
  );
};

import {
  ChangeEvent,
  FocusEvent,
  ElementType,
  useRef,
  ComponentPropsWithoutRef,
} from "react";

import styles from "./TextEditor.module.scss";

type TextEditorProps<T extends ElementType> = {
  as?: T;
} & ComponentPropsWithoutRef<T>;

export const TextEditor = <T extends ElementType>({
  as,
  onFocus,
  onBlur,
  defaultValue = "",
  placeholder = "Enter Here",
  ...props
}: TextEditorProps<T>) => {
  let Component = as || "div";
  let editorRef = useRef<HTMLDivElement>(null);
  let toolBarRef = useRef<HTMLUListElement>(null);

  const handleFocus = (event: FocusEvent<HTMLDivElement>): void => {
    editorRef.current?.classList.remove(styles.blur);
    editorRef.current?.classList.add(styles.focus);
    toolBarRef.current?.classList.add(styles.show);
    if (typeof onFocus === "function") onFocus(event);
  };

  const handleBlur = (event: FocusEvent<HTMLDivElement>): void => {
    editorRef.current?.classList.remove(styles.focus);
    editorRef.current?.classList.add(styles.blur);
    toolBarRef.current?.classList.remove(styles.show);
    if (typeof onBlur === "function") onBlur(event);
  };

  return (
    <div className={styles.container}>
      <Component
        ref={editorRef}
        className={styles.editor}
        contentEditable={true}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        dangerouslySetInnerHTML={{ __html: defaultValue }}
        {...props}
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

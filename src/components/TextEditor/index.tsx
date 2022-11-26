import { FocusEvent, ElementType, useRef, ComponentProps } from "react";

import styles from "./TextEditor.module.scss";

type TextEditorOwnProps<E extends ElementType> = {
  as?: E;
};

export type TextEditorProps<E extends ElementType> = TextEditorOwnProps<E> &
  Omit<ComponentProps<E>, keyof TextEditorOwnProps<E>>;

export const TextEditor = <E extends ElementType = "div">({
  as,
  onFocus,
  onBlur,
  defaultValue = "",
  placeholder = "Enter Here",
  ...props
}: TextEditorProps<E>) => {
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

  const Component = as || "div";
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

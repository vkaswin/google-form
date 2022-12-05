import { clickOutside } from "helpers/index";
import {
  FocusEvent,
  ElementType,
  useRef,
  ComponentProps,
  useEffect,
} from "react";

import styles from "./TextEditor.module.scss";

type TextEditorOwnProps<E extends ElementType> = {
  as?: E;
  value?: string;
  name?: string;
};

type TextEditorProps<E extends ElementType> = TextEditorOwnProps<E> &
  Omit<ComponentProps<E>, keyof TextEditorOwnProps<E>>;

const TextEditor = <E extends ElementType = "div">({
  as,
  defaultValue = "",
  placeholder = "Enter Here",
  name,
  ...props
}: TextEditorProps<E>) => {
  let editorRef = useRef<HTMLDivElement>(null);
  let toolBarRef = useRef<HTMLUListElement>(null);
  let inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (defaultValue.length > 0 && inputRef.current) {
      inputRef.current.innerHTML = defaultValue;
    }
  }, []);

  const handleFocus = (): void => {
    editorRef.current?.classList.remove(styles.blur);
    editorRef.current?.classList.add(styles.focus);
    toolBarRef.current?.classList.add(styles.show);
    if (editorRef.current) {
      clickOutside({
        ref: editorRef.current,
        onClose: () => {
          editorRef.current?.classList.remove(styles.focus);
          editorRef.current?.classList.add(styles.blur);
          toolBarRef.current?.classList.remove(styles.show);
        },
      });
    }
  };

  const Component = as || "div";
  return (
    <div ref={editorRef} className={styles.container} onFocus={handleFocus}>
      <Component
        ref={inputRef}
        className={styles.editor}
        contentEditable={true}
        placeholder={placeholder}
        {...(name && { name })}
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

export default TextEditor;

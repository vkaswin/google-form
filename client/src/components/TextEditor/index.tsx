import { ElementType, useRef, ComponentProps, Fragment } from "react";
import { FormRegister } from "types/UseForm";

import styles from "./TextEditor.module.scss";

type TextEditorOwnProps<E extends ElementType> = {
  as?: E;
  register?: ReturnType<FormRegister> | {};
  disabled?: boolean;
};

type TextEditorProps<E extends ElementType> = TextEditorOwnProps<E> &
  Omit<ComponentProps<E>, keyof TextEditorOwnProps<E>>;

type ToolBarActions =
  | "bold"
  | "italic"
  | "underline"
  | "strikethrough"
  | "link";

type ToolBar = {
  icon: string;
  action: ToolBarActions;
};

let toolbar: ToolBar[] = [
  {
    icon: "bx-bold",
    action: "bold",
  },
  {
    icon: "bx-italic",
    action: "italic",
  },
  {
    icon: "bx-underline",
    action: "underline",
  },
  {
    icon: "bx-link-alt",
    action: "link",
  },
  {
    icon: "bx-strikethrough",
    action: "strikethrough",
  },
];

const TextEditor = <E extends ElementType = "div">({
  as,
  disabled = false,
  defaultValue = "",
  placeholder = "Enter Here",
  register = {},
  ...props
}: TextEditorProps<E>) => {
  let editorRef = useRef<HTMLDivElement>(null);
  let toolBarRef = useRef<HTMLUListElement>(null);

  const handleFocus = (): void => {
    editorRef.current?.classList.remove(styles.blur);
    editorRef.current?.classList.add(styles.focus);
    toolBarRef.current?.classList.add(styles.show);
  };

  const handleBlur = () => {
    if (editorRef.current) {
      editorRef.current.classList.remove(styles.focus);
      editorRef.current.classList.add(styles.blur);
    }
    if (toolBarRef.current) {
      toolBarRef.current.classList.remove(styles.show);
    }
  };

  const handleToolBar = (action: ToolBarActions) => {
    /*let selection = window.getSelection();

    if (!selection) return;

    let selectedElement = selection
      .getRangeAt(0)
      .commonAncestorContainer.cloneNode();

    selection.deleteFromDocument();
    let element: HTMLElement | null = null;
    switch (action) {
      case "bold":
        element = document.createElement("b");
        element.textContent = selectedElement.textContent;
        break;

      case "italic":
        element = document.createElement("i");
        element.textContent = selectedElement.textContent;
        break;

      case "underline":
        element = document.createElement("u");
        element.textContent = selectedElement.textContent;
        break;

      case "strikethrough":
        element = document.createElement("s");
        element.textContent = selectedElement.textContent;
        break;

      case "link":
        break;

      default:
        return;
    }

    if (!element) return;

    selection.getRangeAt(0).insertNode(element);
    clearSelection();*/
  };

  const clearSelection = () => {
    let selection = window.getSelection();
    if (selection?.empty) {
      selection.empty();
    } else if (selection?.removeAllRanges) {
      selection.removeAllRanges();
    }
  };

  let Component = as || "div";

  return (
    <Fragment>
      {disabled ? (
        <div dangerouslySetInnerHTML={{ __html: defaultValue }}></div>
      ) : (
        <div
          tabIndex={-1}
          ref={editorRef}
          className={styles.container}
          onFocus={handleFocus}
          onBlur={handleBlur}
        >
          <Component
            className={styles.editor}
            contentEditable={true}
            placeholder={placeholder}
            dangerouslySetInnerHTML={{ __html: defaultValue }}
            {...register}
            {...props}
          />
          <ul ref={toolBarRef} className={styles.toolbar}>
            {toolbar.map(({ icon, action }, index) => {
              return (
                <li key={index} onClick={() => handleToolBar(action)}>
                  <i className={icon}></i>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </Fragment>
  );
};

export default TextEditor;

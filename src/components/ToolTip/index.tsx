import { ComponentProps, ReactNode, useEffect, useState } from "react";
import { usePopper } from "react-popper";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";

import styles from "./ToolTip.module.scss";

type ToolTipProps = {
  container?: HTMLElement;
  selector: string;
  children: ReactNode;
} & ComponentProps<"div">;

const ToolTip = ({ selector, children, className, ...props }: ToolTipProps) => {
  let [referenceElement, setReferenceElement] = useState<HTMLElement | null>(
    null
  );
  let [popperElement, setPopperElement] = useState<HTMLElement | null>(null);

  let [isOpen, setIsOpen] = useState(false);

  const {
    attributes,
    styles: style,
    state,
  } = usePopper(referenceElement, popperElement, {
    placement: "top",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 10],
        },
      },
    ],
  });

  const show = () => {
    setIsOpen(true);
  };

  const hide = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (selector.length === 0) return;

    let element = document.querySelector(selector) as HTMLElement;

    if (!element) return;

    element.onmouseenter = show;
    element.onmouseleave = hide;
    setReferenceElement(element);
  }, []);

  if (!referenceElement) return null;

  return createPortal(
    <CSSTransition
      in={isOpen}
      timeout={300}
      classNames={{
        enterActive: styles.enter,
        exitActive: styles.exit,
      }}
      unmountOnExit
    >
      <div
        ref={setPopperElement}
        className={`${styles.container} ${className || ""}`.trim()}
        style={{
          ...style.popper,
        }}
        {...attributes.popper}
        {...props}
      >
        <div className={styles.menu}>{children}</div>
      </div>
    </CSSTransition>,
    referenceElement
  );
};

export default ToolTip;

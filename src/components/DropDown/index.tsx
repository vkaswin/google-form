import {
  ReactNode,
  useEffect,
  useState,
  createContext,
  useContext,
  ComponentProps,
} from "react";
import { CSSTransition } from "react-transition-group";
import { createPortal } from "react-dom";
import { usePopper, Popper } from "react-popper";
import { clickOutside } from "helpers";

import styles from "./DropDown.module.scss";

type DropDownProps = {
  selector: string;
  children?: ReactNode;
  isOpen?: boolean;
  toggle?: () => void;
  zIndex?: number;
};

type DropDownContextType = {
  close: () => void;
};

const DropDownContext = createContext<DropDownContextType | null>(null);

export const DropDown = ({
  selector,
  children,
  isOpen,
  toggle = () => {},
}: DropDownProps) => {
  let [referenceElement, setReferenceElement] = useState<HTMLElement | null>(
    null
  );
  let [popperElement, setPopperElement] = useState<HTMLElement | null>(null);

  const {
    attributes,
    styles: style,
    state,
  } = usePopper(referenceElement, popperElement, {
    placement: "bottom-start",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 10],
        },
      },
    ],
  });

  const [show, setShow] = useState(false);

  const open = () => {
    setShow(true);
  };

  const close = () => {
    setShow(false);
  };

  useEffect(() => {
    if (selector.length === 0) return;

    const element = document.querySelector(selector) as HTMLElement;

    if (!element) return;

    element.onclick = typeof isOpen === "boolean" ? toggle : open;

    setReferenceElement(element);
  }, []);

  const onEntered = (element: HTMLElement) => {
    if (!element) return;

    clickOutside({
      ref: element,
      onClose: typeof isOpen === "boolean" ? toggle : close,
      doNotClose: (event) => {
        if (!referenceElement) return false;
        return referenceElement.contains(event);
      },
    });
  };

  return createPortal(
    <CSSTransition
      in={typeof isOpen === "boolean" ? isOpen : show}
      timeout={200}
      unmountOnExit
      classNames={{
        enterActive: styles.enter,
        exitActive: styles.exit,
      }}
      onEntered={onEntered}
    >
      <DropDownContext.Provider
        value={{ close: typeof isOpen === "boolean" ? toggle : close }}
      >
        <div
          ref={setPopperElement}
          className={styles.container}
          style={{ ...style.popper, width: state?.rects?.reference?.width }}
          {...attributes.popper}
        >
          <div className={styles.menu}>{children}</div>
        </div>
      </DropDownContext.Provider>
    </CSSTransition>,
    document.body
  );
};

type DropDownItemProps = {
  children?: ReactNode;
  onClick?: () => void;
  className?: string;
} & ComponentProps<"button">;

export const Item = ({
  children,
  onClick,
  className,
  ...props
}: DropDownItemProps) => {
  const { close } = useContext(DropDownContext) as DropDownContextType;

  const handleClick = () => {
    close();
    if (typeof onClick === "function") onClick();
  };

  return (
    <button
      className={`${styles.item} ${className ? className : ""}`.trim()}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
};

DropDown.Item = Item;

import {
  ReactNode,
  useEffect,
  useState,
  createContext,
  useContext,
  ComponentProps,
  MouseEvent,
} from "react";
import { CSSTransition } from "react-transition-group";
import { createPortal } from "react-dom";
import { usePopper } from "react-popper";
import { clickOutside } from "utils";

import styles from "./DropDown.module.scss";

type DropDownProps = {
  selector: string;
  children?: ReactNode;
  size?: "auto";
  placement?: Placement;
} & ComponentProps<"div">;

type DropDownContextType = {
  close: () => void;
};

type Position = "top" | "bottom" | "right" | "left";
type Side = "start" | "end";

type Placement = `${Position}-${Side}` | Position;

const DropDownContext = createContext<DropDownContextType | null>(null);

const DropDown = ({
  placement = "bottom-start",
  className,
  selector,
  children,
  size,
  ...props
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
    placement,
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

    element.onclick = open;

    setReferenceElement(element);
  }, [selector]);

  const onEntered = (element: HTMLElement) => {
    if (!element) return;

    clickOutside({
      ref: element,
      onClose: close,
      doNotClose: (event) => {
        if (!referenceElement) return false;
        return referenceElement.contains(event);
      },
    });
  };

  return createPortal(
    <CSSTransition
      in={show}
      timeout={200}
      unmountOnExit
      classNames={{
        enterActive: styles.enter,
        exitActive: styles.exit,
      }}
      onEntered={onEntered}
    >
      <DropDownContext.Provider value={{ close: close }}>
        <div
          ref={setPopperElement}
          className={`${styles.container} ${className || ""}`.trim()}
          style={{
            ...style.popper,
            ...(size === "auto" && { width: state?.rects?.reference?.width }),
          }}
          {...attributes.popper}
          {...props}
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
  onClick?: (event: MouseEvent) => void;
  className?: string;
} & ComponentProps<"button">;

export const Item = ({
  children,
  onClick,
  className,
  ...props
}: DropDownItemProps) => {
  const { close } = useContext(DropDownContext) as DropDownContextType;

  const handleClick = (event: MouseEvent): void => {
    close();
    if (typeof onClick === "function") onClick(event);
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

export default DropDown;

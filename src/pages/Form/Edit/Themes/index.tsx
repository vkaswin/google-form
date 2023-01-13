import { Fragment, useMemo, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { clickOutside } from "helpers";
import { usePopper } from "react-popper";

import styles from "./Themes.module.scss";

type ThemeProps = {
  colorCode?: string;
  bgCode?: string;
  onChange?: (name: "colorCode" | "bgCode", value: string) => void;
};

const Themes = ({ colorCode, bgCode, onChange }: ThemeProps) => {
  const colorCodes = {
    red: "#db4437",
    purple: "#673ab7",
    indigo: "#3f51b5",
  };

  const bgCodes = {
    red: ["#fae3e1", "#f6d0cd", "#f2beb9"],
    purple: ["#f0ebf8", "#e1d8f1", "#d1c4e9"],
    indigo: ["#eceef8", "#d9dcf0", "#c5cbe9"],
  };

  const [isOpen, setIsOpen] = useState(false);

  let [referenceElement, setReferenceElement] = useState<HTMLElement | null>(
    null
  );
  let [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);

  let {
    attributes,
    styles: style,
    state,
  } = usePopper(referenceElement, popperElement, {
    placement: "bottom",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 10],
        },
      },
    ],
  });

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const onEntered = (element: HTMLElement) => {
    if (!element) return;

    clickOutside({
      ref: element,
      onClose: toggle,
      doNotClose: (event) => {
        if (!referenceElement) return false;
        return referenceElement.contains(event);
      },
    });
  };

  const handleChange = (name: "colorCode" | "bgCode", value: string) => {
    onChange?.(name, value);
  };

  const selectedBg = useMemo(() => {
    return bgCodes["purple"];
  }, [colorCode]);

  // TODO USE HOOK FORM SETVALUES TO SET STATE

  return (
    <Fragment>
      <i
        ref={setReferenceElement}
        className="bx-customize"
        onClick={toggle}
      ></i>
      <CSSTransition
        in={isOpen}
        timeout={200}
        unmountOnExit
        classNames={{
          enterActive: styles.enter,
          exitActive: styles.exit,
        }}
        onEntered={onEntered}
      >
        <div
          ref={setPopperElement}
          className={styles.container}
          style={{ ...style.popper }}
          {...attributes.popper}
        >
          <div className={styles.color}>
            <b>Color</b>
            <ul className={styles.code_list}>
              {Object.entries(colorCodes).map(([color, code], index) => {
                return (
                  <li
                    key={index}
                    style={{ backgroundColor: code }}
                    onClick={() => handleChange("colorCode", code)}
                  >
                    {colorCode === code && (
                      <i className="bx-check" data-type="color"></i>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className={styles.bg}>
            <b>Background</b>
            <ul className={styles.code_list}>
              {selectedBg.map((code, index) => {
                return (
                  <li
                    key={index}
                    style={{ backgroundColor: code }}
                    onClick={() => handleChange("bgCode", code)}
                  >
                    {bgCode === code && (
                      <i className="bx-check" data-type="bg"></i>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </CSSTransition>
    </Fragment>
  );
};

export default Themes;

import { CSSProperties, Fragment, useMemo, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { clickOutside } from "helpers";
import { usePopper } from "react-popper";
import { ColorCodeList, BGCodeList, ColorCodes } from "types/Form";

import styles from "./Themes.module.scss";
import DropDown from "components/DropDown";

type ThemeProps = {
  colorCode?: ColorCodes;
  bgCode?: string;
  onChange?: (data: { colorCode: ColorCodes; bgCode: string }) => void;
};

const Themes = ({
  colorCode = "#673ab7",
  bgCode = "#f0ebf8",
  onChange,
}: ThemeProps) => {
  const colorCodes: ColorCodeList = {
    "#db4437": "Red",
    "#673ab7": "Purple",
    "#3f51b5": "Indigo",
    "#4285f4": "Blue",
    "#03a9f4": "Light Blue",
    "#00bcd4": "Cyan",
    "#ff5722": "Red Orange",
    "#ff9800": "Orange",
    "#009688": "Teal",
    "#4caf50": "Green",
    "#607d8b": "Blue Gray",
    "#9e9e9e": "Gray",
  };

  const bgCodes: BGCodeList = {
    "#db4437": ["#fae3e1", "#f6d0cd", "#f2beb9"],
    "#673ab7": ["#f0ebf8", "#e1d8f1", "#d1c4e9"],
    "#3f51b5": ["#eceef8", "#d9dcf0", "#c5cbe9"],
    "#4285f4": ["#e3edfd", "#d0e1fc", "#bdd4fb"],
    "#03a9f4": ["#d9f2fd", "#c0eafc", "#a7e1fb"],
    "#00bcd4": ["#d9f5f9", "#bfeef4", "#a6e8f0"],
    "#ff5722": ["#ffe6de", "#ffd5c8", "#ffc4b2"],
    "#ff9800": ["#fff0d9", "#ffe5bf", "#ffdba6"],
    "#009688": ["#d9efed", "#bfe5e1", "#a6dad5"],
    "#4caf50": ["#e4f3e5", "#d2ebd3", "#c0e3c2"],
    "#607d8b": ["#e7ecee", "#d7dfe2", "#c7d2d6"],
    "#9e9e9e": ["#f0f0f0", "#e7e7e7", "#dddddd"],
  };

  const [isOpen, setIsOpen] = useState(false);

  let [referenceElement, setReferenceElement] = useState<HTMLElement | null>(
    null
  );
  let [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);

  let { attributes, styles: style } = usePopper(
    referenceElement,
    popperElement,
    {
      placement: "bottom-end",
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [0, 10],
          },
        },
      ],
    }
  );

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

  const handleChange = (theme: { colorCode: ColorCodes; bgCode: string }) => {
    if (theme.colorCode !== colorCode) {
      theme.bgCode = bgCodes[theme.colorCode][0];
    }
    onChange?.({ colorCode: theme.colorCode, bgCode: theme.bgCode });
    toggle();
  };

  const selectedBg = useMemo(() => {
    return bgCodes[colorCode].concat("#f6f6f6");
  }, [colorCode]);

  return (
    <Fragment>
      <DropDown selector="#theme" placement="bottom-end">
        <div className={styles.container}>
          <div className={styles.color}>
            <b>Color</b>
            <ul
              className={styles.code_list}
              style={{ "--columns": 5 } as CSSProperties}
            >
              {Object.entries(colorCodes).map(([code, label], index) => {
                return (
                  <li
                    key={index}
                    style={{ backgroundColor: code }}
                    onClick={() =>
                      handleChange({ colorCode: code as ColorCodes, bgCode })
                    }
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
            <ul
              className={styles.code_list}
              style={{ "--columns": 3 } as CSSProperties}
            >
              {selectedBg.map((code, index) => {
                return (
                  <li
                    key={index}
                    style={{
                      backgroundColor: code,
                    }}
                    className={
                      code === "#f6f6f6" ? styles.highlight : "".trim()
                    }
                    onClick={() => handleChange({ colorCode, bgCode: code })}
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
      </DropDown>
    </Fragment>
  );
};

export default Themes;

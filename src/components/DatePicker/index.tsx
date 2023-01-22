import { useState, useMemo, ComponentProps } from "react";
import { clickOutside } from "utils";
import { FormRegister } from "types/UseForm";
import { CSSTransition } from "react-transition-group";
import { usePopper } from "react-popper";

import styles from "./DatePicker.module.scss";

type DatePickerProps = {
  register?: ReturnType<FormRegister>;
  onChange?: (value: string) => void;
} & ComponentProps<"input">;

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const dayNames = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

const todayDate = new Date().toISOString().split("T")[0];

const DatePicker = ({
  value,
  register,
  placeholder = "Select Date",
  disabled = false,
  onChange,
  ...props
}: DatePickerProps) => {
  const [date, setDate] = useState(new Date());

  const [isOpen, setIsOpen] = useState(false);

  let [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(
    null
  );
  let [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);

  let { attributes, styles: style } = usePopper(
    referenceElement,
    popperElement,
    {
      placement: "bottom-start",
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

  const handleNext = () => {
    if (date.getMonth() === 11) {
      setDate(
        new Date(new Date(date.setMonth(0)).setFullYear(date.getFullYear() + 1))
      );
    } else {
      setDate(new Date(date.setMonth(date.getMonth() + 1)));
    }
  };

  const handleBack = () => {
    if (date.getMonth() === 0) {
      setDate(
        new Date(
          new Date(date.setMonth(11)).setFullYear(date.getFullYear() - 1)
        )
      );
    } else {
      setDate(new Date(date.setMonth(date.getMonth() - 1)));
    }
  };

  const handleSelect = (value: string) => {
    onChange?.(value);
    toggle();
  };

  const dates = useMemo<string[]>(() => {
    const daysInMonth = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDate();

    const dates = [];

    for (let i = 1; i < daysInMonth; i++) {
      dates.push(
        `${date.getFullYear()}-${(date.getMonth() + 1)
          .toString()
          .padStart(2, "0")}-${i.toString().padStart(2, "0")}`
      );
    }

    return dates;
  }, [date]);

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

  return (
    <div ref={setReferenceElement} className={styles.container}>
      <div tabIndex={-1} {...register} {...props}>
        <div
          className={`${styles.field} ${
            disabled ? styles.disabled : ""
          }`.trim()}
          onClick={toggle}
        >
          <span> {value || placeholder}</span>
          <i className="bx-calendar-event"></i>
        </div>
        {!disabled && (
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
              className={styles.wrapper}
              style={{ ...style.popper }}
              {...attributes.popper}
            >
              <div className={styles.month}>
                <div className={styles.icon} onClick={handleBack}>
                  <i className="bx-chevron-left"></i>
                </div>
                <div>
                  <b>
                    {monthNames[date.getMonth()]} {date.getFullYear()}
                  </b>
                </div>
                <div className={styles.icon} onClick={handleNext}>
                  <i className="bx-chevron-right"></i>
                </div>
              </div>
              <div className={styles.weeks}>
                {dayNames.map((day, index) => {
                  return <b key={index}>{day}</b>;
                })}
              </div>
              <div className={styles.days}>
                {dates.map((date, index) => {
                  return (
                    <span
                      key={index}
                      className={`${
                        date === todayDate ? styles.highlight : ""
                      } ${date === value ? styles.active : ""}`.trim()}
                      onClick={() => handleSelect(date)}
                    >
                      {index + 1}
                    </span>
                  );
                })}
              </div>
            </div>
          </CSSTransition>
        )}
      </div>
    </div>
  );
};

export default DatePicker;

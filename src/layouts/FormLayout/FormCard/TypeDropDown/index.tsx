import { Fragment } from "react";
import DropDown from "components/DropDown";
import { FormIndexes, FormTypeOption, HandleFormAction } from "types/Form";

import styles from "./TypeDropDown.module.scss";

type OptionsProps = {
  id: string;
  options: FormTypeOption[];
  indexes: Omit<FormIndexes, "optionIndex">;
  selectedOption: FormTypeOption | undefined;
  handleFormAction: HandleFormAction;
};

const TypeDropDown = ({
  id,
  options,
  selectedOption,
  indexes,
  handleFormAction,
}: OptionsProps) => {
  return (
    <Fragment>
      <div id={`option-${id}`} className={styles.wrapper}>
        <div className={styles.option}>
          <i className={selectedOption?.icon}></i>
          <span>{selectedOption?.label}</span>
        </div>
        <i className="bxs-down-arrow"></i>
      </div>
      <DropDown selector={`#option-${id}`} size="auto">
        {options.map((option) => {
          return (
            <DropDown.Item
              key={`${option.label}-${id}`}
              onClick={() =>
                handleFormAction("type", indexes, { type: option.type })
              }
            >
              <i className={option.icon}></i>
              <span>{option.label}</span>
            </DropDown.Item>
          );
        })}
      </DropDown>
    </Fragment>
  );
};

export default TypeDropDown;

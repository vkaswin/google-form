import { Fragment } from "react";
import DropDown from "components/DropDown";
import { FormTypes, FormIndexes, FormTypeOption } from "types/Form";

import styles from "./TypeDropDown.module.scss";

type OptionsProps = {
  id: string;
  options: FormTypeOption[];
  selectedOption: FormTypeOption | undefined;
  handleFormType: FormTypes["handleFormType"];
} & FormIndexes;

const TypeDropDown = ({
  id,
  options,
  selectedOption,
  fieldindex,
  sectionindex,
  handleFormType,
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
                handleFormType(sectionindex, fieldindex, option.type)
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

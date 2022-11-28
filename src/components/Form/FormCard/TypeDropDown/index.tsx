import { Fragment } from "react";
import { DropDown } from "components/DropDown";
import { FormContextType, FormTypeOption } from "types/Form";

import styles from "./TypeDropDown.module.scss";

type OptionsProps = {
  id: string;
  type: string;
  options: FormTypeOption[];
  selectedOption: FormTypeOption | undefined;
  handleChangeForm: FormContextType["handleChangeForm"];
};

export const TypeDropDown = ({
  id,
  options,
  selectedOption,
  handleChangeForm,
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
              onClick={() => handleChangeForm("type", id, option.type)}
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

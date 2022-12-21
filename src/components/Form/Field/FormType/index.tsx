import { Fragment } from "react";
import DropDown from "components/DropDown";
import { FormIndexes, FormTypeOption } from "types/Form";

import styles from "./FormType.module.scss";

type FormTypeProps = {
  id: string;
  options: FormTypeOption[];
  selectedOption: FormTypeOption | undefined;
  onChange: (name: string, value: any) => void;
} & FormIndexes;

const FormType = ({
  id,
  options,
  selectedOption,
  sectionIndex,
  fieldIndex,
  onChange,
}: FormTypeProps) => {
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
                onChange(
                  `sections.${sectionIndex}.fields.${fieldIndex}.type`,
                  option.type
                )
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

export default FormType;

import { Fragment, useMemo } from "react";
import { FormField } from "types/Form";
import Input from "components/Input";
import Radio from "components/Radio";
import CheckBox from "components/CheckBox";
import Select from "components/Select";
import { useFormContext } from "context/form";

import styles from "./MultiOptions.module.scss";

type DropDownOption = { label: string; value: string };

const MultiOptions = ({ id, type, options, other, rules }: FormField) => {
  const { register, setValue, formValues } = useFormContext();

  let dropdownOptions = useMemo<DropDownOption[] | undefined>(() => {
    if (type !== "dropdown") return;

    return options?.map((option) => {
      return { label: option, value: option };
    });
  }, [type, options]);

  const field = register(id, rules);
  const value = formValues[id];

  return (
    <div className={styles.container}>
      {(type === "checkbox" || type === "radio") &&
        options?.map((option, index) => {
          let props = {
            key: index,
            id: `${id}${index}`,
            label: option,
            value: option,
            register: field,
            defaultChecked:
              type === "checkbox"
                ? Array.isArray(value) && value.includes(option)
                : value === option,
          };

          const Component = type === "checkbox" ? CheckBox : Radio;

          return <Component {...props} />;
        })}

      {type === "dropdown" && (
        <Select
          className={styles.select_field}
          size="auto"
          options={dropdownOptions}
          value={value || ""}
          register={field}
          onChange={(value) => setValue(id, value)}
        />
      )}

      {other?.enabled && (
        <Fragment>
          <div className={styles.option_field}>
            <div>
              {type === "checkbox" && (
                <CheckBox
                  id="checkbox-other-option"
                  placeholder="Enter here"
                  label="Other"
                  defaultChecked={other.checked}
                  register={field}
                />
              )}
              {type === "radio" && (
                <Radio
                  id="radio-other-option"
                  name={id}
                  label="Other"
                  defaultChecked={other.checked}
                  register={field}
                />
              )}
              <Input
                placeholder="Enter here"
                //    register={field}
              />
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default MultiOptions;

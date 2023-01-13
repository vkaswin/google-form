import { ComponentProps, ReactNode, useMemo } from "react";
import { FormField as FormFieldType } from "types/Form";
import TextArea from "components/TextArea";
import Input from "components/Input";
import DatePicker from "components/DatePicker";
import FileInput from "components/FileInput";
import MutiOptions from "./MutiOptions";
import { useFormContext } from "context/form";

import styles from "./Field.module.scss";

type FieldProps = {
  field: FormFieldType;
} & ComponentProps<"div">;

const Field = ({ field, className, ...props }: FieldProps) => {
  const { register, setValue, formValues, formErrors } = useFormContext();

  const error = formErrors?.[field.id];
  const value = formValues[field.id];
  const registerField = register(field.id, field.rules);

  let component = useMemo<ReactNode>(() => {
    if (
      field.type === "checkbox" ||
      field.type === "radio" ||
      field.type === "dropdown"
    ) {
      return <MutiOptions {...field} />;
    } else if (field.type === "input") {
      return (
        <Input
          placeholder="Short answer text"
          defaultValue={value}
          register={registerField}
        />
      );
    } else if (field.type === "textarea") {
      return (
        <TextArea
          placeholder="Long answer text"
          defaultValue={value}
          register={registerField}
        />
      );
    } else if (field.type === "date") {
      return (
        <DatePicker
          register={registerField}
          value={formValues[field.id]}
          onChange={(value) => setValue(field.id, value)}
        />
      );
    } else if (field.type === "file") {
      return <FileInput />;
    } else {
      return null;
    }
  }, [{ ...field }]);

  return (
    <div className={styles.container} {...{ "data-error": !!error }} {...props}>
      <div className={styles.wrapper}>
        <div className={styles.field_label}>
          <span>{field.title}</span>
          <span className={styles.asterisk}>*</span>
        </div>
        {field?.description?.enabled && (
          <div
            dangerouslySetInnerHTML={{ __html: field.description.value }}
          ></div>
        )}
        <div className={styles.field} data-type={field.type}>
          {component}
        </div>
        {error && (
          <div className={styles.error_msg}>
            <i className="bx-error-circle"></i>
            <span>{error}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Field;

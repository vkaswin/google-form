import { Fragment } from "react";
import { useOutletContext } from "react-router-dom";
import { FormContextType } from "types/Form";

import { FormField } from "./FormField";

import styles from "./Edit.module.scss";

const EditForm = () => {
  const {
    formDetail: { theme, fields },
    selectedId,
    handleClickForm,
    handleSelectType,
  } = useOutletContext<FormContextType>();

  return (
    <Fragment>
      {fields.map((field) => {
        return (
          <FormField
            key={field.id}
            selectedId={selectedId}
            handleClickForm={handleClickForm}
            handleSelectType={handleSelectType}
            {...field}
          />
        );
      })}
    </Fragment>
  );
};

export default EditForm;

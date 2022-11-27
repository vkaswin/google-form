import { Fragment } from "react";
import { useOutletContext } from "react-router-dom";
import { FormContextType } from "types/Form";
import { FormCard } from "components";

import styles from "./Edit.module.scss";

const EditForm = () => {
  const {
    formDetail: { theme, fields },
    selectedId,
    handleClickForm,
    handleChange,
  } = useOutletContext<FormContextType>();

  return (
    <Fragment>
      {fields.map((field) => {
        return (
          <FormCard
            key={field.id}
            selectedId={selectedId}
            handleClickForm={handleClickForm}
            handleChange={handleChange}
            readOnly={true}
            {...field}
          />
        );
      })}
    </Fragment>
  );
};

export default EditForm;

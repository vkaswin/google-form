import { Fragment } from "react";
import { useOutletContext } from "react-router-dom";
import { FormContextType } from "types/Form";
import { FormCard } from "./FormCard";

type FormProps = {} & FormContextType;

export const Form = ({}) => {
  const {
    formDetail: { theme, fields },
    selectedId,
    handleClickForm,
    handleChangeForm,
    handleDeleteForm,
    handleDuplicateForm,
    handleMoreOptions,
  } = useOutletContext<FormContextType>();

  return (
    <Fragment>
      {fields.map((field) => {
        return (
          <FormCard
            key={field.id}
            selectedId={selectedId}
            readOnly={true}
            handleClickForm={handleClickForm}
            handleChangeForm={handleChangeForm}
            handleDeleteForm={handleDeleteForm}
            handleDuplicateForm={handleDuplicateForm}
            handleMoreOptions={handleMoreOptions}
            {...field}
          />
        );
      })}
    </Fragment>
  );
};

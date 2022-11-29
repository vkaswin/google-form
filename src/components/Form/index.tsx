import { Fragment } from "react";
import { useOutletContext } from "react-router-dom";
import { FormContextType } from "types/Form";
import { FormCard } from "./FormCard";
import { FormHeader } from "./FormHeader";

export const Form = () => {
  const {
    formDetail: { theme, header, sections },
    selectedId,
    handleClickForm,
    handleChangeForm,
    handleDeleteForm,
    handleDuplicateForm,
    handleMoreOptions,
    handleFormType,
    handleFormHeader,
    handleDeleteOptions,
    handleDeleteOther,
  } = useOutletContext<FormContextType>();

  return (
    <Fragment>
      <FormHeader
        selectedId={selectedId}
        handleClickForm={handleClickForm}
        handleFormHeader={handleFormHeader}
        {...header}
      />
      {sections.map((section, sectionIndex) => {
        return (
          <Fragment key={sectionIndex}>
            {section.map((field, fieldIndex) => {
              return (
                <FormCard
                  key={field.id}
                  selectedId={selectedId}
                  readOnly={true}
                  fieldindex={fieldIndex.toString()}
                  sectionindex={sectionIndex.toString()}
                  handleClickForm={handleClickForm}
                  handleChangeForm={handleChangeForm}
                  handleDeleteForm={handleDeleteForm}
                  handleDuplicateForm={handleDuplicateForm}
                  handleMoreOptions={handleMoreOptions}
                  handleFormType={handleFormType}
                  handleDeleteOptions={handleDeleteOptions}
                  handleDeleteOther={handleDeleteOther}
                  {...field}
                />
              );
            })}
          </Fragment>
        );
      })}
    </Fragment>
  );
};

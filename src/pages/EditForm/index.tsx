import { Fragment } from "react";
import { useForm } from "hooks/useForm";
import { FormHeader } from "./FormHeader";
import { FormCard } from "./FormCard";

import styles from "./Edit.module.scss";

const EditForm = () => {
  let {
    selectedId,
    formDetail: { header, sections, theme },
    handleFocusHeader,
    handleFormAction,
    handleFormChange,
    handleFormHeader,
  } = useForm();

  return (
    <Fragment>
      <div className={styles.header}>
        <div className={styles.title}>
          <span>Google Form</span>
        </div>
      </div>
      <div className={styles.container}>
        <FormHeader
          field={header}
          selectedId={selectedId}
          handleFormHeader={handleFormHeader}
          onClick={handleFocusHeader}
        />
        {sections.map((section, sectionIndex) => {
          return (
            <Fragment key={sectionIndex}>
              {section.map((field, fieldIndex) => {
                let sectionHeader =
                  fieldIndex === 0 && sections.length > 1
                    ? `Section ${sectionIndex + 1} of ${sections.length}`
                    : null;
                let indexes = { fieldIndex, sectionIndex };
                return (
                  <FormCard
                    key={field.id}
                    field={field}
                    selectedId={selectedId}
                    sectionHeader={sectionHeader}
                    indexes={indexes}
                    handleFormChange={handleFormChange}
                    handleFormAction={handleFormAction}
                    onClick={() => handleFormAction("focus-form", indexes)}
                    isEditPage={true}
                  />
                );
              })}
            </Fragment>
          );
        })}
      </div>
    </Fragment>
  );
};

export default EditForm;
// bx-redo
// bx-undo
// bx-show
// bx-customize
// bx-trash
// bx-printer
// bx-link-alt

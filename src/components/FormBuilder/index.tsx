import { Fragment, useState, useRef, useEffect } from "react";
import {
  FormDragValue,
  HandleDragOver,
  HandleDrop,
  HandleDragLeave,
  HandleDragEnter,
  HandleDragStart,
  ColorCodes,
  FormPages,
} from "types/Form";
import Section from "./Section";
import Field from "./Field";
import { useForm } from "hooks/useForm";
import { FormProvider } from "context/form";
import { setFormTheme } from "helpers";
import { formData } from "json";

import styles from "./FormBuilder.module.scss";

let initialDragRef = {
  source: {
    droppableId: null,
    draggableId: null,
  },
  destination: {
    droppableId: null,
    draggableId: null,
  },
  dragElement: null,
};

type FormBuilderProps = FormPages;

const FormBuilder = (formPage: FormBuilderProps) => {
  let [selectedId, setSelectedId] = useState<string | null>(null);

  let [activeSection, setActiveSection] = useState<number>(0);

  let [dragId, setDragId] = useState<string | null>(null);

  let { current: dragRef } = useRef<FormDragValue>(initialDragRef);

  let form = useForm(formData);

  let { formValues, setFormValues, reset, handleSubmit } = form;

  let { sections = [], colorCode, bgCode } = formValues;

  useEffect(() => {
    getFormDetails();
  }, []);

  useEffect(() => {
    if (!colorCode || !bgCode) return;
    setFormTheme({ colorCode, bgCode });
  }, [colorCode, bgCode]);

  const getFormDetails = () => {
    try {
      setFormValues(formData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDragStart: HandleDragStart = (droppableId, draggableId) => {
    let dragElement = document.querySelector(
      `[data-draggable-id='${draggableId}'][data-droppable-id='${droppableId}']`
    ) as HTMLElement;

    dragRef = {
      ...dragRef,
      source: { droppableId, draggableId },
      dragElement,
    };
    setTimeout(() => {
      if (!dragElement) return;
      dragElement.style.visibility = "hidden";
    }, 0);
  };

  const handleDragEnter: HandleDragEnter = (
    event,
    droppableId,
    draggableId
  ) => {
    event.stopPropagation();
    let element = document.querySelector(
      `[data-draggable-id='${draggableId}'][data-droppable-id='${droppableId}']`
    ) as HTMLElement;
    dragRef = {
      ...dragRef,
      destination: { droppableId, draggableId },
    };
  };

  const handleDragLeave: HandleDragLeave = (
    event,
    droppableId,
    draggableId
  ) => {
    event.stopPropagation();
  };

  const handleDragEnd = () => {
    let { dragElement } = dragRef;

    if (dragElement) {
      dragElement.style.visibility = "visible";
    }
    setDragId(null);
    setTimeout(() => {
      dragRef = initialDragRef;
    }, 0);
  };

  const handleDrop: HandleDrop = () => {
    let { source, destination } = dragRef;

    if (
      typeof source.draggableId !== "number" ||
      typeof source.droppableId !== "number" ||
      typeof destination.draggableId !== "number" ||
      typeof destination.droppableId !== "number"
    )
      return;

    let form = { ...formValues };

    form.sections[destination.droppableId].fields.splice(
      destination.draggableId,
      0,
      form.sections[source.droppableId].fields.splice(source.draggableId, 1)[0]
    );

    setFormValues(form);
  };

  const handleDragOver: HandleDragOver = (e) => {
    // By default, data/elements cannot be dropped in other elements.
    // To allow a drop, we must prevent the default handling of the element
    e.preventDefault();
  };

  const handleTheme = (theme: { colorCode: ColorCodes; bgCode: string }) => {
    setFormValues({ ...formValues, ...theme });
  };

  const onSubmit = (data: any, action: "next" | "back" | "submit") => {
    if (action === "next") {
      setActiveSection((section) => section + 1);
    } else if (action == "back") {
      setActiveSection((section) => section - 1);
    } else {
      submitResponse(data);
    }
  };

  const submitResponse = (data: any) => {
    try {
    } catch (error) {}
  };

  const onInvalid = (errors: any, action?: "next" | "back") => {
    if (action === "back") {
      setActiveSection((section) => section - 1);
    } else if (action === "next") {
      let keys = Object.keys(errors);
      let hasError = formData.sections[activeSection].fields.some(({ id }) =>
        keys.includes(id)
      );
      if (hasError) return;
      setActiveSection((section) => section + 1);
    }
  };

  const clearForm = () => {
    reset();
    setActiveSection(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  let { isEdit, isFill, isPreview } = formPage;

  return (
    <FormProvider {...form}>
      <div className={styles.container}>
        {sections.map(({ id, title, description, fields }, sectionIndex) => {
          if (!isPreview && !(sectionIndex === activeSection)) return null;

          let sectionHeader =
            sections.length > 1
              ? `Section ${sectionIndex + 1} of ${sections.length}`
              : undefined;

          return (
            <Fragment key={sectionIndex}>
              <Section
                id={id}
                title={title}
                selectedId={selectedId}
                description={description}
                sectionIndex={sectionIndex}
                sectionHeader={sectionHeader}
                formPage={formPage}
                onClick={() => setSelectedId(id)}
              />
              <div
                className={styles.wrapper}
                {...(isEdit && {
                  "data-droppable-id": sectionIndex,
                  onDragEnter: (e) => handleDragEnter(e, sectionIndex, 0),
                  onDragLeave: (e) => handleDragLeave(e, sectionIndex, 0),
                  onDragOver: handleDragOver,
                  onDrop: handleDrop,
                })}
              >
                {fields.map((field, fieldIndex) => {
                  return (
                    <Field
                      key={field.id}
                      field={field}
                      tabIndex={-1}
                      sectionIndex={sectionIndex}
                      fieldIndex={fieldIndex}
                      formPage={formPage}
                      {...(isEdit && {
                        "data-draggable-id": fieldIndex,
                        "data-droppable-id": sectionIndex,
                        selectedId: selectedId,
                        draggable: dragId === field.id,
                        onClick: () => setSelectedId(field.id),
                        onDragStart: () =>
                          handleDragStart(sectionIndex, fieldIndex),
                        onDragLeave: (e) =>
                          handleDragLeave(e, sectionIndex, fieldIndex),
                        onDragEnter: (e) =>
                          handleDragEnter(e, sectionIndex, fieldIndex),
                        onDragEnd: handleDragEnd,
                        setDragId: setDragId,
                      })}
                    />
                  );
                })}
              </div>
            </Fragment>
          );
        })}
        {isFill && (
          <div className={styles.cta}>
            <div>
              {activeSection > 0 && (
                <button
                  className={styles.btn_navigate}
                  onClick={handleSubmit(
                    (data) => onSubmit(data, "back"),
                    (errors) => onInvalid(errors, "back")
                  )}
                >
                  Back
                </button>
              )}
              {activeSection < sections.length - 1 && (
                <button
                  className={styles.btn_navigate}
                  onClick={handleSubmit(
                    (data) => onSubmit(data, "next"),
                    (errors) => onInvalid(errors, "next")
                  )}
                >
                  Next
                </button>
              )}
              {activeSection === sections.length - 1 && (
                <button
                  className={styles.btn_submit}
                  onClick={handleSubmit(
                    (data) => onSubmit(data, "submit"),
                    onInvalid
                  )}
                >
                  Submit
                </button>
              )}
            </div>
            <button className={styles.btn_clear} onClick={clearForm}>
              Clear Form
            </button>
          </div>
        )}
        <div className={styles.footer}>
          <span>Google Form</span>
        </div>
      </div>
    </FormProvider>
  );
};

export default FormBuilder;

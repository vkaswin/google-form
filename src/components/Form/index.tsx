import {
  Fragment,
  useEffect,
  useState,
  useMemo,
  useRef,
  ReactNode,
  KeyboardEvent,
} from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  FormPages,
  FormParams,
  FormDetail,
  FormDragValue,
  HandleDragOver,
  HandleDrop,
  HandleDragLeave,
  HandleDragEnter,
  HandleDragStart,
} from "types/Form";
import Section from "./Section";
import Field from "./Field";
import { useForm, FromProvider } from "hooks/useForm";
import { formData } from "./formData";

import styles from "./Form.module.scss";
import { debounce, isEmptyObject } from "helpers/index";

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

type FormProps = {
  children?: ReactNode;
};

const Form = ({ children }: FormProps) => {
  let form = useForm<FormDetail>();

  const { formId } = useParams<FormParams>();

  const { pathname } = useLocation();

  let [selectedId, setSelectedId] = useState<string | null>(null);

  let [activeSection, setActiveSection] = useState<number>(0);

  let [dragId, setDragId] = useState<string | null>(null);

  const formPage = useMemo<FormPages>(() => {
    return {
      isPreview: pathname.includes("preview"),
      isEdit: pathname.includes("edit"),
      isFill: pathname.includes("fill"),
    };
  }, [pathname]);

  let dragRef = useRef<FormDragValue>(initialDragRef);

  let { formValues, formErrors, setFormValues, handleSubmit } = form;

  let { sections = [] } = formValues;

  console.log(formErrors);

  useEffect(() => {
    getFormDetails();
  }, [formId]);

  useEffect(() => {
    window.addEventListener("keydown", debounce(handleKeyPress, 500));
    return () =>
      window.removeEventListener("keydown", debounce(handleKeyPress, 500));
  }, []);

  const getFormDetails = (): void => {
    try {
      setFormValues(formData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyPress = (e: any) => {
    debugger;
    console.log(formErrors);
  };

  const handleDragStart: HandleDragStart = (droppableId, draggableId) => {
    let dragElement = document.querySelector(
      `[data-draggable-id='${draggableId}'][data-droppable-id='${droppableId}']`
    ) as HTMLElement;

    dragRef.current = {
      ...dragRef.current,
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
    dragRef.current = {
      ...dragRef.current,
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
    let { dragElement } = dragRef.current;

    if (dragElement) {
      dragElement.style.visibility = "visible";
    }
    setDragId(null);
    setTimeout(() => {
      dragRef.current = initialDragRef;
    }, 0);
  };

  const handleDrop: HandleDrop = () => {
    let { source, destination } = dragRef.current;

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

  const onSubmit = (data: any, action: "next" | "back" | "submit") => {
    if (action === "next") {
      setActiveSection((section) => section + 1);
    } else if (action == "back") {
      setActiveSection((section) => section - 1);
    } else {
      console.log("final step", data);
    }
  };

  const onInvalid = (errors: any, action?: "next" | "back") => {
    if (action === "back") {
      setActiveSection((section) => section - 1);
    } else if (
      action === "next" &&
      isEmptyObject(errors?.sections?.[activeSection])
    ) {
      setActiveSection((section) => section + 1);
    }
  };

  return (
    <FromProvider {...form}>
      <div>{children}</div>
      <div className={styles.container}>
        {sections.map(({ id, title, description, fields }, sectionIndex) => {
          if (!(formPage.isFill ? sectionIndex === activeSection : true))
            return null;

          let sectionHeader =
            sections.length > 1 && !formPage.isFill
              ? `Section ${sectionIndex + 1} of ${sections.length}`
              : undefined;

          return (
            <Fragment key={sectionIndex}>
              <Section
                id={id}
                title={title}
                formPage={formPage}
                selectedId={selectedId}
                description={description}
                disabled={!formPage.isEdit}
                sectionIndex={sectionIndex}
                sectionHeader={sectionHeader}
                {...(formPage.isEdit && {
                  onClick: () => setSelectedId(id),
                })}
              />
              <div
                className={styles.wrapper}
                data-droppable-id={sectionIndex}
                onDragEnter={(e) => handleDragEnter(e, sectionIndex, 0)}
                onDragLeave={(e) => handleDragLeave(e, sectionIndex, 0)}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                {fields.length > 0 ? (
                  fields.map((field, fieldIndex) => {
                    return (
                      <Field
                        key={field.id}
                        field={field}
                        tabIndex={-1}
                        sectionIndex={sectionIndex}
                        fieldIndex={fieldIndex}
                        draggable={dragId === field.id}
                        formPage={formPage}
                        selectedId={selectedId}
                        data-draggable-id={fieldIndex}
                        data-droppable-id={sectionIndex}
                        setDragId={setDragId}
                        onDragStart={() =>
                          handleDragStart(sectionIndex, fieldIndex)
                        }
                        onDragEnter={(e) =>
                          handleDragEnter(e, sectionIndex, fieldIndex)
                        }
                        onDragLeave={(e) =>
                          handleDragLeave(e, sectionIndex, fieldIndex)
                        }
                        onDragEnd={handleDragEnd}
                        {...(formPage.isEdit && {
                          onClick: () => setSelectedId(field.id),
                        })}
                      />
                    );
                  })
                ) : (
                  <div className={styles.empty_field}>
                    <span>No Fields</span>
                  </div>
                )}
              </div>
            </Fragment>
          );
        })}
        {formPage.isFill && (
          <div className={styles.fill_cta}>
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
            <button className={styles.btn_clear}>Clear Form</button>
          </div>
        )}
      </div>
      <div className={styles.footer}>
        <span>Google Forms</span>
      </div>
    </FromProvider>
  );
};

export default Form;

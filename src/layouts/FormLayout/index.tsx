import { Fragment, useState, useRef, useMemo } from "react";
import { useLocation, useParams, Outlet } from "react-router-dom";
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
  FormContext as FormContextType,
} from "types/Form";
import Section from "./Section";
import Field from "./Field";
import { useForm } from "hooks/useForm";
import { isEmptyObject } from "helpers";
import PageNotFound from "pages/404";
import { FormContext } from "./context";

import styles from "./FormLayout.module.scss";

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

const formData: FormDetail = {
  theme: "dark",
  sections: [
    {
      id: crypto.randomUUID(),
      title: "Loreum Ispum",
      description: "Loreum Ispum",
      fields: [
        {
          id: crypto.randomUUID(),
          question: "Loreum Ipsum",
          type: "input",
          value: "",
          description: {
            enabled: false,
            value: "",
          },
          rules: {
            required: { value: true },
          },
        },
        {
          id: crypto.randomUUID(),
          question: "Loreum Ipsum",
          type: "textarea",
          value: "",
          description: {
            enabled: false,
            value: "",
          },
          rules: {
            required: { value: true },
          },
        },
        {
          id: crypto.randomUUID(),
          question: "Gender",
          type: "radio",
          value: "",
          options: ["Male", "Female"],
          other: {
            enabled: true,
            checked: false,
            value: "",
          },
          description: {
            enabled: false,
            value: "",
          },
          rules: {
            required: { value: true },
          },
        },
        {
          id: crypto.randomUUID(),
          question: "Hobbies",
          type: "checkbox",
          value: [],
          options: ["Football", "Basketball", "Cricket"],
          other: {
            enabled: true,
            checked: false,
            value: "",
          },
          description: {
            enabled: false,
            value: "",
          },
          rules: {
            required: { value: true },
          },
        },
        {
          id: crypto.randomUUID(),
          question: "Location",
          type: "dropdown",
          value: "",
          options: ["Chennai", "Hyderabad", "Mumbai", "Delhi", "Bangalore"],
          description: {
            enabled: false,
            value: "",
          },
          rules: {
            required: { value: true },
          },
        },
      ],
    },
    {
      id: crypto.randomUUID(),
      title: "Loreum Ispum",
      description: "Loreum Ispum",
      fields: [
        {
          id: crypto.randomUUID(),
          question: "Loreum Ipsum",
          type: "input",
          value: "",
          description: {
            enabled: true,
            value: "",
          },
          rules: { required: { value: true } },
        },
        {
          id: crypto.randomUUID(),
          question: "Loreum Ipsum",
          type: "input",
          value: "",
          description: {
            enabled: false,
            value: "",
          },
          rules: { required: { value: true } },
        },
        {
          id: crypto.randomUUID(),
          question: "Gender",
          type: "radio",
          value: "",
          options: ["Male", "Female"],
          other: {
            enabled: true,
            checked: false,
            value: "",
          },
          description: {
            enabled: false,
            value: "",
          },
          rules: { required: { value: true } },
        },
        {
          id: crypto.randomUUID(),
          question: "Hobbies",
          type: "checkbox",
          value: [],
          options: ["Football", "Basketball", "Cricket"],
          other: {
            enabled: true,
            checked: false,
            value: "",
          },
          description: {
            enabled: false,
            value: "",
          },
          rules: { required: { value: true } },
        },
        {
          id: crypto.randomUUID(),
          question: "Location",
          type: "dropdown",
          value: "",
          options: ["Chennai", "Hyderabad", "Mumbai", "Delhi", "Bangalore"],
          description: {
            enabled: false,
            value: "",
          },
          rules: { required: { value: true } },
        },
      ],
    },
  ],
};

const FormLayout = () => {
  const { formId } = useParams<FormParams>();

  const { pathname } = useLocation();

  let [formDetail, setFormDetail] = useState(formData);

  let [selectedId, setSelectedId] = useState<string | null>(null);

  let [activeSection, setActiveSection] = useState<number>(0);

  let [dragId, setDragId] = useState<string | null>(null);

  let dragRef = useRef<FormDragValue>(initialDragRef);

  let form = useForm();

  let { handleSubmit } = form;

  let { sections = [] } = formDetail;

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

    let form = { ...formDetail };

    form.sections[destination.droppableId].fields.splice(
      destination.draggableId,
      0,
      form.sections[source.droppableId].fields.splice(source.draggableId, 1)[0]
    );

    setFormDetail(form);
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

  const formPage = useMemo<FormPages>(() => {
    let path = pathname.split("/")?.[3];
    return {
      isPreview: path ? path === "preview" : false,
      isEdit: path ? path === "edit" : false,
      isFill: path ? path === "fill" : false,
    };
  }, [pathname]);

  let context: FormContextType = { ...form };

  if (!formId || (!formPage.isEdit && !formPage.isFill && !formPage.isPreview))
    return <PageNotFound />;

  return (
    <FormContext.Provider value={context}>
      <Outlet />
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
    </FormContext.Provider>
  );
};

export default FormLayout;

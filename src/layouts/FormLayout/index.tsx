import {
  Fragment,
  DragEvent,
  useCallback,
  useEffect,
  useState,
  useMemo,
  useRef,
} from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";
import {
  FormPages,
  FormParams,
  FormDetail,
  HandleFormAction,
  HandleFormChange,
  HandleFormSection,
  HandleFormError,
} from "types/Form";
import FormField from "./FormField";
import FormSection from "./FormSection";
import { useAuth } from "hooks";
import { shuffleArray } from "helpers/index";

import styles from "./FormLayout.module.scss";

const FormLayout = () => {
  const { formId } = useParams<FormParams>();

  const { user } = useAuth();

  const { pathname } = useLocation();

  let [formDetail, setFormDetail] = useState<FormDetail>({
    theme: "dark",
    sections: [
      //   {
      //     id: crypto.randomUUID(),
      //     title: "Loreum Ispum",
      //     description: "Loreum Ispum",
      //     fields: [],
      //   },
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
            required: true,
            error: false,
            description: {
              enabled: false,
              value: "",
            },
          },
          {
            id: crypto.randomUUID(),
            question: "Loreum Ipsum",
            type: "file",
            value: "",
            required: true,
            error: false,
            description: {
              enabled: false,
              value: "",
            },
          },
          {
            id: crypto.randomUUID(),
            question: "Gender",
            type: "radio",
            value: "",
            required: true,
            error: false,
            options: ["Male", "Female"],
            other: {
              enabled: true,
              checked: false,
              error: false,
              value: "",
            },
            description: {
              enabled: false,
              value: "",
            },
          },
          {
            id: crypto.randomUUID(),
            question: "Hobbies",
            type: "checkbox",
            value: [],
            required: true,
            error: false,
            options: ["Football", "Basketball", "Cricket"],
            other: {
              enabled: true,
              checked: false,
              error: false,
              value: "",
            },
            description: {
              enabled: false,
              value: "",
            },
          },
          {
            id: crypto.randomUUID(),
            question: "Location",
            type: "dropdown",
            value: "",
            required: true,
            error: false,
            options: ["Chennai", "Hyderabad", "Mumbai", "Delhi", "Bangalore"],
            description: {
              enabled: false,
              value: "",
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
            required: false,
            error: false,
            description: {
              enabled: false,
              value: "",
            },
          },
          {
            id: crypto.randomUUID(),
            question: "Loreum Ipsum",
            type: "file",
            value: "",
            required: true,
            error: false,
            description: {
              enabled: false,
              value: "",
            },
          },
          {
            id: crypto.randomUUID(),
            question: "Gender",
            type: "radio",
            value: "",
            required: true,
            error: true,
            options: ["Male", "Female"],
            other: {
              enabled: true,
              checked: false,
              error: false,
              value: "",
            },
            description: {
              enabled: false,
              value: "",
            },
          },
          {
            id: crypto.randomUUID(),
            question: "Hobbies",
            type: "checkbox",
            value: [],
            required: true,
            error: false,
            options: ["Football", "Basketball", "Cricket"],
            other: {
              enabled: true,
              checked: false,
              error: false,
              value: "",
            },
            description: {
              enabled: false,
              value: "",
            },
          },
          {
            id: crypto.randomUUID(),
            question: "Location",
            type: "dropdown",
            value: "",
            required: true,
            error: false,
            options: ["Chennai", "Hyderabad", "Mumbai", "Delhi", "Bangalore"],
            description: {
              enabled: false,
              value: "",
            },
          },
        ],
      },
    ],
  });

  let [selectedId, setSelectedId] = useState<string | null>(null);

  let [activeSection, setActiveSection] = useState<number>(0);

  let dragSource = useRef<HTMLElement | null>(null);

  let dragDestination = useRef<HTMLElement | null>(null);

  let { sections } = formDetail;

  const formPage = useMemo<FormPages>(() => {
    return {
      isPreview: pathname.includes("preview"),
      isEdit: pathname.includes("edit"),
      isFill: pathname.includes("fill"),
    };
  }, [pathname]);

  useEffect(() => {
    getFormDetails();
    // eslint-disable-next-line
  }, [formId]);

  const getFormDetails = (): void => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormAction = useCallback<HandleFormAction>(
    (
      action,
      { sectionIndex, fieldIndex, optionIndex },
      { type, theme, option } = {}
    ) => {
      let form = { ...formDetail };
      let field = form.sections[sectionIndex].fields[fieldIndex];

      switch (action) {
        case "focus-form":
          setSelectedId(field.id);
          return;
        case "add-option":
          if (!Array.isArray(field.options)) return;
          field.options.push(`Option ${field.options.length + 1}`);
          break;
        case "other":
          if (typeof field.other !== "object") return;
          field.other.enabled = !field.other.enabled;
          break;
        case "delete-form":
          delete form.sections[sectionIndex].fields[fieldIndex];
          break;
        case "delete-option":
          if (!optionIndex) return;
          field.options?.splice(optionIndex, 1);
          break;
        case "duplicate-form":
          field.id = crypto.randomUUID();
          form.sections[sectionIndex].fields.push(field);
          break;
        case "required":
          field.required = !field.required;
          break;
        case "theme":
          if (!theme) return;
          form.theme = theme;
          break;
        case "type":
          if (!type) return;
          field.type = type;
          break;
        case "more-option":
          switch (option) {
            case "description":
              field.description.enabled = !field.description.enabled;
              break;
            case "shuffle":
              if (!Array.isArray(field.options)) return;
              field.options = shuffleArray(field.options);
              break;
            default:
              return;
          }
          break;
        case "blur":
          handleFormError(field);
          break;
        default:
          return;
      }
      setFormDetail(form);
    },
    // eslint-disable-next-line
    []
  );

  const handleFormError: HandleFormError = (field) => {
    if (!field.required) return;
    field.error = field.value.length === 0;
  };

  const handleFormChange = useCallback<HandleFormChange>(
    ({
      key,
      value,
      type,
      checked,
      indexes: { fieldIndex, sectionIndex, optionIndex } = {},
    }): void => {
      let form = { ...formDetail };

      if (typeof sectionIndex !== "number" || typeof fieldIndex !== "number")
        return;

      let field = form.sections[sectionIndex].fields[fieldIndex];

      switch (key) {
        case "description":
          field.description.value = value;
          break;
        case "options":
          if (!Array.isArray(field.options) || typeof optionIndex !== "number")
            return;
          field.options[optionIndex] = value;
          break;
        case "other":
          if (typeof field.other !== "object") return;
          if (type === "checkbox" || type === "radio") {
            field.other.checked = !!checked;
            if (type === "radio") {
              field.value = "";
            }
          } else {
            field.other.value = value;
          }
          break;
        case "question":
          field.question = value;
          break;
        case "value":
          switch (type) {
            case "checkbox":
              if (!Array.isArray(field.value)) return;
              if (checked) {
                field.value.push(value);
              } else {
                let index = field.value.indexOf(value);
                if (index === -1) return;
                field.value.splice(index, 1);
              }
              break;
            case "radio":
              field.value = value;
              if (typeof field.other === "object") {
                field.other.value = "";
                field.other.checked = false;
              }
              break;
            default:
              field.value = value;
              break;
          }
          break;
        default:
          return;
      }

      handleFormError(field);
      setFormDetail(form);
    },
    // eslint-disable-next-line
    []
  );

  const handleFormNavigate = (type: "back" | "next"): void => {
    switch (type) {
      case "next":
        setActiveSection((section) => {
          return section + 1;
        });
        break;
      case "back":
        setActiveSection((section) => {
          return section - 1;
        });
        break;
      default:
        return;
    }
  };

  const handleFormReset = () => {
    let form = { ...formDetail };
    form.sections.forEach((section) => {
      section.fields.forEach((field) => {
        if (Array.isArray(field.value)) {
          field.value = [];
        } else {
          field.value = "";
        }
        if (typeof field.other === "object") {
          field.other.checked = false;
          field.other.value = "";
        }
        field.error = false;
      });
    });
    setFormDetail(form);
    setActiveSection(0);
  };

  const handleFormSection: HandleFormSection = useCallback(
    ({ key, value, sectionIndex }) => {
      let form = { ...formDetail };
      let section = form.sections[sectionIndex];
      switch (key) {
        case "title":
          section.title = value;
          break;
        case "description":
          section.description = value;
          break;
        default:
          return;
      }
      setFormDetail(form);
    },
    // eslint-disable-next-line
    []
  );

  const handleFormSubmit = () => {
    console.log(user);
  };

  const handleDragStart = (draggableId: string) => {
    let element = document.querySelector(
      `[data-draggable-id='${draggableId}']`
    ) as HTMLElement;
    if (!element) return;
    dragSource.current = element;
    console.log("dragStart", draggableId);
    setTimeout(() => {
      if (element) {
        element.style.opacity = "0";
      }
    }, 0);
  };

  const handleDragEnter = (draggableId: string) => {
    console.log("dragEnter", draggableId);
    let element = document.querySelector(
      `[data-draggable-id='${draggableId}']`
    ) as HTMLElement;
    if (!element) return;
    dragDestination.current = element;
  };

  const handleDragLeave = (draggableId: string) => {
    // console.log("dragLeave", draggableId);
  };

  const handleDragEnd = () => {
    if (!dragSource.current || !dragDestination) return;
    dragSource.current.style.opacity = "1";
    setTimeout(() => {
      dragSource.current = null;
      dragDestination.current = null;
    }, 0);
  };

  const handleDrop = (droppableId: string) => {
    let element = document.querySelector(
      `[data-droppable-id='${droppableId}']`
    ) as HTMLElement;
    if (!element || !dragSource.current || !dragDestination.current) return;
    let sourceId = dragSource.current.getAttribute("data-draggable-id");
    let destinationId =
      dragDestination.current.getAttribute("data-draggable-id");
    if (!sourceId || !destinationId) return;
    console.log("drop", { sourceId: +sourceId, destinationId: +destinationId });
    dragDestination.current.insertAdjacentElement(
      +sourceId < +destinationId ? "afterend" : "beforebegin",
      dragSource.current
    );
    dragSource.current.setAttribute("data-draggable-id", destinationId);
    dragDestination.current.setAttribute("data-draggable-id", sourceId);
    let form = { ...formDetail };
    let section = form.sections[+droppableId];
    section.fields.splice(
      +destinationId,
      0,
      section.fields.splice(+sourceId, 1)[0]
    );
    setFormDetail(form);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <Fragment>
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
              <FormSection
                id={id}
                title={title}
                formPage={formPage}
                selectedId={selectedId}
                description={description}
                disabled={!formPage.isEdit}
                sectionIndex={sectionIndex}
                sectionHeader={sectionHeader}
                handleFormSection={handleFormSection}
                {...(formPage.isEdit && {
                  onClick: () => setSelectedId(id),
                })}
              />
              <div
                className={styles.wrapper}
                data-droppable-id={sectionIndex}
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(sectionIndex.toString())}
              >
                {fields.length > 0 ? (
                  fields.map((field, fieldIndex) => {
                    let indexes = { fieldIndex, sectionIndex };
                    return (
                      <FormField
                        key={field.id}
                        field={field}
                        tabIndex={-1}
                        draggable={true}
                        formPage={formPage}
                        selectedId={selectedId}
                        indexes={indexes}
                        draggableId={fieldIndex}
                        handleFormChange={handleFormChange}
                        handleFormAction={handleFormAction}
                        onDragStart={() =>
                          handleDragStart(fieldIndex.toString())
                        }
                        onDragEnter={(e) => {
                          e.stopPropagation();
                          handleDragEnter(fieldIndex.toString());
                        }}
                        onDragLeave={() =>
                          handleDragLeave(fieldIndex.toString())
                        }
                        onDragEnd={handleDragEnd}
                        {...(formPage.isEdit && {
                          onClick: () =>
                            handleFormAction("focus-form", indexes),
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
                  onClick={() => handleFormNavigate("back")}
                >
                  Back
                </button>
              )}

              {activeSection < sections.length - 1 && (
                <button
                  className={styles.btn_navigate}
                  onClick={() => handleFormNavigate("next")}
                >
                  Next
                </button>
              )}
              {activeSection === sections.length - 1 && (
                <button
                  className={styles.btn_submit}
                  onClick={handleFormSubmit}
                >
                  Submit
                </button>
              )}
            </div>
            <button className={styles.btn_clear} onClick={handleFormReset}>
              Clear Form
            </button>
          </div>
        )}
      </div>
      <div className={styles.footer}>
        <span>Google Forms</span>
      </div>
    </Fragment>
  );
};

export default FormLayout;

// let form = { ...formDetail };
// let source = form.sections[dragIndexes.current.sectionIndex];
// let destination = form.sections[indexes.sectionIndex];
// source.fields.splice(
//   dragIndexes.current.fieldIndex,
//   0,
//   destination.fields.splice(indexes.fieldIndex, 1)[0]
// );
// setFormDetail(form);

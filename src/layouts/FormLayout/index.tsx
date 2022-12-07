import {
  Fragment,
  useCallback,
  useEffect,
  useState,
  ChangeEvent,
  useMemo,
} from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";
import { FormHeader } from "./FormHeader";
import { FormCard } from "./FormCard";
import {
  FormParams,
  FormDetail,
  HandleFormAction,
  HandleFormChange,
  FormHeaderKeys,
  FormKeys,
  FormPages,
} from "types/Form";
import { useAuth } from "hooks";
import { shuffleArray } from "helpers/index";

import styles from "./FormLayout.module.scss";

const FormLayout = () => {
  const { formId } = useParams<FormParams>();

  const { user } = useAuth();

  const { pathname } = useLocation();

  let [formDetail, setFormDetail] = useState<FormDetail>({
    theme: "dark",
    header: {
      id: crypto.randomUUID(),
      description: "Loreum Ispum",
      title: "Google Form",
    },
    sections: [
      [
        {
          id: crypto.randomUUID(),
          question: "Loreum Ipsum",
          type: "date",
          value: "Loreum Ispum",
          required: true,
          description: {
            enabled: false,
            value: "",
          },
        },
        {
          id: crypto.randomUUID(),
          question: "Loreum Ipsum",
          type: "file",
          value:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
          required: true,
          description: {
            enabled: false,
            value: "",
          },
        },
        {
          id: crypto.randomUUID(),
          question: "Gender",
          type: "radio",
          value: "Male",
          required: true,
          options: ["Male", "Female"],
          other: {
            enabled: true,
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
          value: "Basketball",
          required: true,
          options: ["Football", "Basketball", "Cricket"],
          other: {
            enabled: false,
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
          value: "Chennai",
          required: true,
          options: ["Chennai", "Hyderabad", "Mumbai", "Delhi", "Bangalore"],
          description: {
            enabled: false,
            value: "",
          },
        },
      ],
      [
        {
          id: crypto.randomUUID(),
          question: "Loreum Ipsum",
          type: "date",
          value: "Loreum Ispum",
          required: true,
          description: {
            enabled: false,
            value: "",
          },
        },
        {
          id: crypto.randomUUID(),
          question: "Loreum Ipsum",
          type: "file",
          value:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
          required: true,
          description: {
            enabled: false,
            value: "",
          },
        },
        {
          id: crypto.randomUUID(),
          question: "Gender",
          type: "radio",
          value: "Male",
          required: true,
          options: ["Male", "Female"],
          other: {
            enabled: true,
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
          value: "Basketball",
          required: true,
          options: ["Football", "Basketball", "Cricket"],
          other: {
            enabled: false,
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
          value: "Chennai",
          required: true,
          options: ["Chennai", "Hyderabad", "Mumbai", "Delhi", "Bangalore"],
          description: {
            enabled: false,
            value: "",
          },
        },
      ],
    ],
  });

  let [selectedId, setSelectedId] = useState<string | null>(null);

  let [activeSection, setActiveSection] = useState<number>(0);

  let { header, sections, theme } = formDetail;

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
    // console.log(formId, user, theme);
  };

  const handleFormAction = useCallback<HandleFormAction>(
    (
      action,
      { sectionIndex, fieldIndex, optionIndex },
      { type, theme, option } = {}
    ) => {
      let form = { ...formDetail };
      let field = form.sections[sectionIndex][+fieldIndex];

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
          delete form.sections[sectionIndex][fieldIndex];
          break;
        case "delete-option":
          if (!optionIndex) return;
          field.options?.splice(optionIndex, 1);
          break;
        case "duplicate-form":
          field.id = crypto.randomUUID();
          form.sections[sectionIndex].push(field);
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
        default:
          return;
      }
      setFormDetail(form);
    },
    // eslint-disable-next-line
    []
  );

  const handleFormChange = useCallback<HandleFormChange>(
    (
      event,
      { type, indexes: { fieldIndex, sectionIndex, optionIndex } = {} }
    ): void => {
      let {
        target: { value, name, innerHTML },
      } = event as ChangeEvent<
        HTMLInputElement & {
          name: FormKeys | "title";
        }
      >;
      let form = { ...formDetail };

      if (type === "header") {
        let key = event.target.getAttribute("name");
        switch (key as FormHeaderKeys) {
          case "title":
            form.header.title = innerHTML;
            break;
          case "description":
            form.header.description = innerHTML;
            break;
          default:
            return;
        }
        return;
      }

      if (!sectionIndex || !fieldIndex) return;

      let field = form.sections[sectionIndex][fieldIndex];

      switch (name) {
        case "description":
          field.description.value = innerHTML;
          break;
        case "options":
          if (!Array.isArray(field.options) || typeof optionIndex !== "number")
            return;
          field.options[optionIndex] = value;
          break;
        case "other":
          if (typeof field.other !== "object") return;
          field.other.value = value;
          break;
        case "question":
          field.question = innerHTML;
          break;
        case "value":
          if (type === "checkbox" || type === "radio") {
            // console.log(value);
          } else if (type === "file") {
            // console.log(value);
          } else {
            // console.log(value);
          }
          break;
        default:
          return;
      }

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

  const handleFormSubmit = () => {
    console.log("submit");
  };

  return (
    <Fragment>
      <Outlet />
      <div className={styles.container}>
        <FormHeader
          field={header}
          selectedId={selectedId}
          onClick={() => setSelectedId(header.id)}
          handleFormChange={handleFormChange}
        />
        {sections.map((section, sectionIndex) => {
          if (!(formPage.isFill ? sectionIndex === activeSection : true))
            return;
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
                    formPage={formPage}
                    selectedId={selectedId}
                    sectionHeader={sectionHeader}
                    indexes={indexes}
                    handleFormChange={handleFormChange}
                    handleFormAction={handleFormAction}
                    onClick={() => handleFormAction("focus-form", indexes)}
                  />
                );
              })}
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
            <button className={styles.btn_clear}>Clear Form</button>
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

import { Fragment, useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { FormHeader } from "./FormHeader";
import { FormCard } from "./FormCard";
import {
  FormParams,
  FormDetail,
  HandleFormAction,
  HandleFormChange,
  HandleFormHeader,
} from "types/Form";
import { useAuth } from "hooks";
import { shuffleArray } from "helpers/index";

import styles from "./FormLayout.module.scss";

const FormLayout = () => {
  const { formId } = useParams<FormParams>();

  const { user } = useAuth();

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

  let { header, sections, theme } = formDetail;

  useEffect(() => {
    // getFormDetails();
  }, [formId]);

  const getFormDetails = (): void => {
    console.log("form details", formId);
  };

  const handleFormAction: HandleFormAction = (
    action,
    { sectionIndex, fieldIndex, optionIndex },
    { event, type, theme, option } = {}
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
  };

  const handleFormChange: HandleFormChange = ({
    key,
    value,
    indexes: { fieldIndex, sectionIndex, optionIndex },
    type,
  }): void => {
    let form = { ...formDetail };
    let field = form.sections[sectionIndex][fieldIndex];

    switch (key) {
      case "description":
        field.description.value = value as string;
        break;
      case "options":
        if (!Array.isArray(field.options) || typeof optionIndex !== "number")
          return;
        field.options[optionIndex] = value as string;
        break;
      case "other":
        if (typeof field.other !== "object") return;
        field.other.value = value as string;
        break;
      case "question":
        field.question = value as string;
        break;
      case "value":
        break;
      default:
        return;
    }

    setFormDetail(form);
  };

  const handleFormHeader: HandleFormHeader = ({ key, value }) => {
    let form = { ...formDetail };
    switch (key) {
      case "title":
        form.header.title = value;
        break;
      case "description":
        form.header.description = value;
        break;
      default:
        return;
    }
    setFormDetail(form);
  };

  const handleFocusHeader = () => {
    setSelectedId(header.id);
  };

  return (
    <Fragment>
      <Outlet />
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
                    readOnly={true}
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
      </div>
    </Fragment>
  );
};

export default FormLayout;

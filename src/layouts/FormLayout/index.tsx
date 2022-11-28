import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { FormParams, FormContextType, FormHandler } from "types/Form";
import { FormHeader } from "./FormHeader";
import { useAuth } from "hooks";

import styles from "./FormLayout.module.scss";

const FormLayout = () => {
  const { formId } = useParams<FormParams>();

  const { user } = useAuth();

  let [formDetail, setFormDetail] = useState<FormContextType["formDetail"]>({
    theme: "dark",
    header: {
      id: crypto.randomUUID(),
      description: "Loreum Ispum",
      title: "Google Form",
    },
    fields: [
      {
        id: crypto.randomUUID(),
        question: "Loreum Ipsum",
        type: "input",
        value: "Loreum Ispum",
        validation: {
          rules: { required: true },
        },
      },
      {
        id: crypto.randomUUID(),
        question: "Loreum Ipsum",
        type: "textarea",
        value:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
        validation: {
          rules: { required: true },
        },
      },
      {
        id: crypto.randomUUID(),
        question: "Gender",
        type: "radio",
        value: "Male",
        validation: {
          rules: { required: true },
        },
        options: [{ value: "Male" }, { value: "Female" }],
        other: "Other",
      },
      {
        id: crypto.randomUUID(),
        question: "Hobbies",
        type: "checkbox",
        value: "Basketball",
        validation: {
          rules: { required: true },
        },
        options: [
          { value: "Football" },
          { value: "Basketball" },
          { value: "Cricket" },
        ],
        other: "",
      },
      {
        id: crypto.randomUUID(),
        question: "Location",
        type: "dropdown",
        value: "Chennai",
        validation: {
          rules: { required: true },
        },
        options: [
          { value: "Chennai" },
          { value: "Hyderabad" },
          { value: "Mumbai" },
          { value: "Delhi" },
          {
            value: "Bangalore",
          },
        ],
        other: "Other",
      },
    ],
  });

  let [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    // getFormDetails();
  }, [formId]);

  const getFormDetails = (): void => {
    console.log("form details", formId);
  };

  const handleClickForm: FormContextType["handleClickForm"] = (id) => {
    setSelectedId(id);
  };

  const handleDeleteForm = (id: string) => {
    let form = { ...formDetail };
    let index = form.fields.findIndex((field) => {
      return field.id === id;
    });
    if (index === -1) return;
    form.fields.splice(index, 1);
    setFormDetail(form);
  };

  const handleDuplicateForm: FormContextType["handleDuplicateForm"] = (id) => {
    console.log(id);
    let form = { ...formDetail };
    let index = form.fields.findIndex((field) => {
      return field.id === id;
    });
    if (index === -1) return;
    form.fields.push(form.fields[index]);
  };

  const handleChangeForm: FormContextType["handleChangeForm"] = ({
    key,
    id,
    type,
    event,
  }): void => {
    let form = { ...formDetail };

    switch (key) {
      case "description":
        break;
      case "question":
        handleFormQuestion({
          id,
          type,
          fields: form.fields,
          value: event?.target.innerHTML,
        });
        break;
      case "options":
        handleFormOptions({
          id,
          type,
          fields: form.fields,
          value: (event?.target as HTMLInputElement).value,
        });
        break;
      case "type":
        handleFormType({
          id,
          type,
          fields: form.fields,
        });
        break;
      case "value":
        break;

      default:
        return;
    }
    setFormDetail(form);
  };

  const handleFormType: FormHandler = ({ id, type, fields }) => {
    let field = fields.find((field) => {
      return field.id === id;
    });
    if (!field) return;
    field.type = type;
    switch (type) {
      case "checkbox":
        break;
      case "dropdown":
        break;
      case "radio":
        break;
      default:
        return;
    }
  };

  const handleFormOptions: FormHandler = ({ id, type, fields, value }) => {
    console.log(id, type, fields, value);
  };

  const handleFormQuestion: FormHandler = ({ id, type, fields, value }) => {
    console.log(id, type, fields, value);
  };

  const handleMoreOptions: FormContextType["handleMoreOptions"] = (
    action,
    id
  ) => {
    console.log(action, id);
    switch (action) {
      case "description":
        break;
      case "shuffle":
        break;
      default:
        return;
    }
  };

  const handleFormHeader: FormContextType["handleFormHeader"] = (
    key,
    event
  ) => {
    let form = { ...formDetail };
    switch (key) {
      case "title":
        form.header.title = event.target.innerHTML;
        break;
      case "description":
        form.header.description = event.target.innerHTML;
        break;
      default:
        break;
    }
    setFormDetail(form);
  };

  const context: FormContextType = {
    formDetail,
    selectedId,
    handleClickForm,
    handleChangeForm,
    handleDeleteForm,
    handleDuplicateForm,
    handleMoreOptions,
    handleFormHeader,
  };

  return (
    <div className={styles.container}>
      <FormHeader
        selectedId={selectedId}
        handleClickForm={handleClickForm}
        handleFormHeader={handleFormHeader}
        {...formDetail.header}
      />
      <Outlet context={context} />
    </div>
  );
};

export default FormLayout;

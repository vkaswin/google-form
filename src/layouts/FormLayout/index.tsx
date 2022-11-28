import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import {
  FormParams,
  FormDetail,
  FormContextType,
  FormField,
  FormType,
} from "types/Form";
import { FormHeader } from "./FormHeader";
import { useAuth } from "hooks";

import styles from "./FormLayout.module.scss";

const FormLayout = () => {
  const { formId } = useParams<FormParams>();

  const { user } = useAuth();

  let [formDetail, setFormDetail] = useState<FormDetail>({
    theme: "dark",
    description: "Loreum Ispum",
    title: "Google Form",
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

  const handleChangeForm: FormContextType["handleChangeForm"] = (
    key,
    id,
    type
  ): void => {
    let form = { ...formDetail };

    switch (key) {
      case "description":
        break;
      case "question":
        break;
      case "options":
        handleFormOptions(id, type, form.fields);
        break;
      case "type":
        handleFormType(id, type, form.fields);
        break;
      case "value":
        break;
      default:
        return;
    }
    setFormDetail(form);
  };

  const handleFormType = (id: string, type: FormType, fields: FormField[]) => {
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

  const handleFormOptions = (
    id: string,
    type: FormType,
    fields: FormField[]
  ) => {
    console.log(id, type, fields);
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

  useEffect(() => {
    // getFormDetails();
  }, [formId]);

  const getFormDetails = (): void => {
    console.log("form details", formId);
  };

  const context: FormContextType = {
    formDetail,
    selectedId,
    handleClickForm,
    handleChangeForm,
    handleDeleteForm,
    handleDuplicateForm,
    handleMoreOptions,
  };

  return (
    <div className={styles.container}>
      <FormHeader selectedId={selectedId} handleClickForm={handleClickForm} />
      <Outlet context={context} />
    </div>
  );
};

export default FormLayout;

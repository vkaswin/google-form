import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import {
  FormParams,
  FormDetail,
  FormContextType,
  FormType,
  FormField,
} from "types/Form";
import { FormHeader } from "./FormHeader";
import { useAuth } from "hooks/useAuth";

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
        question: "Gender",
        type: "radio",
        value: "Male",
        validation: {
          rules: { required: true },
        },
        options: [{ value: "Male" }, { value: "Female" }],
        other: "Other",
      },
    ],
  });

  let [selectedId, setSelectedId] = useState<string | null>(null);

  const handleClickForm = (id: string) => {
    setSelectedId(id);
  };

  const handleChange = (
    key: Exclude<keyof FormField, "id" | "validation">,
    id: string,
    type: FormType
  ): void => {
    let form = { ...formDetail };

    switch (key) {
      case "description":
        break;
      case "question":
        break;
      case "options":
        break;
      case "type":
        let field = form.fields.find((field) => {
          return field.id === id;
        });
        if (!field) return;
        field.type = type;
        break;
      case "value":
        break;
      default:
        return;
    }
    setFormDetail(form);
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
    handleChange,
  };

  return (
    <div className={styles.container}>
      <FormHeader selectedId={selectedId} handleClickForm={handleClickForm} />
      <Outlet context={context} />
    </div>
  );
};

export default FormLayout;

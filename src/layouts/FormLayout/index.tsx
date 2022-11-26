import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import {
  FormParams,
  FormDetail,
  FormContextType,
  FormType,
  Field,
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
        label: "Loreum Ipsum",
        type: "input",
        value: "Loreum Ispum",
        validation: {
          rules: { required: true },
        },
      },
      {
        id: crypto.randomUUID(),
        label: "Loreum Ipsum",
        type: "radio",
        value: "Loreum Ispum",
        validation: {
          rules: { required: true },
        },
        options: [{ label: "label", value: "value" }],
      },
    ],
  });

  let [selectedId, setSelectedId] = useState<string | null>(null);

  const handleClickForm = (id: string) => {
    setSelectedId(id);
  };

  type Keys = keyof Field;

  const handleChange = (
    key: Exclude<keyof Field, "id" | "validation">,
    id: string,
    type: FormType
  ): void => {
    let form = { ...formDetail };

    switch (key) {
      case "description":
        break;
      case "label":
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
      <div className={styles.wrapper}>
        <FormHeader selectedId={selectedId} handleClickForm={handleClickForm} />
        <Outlet context={context} />
      </div>
    </div>
  );
};

export default FormLayout;

import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import {
  FormParams,
  FormDetail,
  FormContextType,
  FormOption,
  FormType,
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

  const handleSelectType = (type: FormType) => {
    console.log(type);
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
    handleSelectType,
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

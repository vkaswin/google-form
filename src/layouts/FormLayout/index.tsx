import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { FormParams, FormDetail } from "types/Form";

import styles from "./FormLayout.module.scss";

const FormLayout = () => {
  const { formId } = useParams<FormParams>();

  let [formDetail, setFormDetail] = useState<FormDetail>({
    theme: "dark",
    description: "Loreum Ispum",
    title: "Google Form",
    fields: [
      {
        label: "Loreum Ipsum",
        type: "input",
        value: "Loreum Ispum",
        validation: {
          rules: { required: true },
        },
      },
      {
        label: "Loreum Ipsum",
        type: "input",
        value: "Loreum Ispum",
        validation: {
          rules: { required: true },
        },
        options: [{ label: "label", value: "value" }],
      },
    ],
  });

  useEffect(() => {
    getFormDetails();
  }, [formId]);

  const getFormDetails = (): void => {
    console.log("form details", formId);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h2>Form Layout</h2>
        <Outlet context={formDetail} />
      </div>
    </div>
  );
};

export default FormLayout;

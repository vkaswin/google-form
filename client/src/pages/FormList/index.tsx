import { Fragment, useEffect, useState } from "react";
import Header from "./Header";
import { getAllForms } from "services/Form";
import { getAllTemplates } from "services/Template";
import { FormData } from "types/Form";
import FormCard from "./FormCard";
import TemplateCard from "./TemplateCard";

import styles from "./FormList.module.scss";

const FormList = () => {
  const [forms, setForms] = useState<FormData[]>([]);

  const [templates, setTemplates] = useState<FormData[]>([]);

  useEffect(() => {
    getFormData();
  }, []);

  const getFormData = async () => {
    try {
      let [{ data: templates }, { data: forms }] = await Promise.all([
        getAllTemplates(),
        getAllForms(),
      ]);
      setTemplates(templates);
      setForms(forms);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <Header />
      <div className={styles.container}>
        <h1>FormList</h1>
        <div className={styles.template}>
          {templates.map((template) => {
            return <TemplateCard {...template} />;
          })}
        </div>
        <div className={styles.fom}>
          {forms.map((form) => {
            return <FormCard {...form} />;
          })}
        </div>
      </div>
    </Fragment>
  );
};

export default FormList;

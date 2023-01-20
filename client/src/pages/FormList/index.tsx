import { Fragment, useEffect, useState } from "react";
import Header from "./Header";
import { getAllForms } from "services/Form";
import { getAllTemplates } from "services/Template";
import { FormData } from "types/Form";
import FormCard from "./FormCard";
import TemplateCard from "./TemplateCard";
import AddTemplate from "./TemplateCard/AddTemplate";

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

  const handleTemplate = async (templateId: string) => {
    console.log(templateId);
  };

  const handleForm = (formId: string) => {
    window.open(`/google-form-clone#/form/${formId}/edit`);
  };

  const handleCreateFrom = async () => {
    console.log("create form");
  };

  return (
    <Fragment>
      <Header />
      <div className={styles.container}>
        <div className={styles.template}>
          <div className={styles.wrapper}>
            <div className={styles.title}>
              <span>Start a new form</span>
            </div>
            <div className={styles.list}>
              <AddTemplate onClick={handleCreateFrom} />
              {templates.map((template) => {
                return (
                  <TemplateCard
                    key={template._id}
                    onClick={handleTemplate}
                    {...template}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className={styles.form}>
          <div className={styles.wrapper}>
            <div className={styles.list}>
              {forms.map((form) => {
                return (
                  <FormCard key={form._id} onClick={handleForm} {...form} />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default FormList;

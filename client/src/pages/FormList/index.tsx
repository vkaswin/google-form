import { Fragment, useEffect, useState } from "react";
import Header from "./Header";
import { createForm, getAllForms, deleteFormById } from "services/Form";
import { getAllTemplates } from "services/Template";
import { FormData } from "types/Form";
import FormCard from "./FormCard";
import TemplateCard from "./TemplateCard";
import AddTemplate from "./TemplateCard/AddTemplate";

import styles from "./FormList.module.scss";
import { toast } from "react-toastify";

const FormList = () => {
  const [forms, setForms] = useState<FormData[]>([]);

  const [templates, setTemplates] = useState<FormData[]>([]);

  useEffect(() => {
    getFormData();
  }, []);

  const getFormData = async () => {
    let [{ data: templates }, { data: forms }] = await Promise.all([
      getAllTemplates(),
      getAllForms(),
    ]);
    setTemplates(templates);
    setForms(forms);
  };

  const handleCreateFrom = async (templateId?: string) => {
    let data = templateId ? { templateId } : undefined;
    let {
      data: { formId },
    } = await createForm(data);
    navigateToForm(formId);
  };

  const navigateToForm = (formId: string) => {
    window.open(`#/form/${formId}/edit`);
  };

  const handleDeleteForm = async (formId: string) => {
    if (!window.confirm("Are you sure to delete this form?")) return;

    let {
      data: { message },
    } = await deleteFormById(formId);
    let form = [...forms];
    toast(message, { type: "success" });
    let index = form.findIndex(({ _id }) => _id === formId);
    form.splice(index, 1);
    setForms(form);
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
              <AddTemplate onClick={() => handleCreateFrom()} />
              {templates.map((template) => {
                return (
                  <TemplateCard
                    key={template._id}
                    onClick={handleCreateFrom}
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
                  <FormCard
                    key={form._id}
                    handleOpenForm={navigateToForm}
                    handleDeleteForm={handleDeleteForm}
                    {...form}
                  />
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

import { Fragment, useLayoutEffect, useState } from "react";
import { useForm } from "hooks/useForm";
import Section from "./Section";
import Field from "./Field";
import { FormProvider } from "context/form";
import { setFormTheme } from "helpers";
import { formData } from "json";

import styles from "./FillForm.module.scss";

type FillFormProps = {
  isPreview?: boolean;
};

const FillForm = ({ isPreview = false }: FillFormProps) => {
  const form = useForm();

  let [activeSection, setActiveSection] = useState<number>(0);

  const { handleSubmit, reset } = form;

  const { sections = [], colorCode, bgCode } = formData;

  useLayoutEffect(() => {
    setFormTheme({ colorCode, bgCode });
  }, [colorCode, bgCode]);

  const onSubmit = (data: any, action: "next" | "back" | "submit") => {
    if (action === "next") {
      setActiveSection((section) => section + 1);
    } else if (action == "back") {
      setActiveSection((section) => section - 1);
    } else {
      submitResponse(data);
    }
  };

  const submitResponse = (data: any) => {
    try {
    } catch (error) {}
  };

  const onInvalid = (errors: any, action?: "next" | "back") => {
    if (action === "back") {
      setActiveSection((section) => section - 1);
    } else if (action === "next") {
      let keys = Object.keys(errors);
      let hasError = formData.sections[activeSection].fields.some(({ id }) =>
        keys.includes(id)
      );
      if (hasError) return;
      setActiveSection((section) => section + 1);
    }
  };

  const clearForm = () => {
    reset();
    setActiveSection(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <FormProvider {...form}>
      <div className={styles.container}>
        {sections.map(({ id, title, description, fields }, sectionIndex) => {
          if (!isPreview && !(sectionIndex === activeSection)) return null;

          return (
            <Fragment key={id}>
              <Section title={title} description={description} />
              <div className={styles.wrapper}>
                {fields.map((field) => {
                  return <Field key={field.id} field={field} tabIndex={-1} />;
                })}
              </div>
            </Fragment>
          );
        })}
        {!isPreview && (
          <div className={styles.cta}>
            <div>
              {activeSection > 0 && (
                <button
                  className={styles.btn_navigate}
                  onClick={handleSubmit(
                    (data) => onSubmit(data, "back"),
                    (errors) => onInvalid(errors, "back")
                  )}
                >
                  Back
                </button>
              )}
              {activeSection < sections.length - 1 && (
                <button
                  className={styles.btn_navigate}
                  onClick={handleSubmit(
                    (data) => onSubmit(data, "next"),
                    (errors) => onInvalid(errors, "next")
                  )}
                >
                  Next
                </button>
              )}
              {activeSection === sections.length - 1 && (
                <button
                  className={styles.btn_submit}
                  onClick={handleSubmit(
                    (data) => onSubmit(data, "submit"),
                    onInvalid
                  )}
                >
                  Submit
                </button>
              )}
            </div>
            <button className={styles.btn_clear} onClick={clearForm}>
              Clear Form
            </button>
          </div>
        )}
        <div className={styles.footer}>
          <span>Google Form</span>
        </div>
      </div>
    </FormProvider>
  );
};

export default FillForm;

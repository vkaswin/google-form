import { Fragment, useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { FormHeader } from "./FormHeader";
import { FormCard } from "./FormCard";
import { FormParams, FormTypes, FormCustomAttributes } from "types/Form";
import { useAuth } from "hooks";
import { shuffleArray } from "helpers/index";

import styles from "./FormLayout.module.scss";

const FormLayout = () => {
  const { formId } = useParams<FormParams>();

  const { user } = useAuth();

  let [formDetail, setFormDetail] = useState<FormTypes["formDetail"]>({
    theme: "dark",
    header: {
      id: crypto.randomUUID(),
      description: "Loreum Ispum",
      title: "Google Form",
    },
    sections: [
      [
        {
          id: crypto.randomUUID(),
          question: "Loreum Ipsum",
          type: "date",
          value: "Loreum Ispum",
          required: true,
          description: {
            enabled: false,
            value: "",
          },
        },
        {
          id: crypto.randomUUID(),
          question: "Loreum Ipsum",
          type: "file",
          value:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
          required: true,
          description: {
            enabled: false,
            value: "",
          },
        },
        {
          id: crypto.randomUUID(),
          question: "Gender",
          type: "radio",
          value: "Male",
          required: true,
          options: ["Male", "Female"],
          other: {
            enabled: false,
            value: "",
          },
          description: {
            enabled: false,
            value: "",
          },
        },
        {
          id: crypto.randomUUID(),
          question: "Hobbies",
          type: "checkbox",
          value: "Basketball",
          required: true,
          options: ["Football", "Basketball", "Cricket"],
          other: {
            enabled: false,
            value: "",
          },
          description: {
            enabled: false,
            value: "",
          },
        },
        {
          id: crypto.randomUUID(),
          question: "Location",
          type: "dropdown",
          value: "Chennai",
          required: true,
          options: ["Chennai", "Hyderabad", "Mumbai", "Delhi", "Bangalore"],
          description: {
            enabled: false,
            value: "",
          },
        },
      ],
    ],
  });

  let [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    // getFormDetails();
  }, [formId]);

  const getFormDetails = (): void => {
    console.log("form details", formId);
  };

  const handleClickForm: FormTypes["handleClickForm"] = (id) => {
    setSelectedId(id);
  };

  const handleDeleteForm: FormTypes["handleDeleteForm"] = (
    sectionindex,
    fieldindex
  ) => {
    let form = { ...formDetail };
    delete form.sections[+sectionindex][+fieldindex];
    setFormDetail(form);
  };

  const handleDuplicateForm: FormTypes["handleDuplicateForm"] = (
    sectionindex,
    fieldindex
  ) => {
    let form = { ...formDetail };
    let field = { ...form.sections[+sectionindex][+fieldindex] };
    field.id = crypto.randomUUID();
    form.sections[+sectionindex].push(field);
    setFormDetail(form);
  };

  const handleChangeForm: FormTypes["handleChangeForm"] = (event): void => {
    let { fieldindex, sectionindex, optionindex, name, type } = event?.target
      .dataset as FormCustomAttributes;

    let value =
      "value" in event.target ? event.target.value : event.target.innerHTML;

    if (!sectionindex || !fieldindex || !name || !type) return;

    let form = { ...formDetail };
    let field = form.sections[+sectionindex][+fieldindex];

    switch (name) {
      case "description":
        field.description.value = value;
        break;
      case "options":
        if (!Array.isArray(field.options) || typeof optionindex !== "string")
          return;
        field.options[+optionindex] = value;
        break;
      case "other":
        if (typeof field.other !== "object") return;
        field.other.value = value;
        break;
      case "question":
        field.question = value;
        break;
      case "value":
        break;
      default:
        return;
    }

    setFormDetail(form);
  };

  const handleFormType: FormTypes["handleFormType"] = (
    sectionindex,
    fieldindex,
    type
  ) => {
    let form = { ...formDetail };
    form.sections[+sectionindex][+fieldindex].type = type;
    setFormDetail(form);
  };

  const handleMoreOptions: FormTypes["handleMoreOptions"] = (
    sectionindex,
    fieldindex,
    action
  ) => {
    let form = { ...formDetail };
    let field = form.sections[+sectionindex][+fieldindex];

    switch (action) {
      case "description":
        field.description.enabled = !field.description.enabled;
        break;
      case "shuffle":
        if (!Array.isArray(field.options)) return;
        field.options = shuffleArray(field.options);
        break;
      default:
        return;
    }

    setFormDetail(form);
  };

  const handleDeleteOptions: FormTypes["handleDeleteOptions"] = (
    sectionindex,
    fieldindex,
    optionindex
  ) => {
    let form = { ...formDetail };
    form.sections[+sectionindex][+fieldindex].options?.splice(+optionindex, 1);
    setFormDetail(form);
  };

  const handleAddOther: FormTypes["handleAddOther"] = (
    sectionindex,
    fieldindex
  ) => {
    let form = { ...formDetail };
    let field = form.sections[+sectionindex][+fieldindex];
    if (typeof field.other !== "object") return;
    field.other.enabled = true;
    setFormDetail(form);
  };

  const handleAddOption: FormTypes["handleAddOption"] = (
    sectionindex,
    fieldindex
  ) => {
    let form = { ...formDetail };
    let field = form.sections[+sectionindex][+fieldindex];
    if (!Array.isArray(field.options)) return;
    field.options.push(`Option ${field.options.length + 1}`);
    setFormDetail(form);
  };

  const handleDeleteOther: FormTypes["handleDeleteOther"] = (
    sectionindex,
    fieldindex
  ) => {
    let form = { ...formDetail };
    let field = form.sections[+sectionindex][+fieldindex];
    if (typeof field.other !== "object") return;
    field.other.enabled = false;
    setFormDetail(form);
  };

  const handleRequired: FormTypes["handleRequired"] = (
    sectionindex,
    fieldindex
  ) => {
    console.log(sectionindex, fieldindex);
  };

  const handleFormTheme: FormTypes["handleFormTheme"] = (theme) => {
    console.log(theme);
  };

  const handleFormHeader: FormTypes["handleFormHeader"] = (event) => {
    let form = { ...formDetail };
    let { name } = event?.target.dataset;
    let value = event.target.innerHTML;
    switch (name) {
      case "title":
        form.header.title = value;
        break;
      case "description":
        form.header.description = value;
        break;
      default:
        return;
    }
    setFormDetail(form);
  };

  let { header, sections, theme } = formDetail;

  return (
    <Fragment>
      <div className={styles.header}>
        <h1>Header</h1>
      </div>
      <div className={styles.container}>
        <Outlet />
        <FormHeader
          selectedId={selectedId}
          handleClickForm={handleClickForm}
          handleFormHeader={handleFormHeader}
          {...header}
        />
        {sections.map((section, sectionIndex) => {
          return (
            <Fragment key={sectionIndex}>
              {section.map((field, fieldIndex) => {
                let sectionHeader =
                  fieldIndex === 0 && sections.length > 1
                    ? `Section ${sectionIndex + 1} of ${sections.length}`
                    : null;
                return (
                  <FormCard
                    key={field.id}
                    field={field}
                    readOnly={true}
                    selectedId={selectedId}
                    sectionHeader={sectionHeader}
                    fieldindex={fieldIndex.toString()}
                    sectionindex={sectionIndex.toString()}
                    handleClickForm={handleClickForm}
                    handleChangeForm={handleChangeForm}
                    handleDeleteForm={handleDeleteForm}
                    handleDuplicateForm={handleDuplicateForm}
                    handleMoreOptions={handleMoreOptions}
                    handleFormType={handleFormType}
                    handleDeleteOptions={handleDeleteOptions}
                    handleDeleteOther={handleDeleteOther}
                    handleAddOther={handleAddOther}
                    handleAddOption={handleAddOption}
                    handleRequired={handleRequired}
                    onClick={() => handleClickForm(field.id)}
                  />
                );
              })}
            </Fragment>
          );
        })}
      </div>
    </Fragment>
  );
};

export default FormLayout;

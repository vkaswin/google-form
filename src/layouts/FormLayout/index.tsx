import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import {
  FormParams,
  FormContextType,
  FormHandler,
  FormCustomAttributes,
  FormField,
} from "types/Form";
import { FormHeader } from "../../components/Form/FormHeader";
import { useAuth } from "hooks";

import styles from "./FormLayout.module.scss";

const FormLayout = () => {
  const { formId } = useParams<FormParams>();

  const { user } = useAuth();

  let [formDetail, setFormDetail] = useState<FormContextType["formDetail"]>({
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
          question: "Gender",
          type: "radio",
          value: "Male",
          validation: {
            rules: { required: true },
          },
          options: ["Male", "Female"],
          other: "Other",
        },
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
          options: ["Male", "Female"],
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
          options: ["Football", "Basketball", "Cricket"],
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
          options: ["Chennai", "Hyderabad", "Mumbai", "Delhi", "Bangalore"],
          other: "Other",
        },
      ],
      [
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
          options: ["Male", "Female"],
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
          options: ["Football", "Basketball", "Cricket"],
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
          options: ["Chennai", "Hyderabad", "Mumbai", "Delhi", "Bangalore"],
          other: "Other",
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

  const handleClickForm: FormContextType["handleClickForm"] = (id) => {
    setSelectedId(id);
  };

  const handleDeleteForm: FormContextType["handleDeleteForm"] = (
    sectionindex,
    fieldindex
  ) => {
    let form = { ...formDetail };
    delete form.sections[+sectionindex][+fieldindex];
    setFormDetail(form);
  };

  const handleDuplicateForm: FormContextType["handleDuplicateForm"] = (
    sectionindex,
    fieldindex
  ) => {
    let form = { ...formDetail };
    let field = { ...form.sections[+sectionindex][+fieldindex] };
    field.id = crypto.randomUUID();
    form.sections[+sectionindex].push(field);
    setFormDetail(form);
  };

  const handleChangeForm: FormContextType["handleChangeForm"] = (
    event
  ): void => {
    let { fieldindex, sectionindex, optionindex, name, type } = event?.target
      .dataset as FormCustomAttributes;

    let value =
      "value" in event.target ? event.target.value : event.target.innerHTML;

    if (!sectionindex || !fieldindex || !name || !type) return;

    let form = { ...formDetail };
    let field = form.sections[+sectionindex][+fieldindex];

    switch (name) {
      case "description":
        field.description = value;
        break;
      case "options":
        if (!Array.isArray(field.options) || typeof optionindex !== "string")
          return;
        field.options[+optionindex] = value;
        break;
      case "other":
        field.other = value;
        break;
      case "question":
        field.question = value;
        break;
      case "value":
        break;
      case "other":
        field.other = value;
        break;
      default:
        return;
    }

    setFormDetail(form);
  };

  const handleFormType: FormContextType["handleFormType"] = (
    sectionindex,
    fieldindex,
    type
  ) => {
    let form = { ...formDetail };
    form.sections[+sectionindex][+fieldindex].type = type;
    setFormDetail(form);
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

  const handleDeleteOptions: FormContextType["handleDeleteOptions"] = (
    sectionindex,
    fieldindex,
    optionindex
  ) => {
    let form = { ...formDetail };
    form.sections[+sectionindex][+fieldindex].options?.splice(+optionindex, 1);
    setFormDetail(form);
  };

  const handleDeleteOther: FormContextType["handleDeleteOther"] = (
    sectionindex,
    fieldindex
  ) => {
    let form = { ...formDetail };
    form.sections[+sectionindex][+fieldindex].other = "";
    setFormDetail(form);
  };

  const handleFormHeader: FormContextType["handleFormHeader"] = (event) => {
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

  const context: FormContextType = {
    formDetail,
    selectedId,
    handleClickForm,
    handleChangeForm,
    handleDeleteForm,
    handleDuplicateForm,
    handleMoreOptions,
    handleFormHeader,
    handleFormType,
    handleDeleteOptions,
    handleDeleteOther,
  };

  return (
    <div className={styles.container}>
      <Outlet context={context} />
    </div>
  );
};

export default FormLayout;

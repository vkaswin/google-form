import { Fragment, useMemo } from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";
import { FormParams, FormPages, FormDetail } from "types/Form";
import Form from "components/Form";
import PageNotFound from "pages/404";

const formData: FormDetail = {
  theme: "dark",
  sections: [
    {
      id: crypto.randomUUID(),
      title: "Loreum Ispum",
      description: "Loreum Ispum",
      fields: [
        {
          id: crypto.randomUUID(),
          question: "Loreum Ipsum",
          type: "input",
          value: "",
          description: {
            enabled: false,
            value: "",
          },
          rules: {
            required: { value: true },
          },
        },
        {
          id: crypto.randomUUID(),
          question: "Loreum Ipsum",
          type: "textarea",
          value: "",
          description: {
            enabled: false,
            value: "",
          },
          rules: {
            required: { value: true },
          },
        },
        {
          id: crypto.randomUUID(),
          question: "Gender",
          type: "radio",
          value: "",
          options: ["Male", "Female"],
          other: {
            enabled: true,
            checked: false,
            value: "",
          },
          description: {
            enabled: false,
            value: "",
          },
          rules: {
            required: { value: true },
          },
        },
        {
          id: crypto.randomUUID(),
          question: "Hobbies",
          type: "checkbox",
          value: [],
          options: ["Football", "Basketball", "Cricket"],
          other: {
            enabled: true,
            checked: false,
            value: "",
          },
          description: {
            enabled: false,
            value: "",
          },
          rules: {
            required: { value: true },
          },
        },
        {
          id: crypto.randomUUID(),
          question: "Location",
          type: "dropdown",
          value: "",
          options: ["Chennai", "Hyderabad", "Mumbai", "Delhi", "Bangalore"],
          description: {
            enabled: false,
            value: "",
          },
          rules: {
            required: { value: true },
          },
        },
      ],
    },
    {
      id: crypto.randomUUID(),
      title: "Loreum Ispum",
      description: "Loreum Ispum",
      fields: [
        {
          id: crypto.randomUUID(),
          question: "Loreum Ipsum",
          type: "input",
          value: "",
          description: {
            enabled: true,
            value: "",
          },
          rules: { required: { value: true } },
        },
        {
          id: crypto.randomUUID(),
          question: "Loreum Ipsum",
          type: "input",
          value: "",
          description: {
            enabled: false,
            value: "",
          },
          rules: { required: { value: true } },
        },
        {
          id: crypto.randomUUID(),
          question: "Gender",
          type: "radio",
          value: "",
          options: ["Male", "Female"],
          other: {
            enabled: true,
            checked: false,
            value: "",
          },
          description: {
            enabled: false,
            value: "",
          },
          rules: { required: { value: true } },
        },
        {
          id: crypto.randomUUID(),
          question: "Hobbies",
          type: "checkbox",
          value: [],
          options: ["Football", "Basketball", "Cricket"],
          other: {
            enabled: true,
            checked: false,
            value: "",
          },
          description: {
            enabled: false,
            value: "",
          },
          rules: { required: { value: true } },
        },
        {
          id: crypto.randomUUID(),
          question: "Location",
          type: "dropdown",
          value: "",
          options: ["Chennai", "Hyderabad", "Mumbai", "Delhi", "Bangalore"],
          description: {
            enabled: false,
            value: "",
          },
          rules: { required: { value: true } },
        },
      ],
    },
  ],
};

const FormLayout = () => {
  const { formId } = useParams<FormParams>();

  const { pathname } = useLocation();

  const formPage = useMemo<FormPages>(() => {
    let path = pathname.split("/")?.[3];
    return {
      isPreview: path ? path === "preview" : false,
      isEdit: path ? path === "edit" : false,
      isFill: path ? path === "fill" : false,
    };
  }, [pathname]);

  if (!formId || (!formPage.isEdit && !formPage.isFill && !formPage.isPreview))
    return <PageNotFound />;

  return (
    <Fragment>
      <Outlet />
      <Form formData={formData} formPage={formPage} />
    </Fragment>
  );
};

export default FormLayout;

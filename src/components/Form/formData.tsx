import { FormDetail } from "types/Form";

export const formData: FormDetail = {
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

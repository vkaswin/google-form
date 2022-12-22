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
          required: true,
          description: {
            enabled: false,
            value: "",
          },
          rules: {},
        },
        {
          id: crypto.randomUUID(),
          question: "Loreum Ipsum",
          type: "textarea",
          value: "",
          required: true,
          description: {
            enabled: false,
            value: "",
          },
          rules: {},
        },
        {
          id: crypto.randomUUID(),
          question: "Gender",
          type: "radio",
          value: "",
          required: true,
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
          rules: {},
        },
        {
          id: crypto.randomUUID(),
          question: "Hobbies",
          type: "checkbox",
          value: [],
          required: true,
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
          rules: {},
        },
        {
          id: crypto.randomUUID(),
          question: "Location",
          type: "dropdown",
          value: "",
          required: true,
          options: ["Chennai", "Hyderabad", "Mumbai", "Delhi", "Bangalore"],
          description: {
            enabled: false,
            value: "",
          },
          rules: {},
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
          required: false,
          description: {
            enabled: true,
            value: "",
          },
          rules: {},
        },
        {
          id: crypto.randomUUID(),
          question: "Loreum Ipsum",
          type: "input",
          value: "",
          required: true,
          description: {
            enabled: false,
            value: "",
          },
          rules: {},
        },
        {
          id: crypto.randomUUID(),
          question: "Gender",
          type: "radio",
          value: "",
          required: true,
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
          rules: {},
        },
        {
          id: crypto.randomUUID(),
          question: "Hobbies",
          type: "checkbox",
          value: [],
          required: true,
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
          rules: {},
        },
        {
          id: crypto.randomUUID(),
          question: "Location",
          type: "dropdown",
          value: "",
          required: true,
          options: ["Chennai", "Hyderabad", "Mumbai", "Delhi", "Bangalore"],
          description: {
            enabled: false,
            value: "",
          },
          rules: {},
        },
      ],
    },
  ],
};

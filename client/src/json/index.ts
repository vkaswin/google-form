import { FormDetail } from "types/Form";

export const formData: FormDetail = {
  title: "Google Form",
  colorCode: "#673ab7",
  bgCode: "#f0ebf8",
  sections: [
    {
      title: "Loreum Ispum",
      description: "Loreum Ispum",
      fields: [
        {
          title: "Loreum Ipsum",
          fieldType: "input",
          description: "Loreum Ispum",
          rules: {
            required: { value: true },
          },
        },
        {
          title: "Loreum Ipsum",
          fieldType: "date",
          description: "",
          rules: {
            required: { value: true },
          },
        },
        {
          title: "Gender",
          fieldType: "radio",

          options: ["Male", "Female"],
          other: false,
          description: "",
          rules: {
            required: { value: true },
          },
        },
        {
          title: "Hobbies",
          fieldType: "checkbox",

          options: ["Football", "Basketball", "Cricket"],
          other: true,
          description: "",
          rules: {
            required: { value: true },
          },
          value: [],
        },
        {
          title: "Location",
          fieldType: "dropdown",
          options: ["Chennai", "Hyderabad", "Mumbai", "Delhi", "Bangalore"],
          description: "",
          rules: {
            required: { value: true },
          },
          value: "",
        },
      ],
    },
    {
      title: "Loreum Ispum",
      description: "Loreum Ispum",
      fields: [
        {
          title: "Loreum Ipsum",
          fieldType: "input",
          description: "",
          rules: { required: { value: true } },
          value: "",
        },
        {
          title: "Loreum Ipsum",
          fieldType: "input",
          description: "",
          rules: { required: { value: true } },
          value: "",
        },
        {
          title: "Gender",
          fieldType: "radio",

          options: ["Male", "Female"],
          other: true,
          description: "",
          rules: { required: { value: true } },
          value: "",
        },
        {
          title: "Hobbies",
          fieldType: "checkbox",

          options: ["Football", "Basketball", "Cricket"],
          other: true,
          description: "",
          rules: { required: { value: true } },
          value: [],
        },
        {
          title: "Location",
          fieldType: "dropdown",
          options: ["Chennai", "Hyderabad", "Mumbai", "Delhi", "Bangalore"],
          description: "",
          rules: { required: { value: true } },
        },
      ],
    },
  ],
};

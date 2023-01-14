import { FormDetail } from "types/Form";

export const formData: FormDetail = {
  title: "Google Form",
  colorCode: "#673ab7",
  bgCode: "#f0ebf8",
  sections: [
    {
      id: "43a1ce84-d3d1-4c97-b858-a48d85e55762",
      title: "Loreum Ispum",
      description: "Loreum Ispum",
      fields: [
        {
          id: "ee8f3a59-7a20-4aef-b3f4-5731d84ba0a3",
          title: "Loreum Ipsum",
          type: "date",
          description: {
            enabled: false,
            value: "",
          },
          rules: {
            required: { value: true },
          },
          value: "",
        },
        {
          id: "109489e9-2ddf-43a5-af55-e73d35489e50",
          title: "Loreum Ipsum",
          type: "textarea",
          description: {
            enabled: false,
            value: "",
          },
          rules: {
            required: { value: true },
          },
          value: "",
        },
        {
          id: "91572682-d918-436a-98c9-9d7f6de50573",
          title: "Gender",
          type: "radio",

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
          value: [],
        },
        {
          id: "c7dcc839-7eab-4a88-a63d-269a798ee798",
          title: "Hobbies",
          type: "checkbox",

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
          value: [],
        },
        {
          id: "c8a6df35-5310-4af3-8ffb-69732c5e1857",
          title: "Location",
          type: "dropdown",

          options: ["Chennai", "Hyderabad", "Mumbai", "Delhi", "Bangalore"],
          description: {
            enabled: false,
            value: "",
          },
          rules: {
            required: { value: true },
          },
          value: "",
        },
      ],
    },
    {
      id: "ad431f05-46b4-41dc-a803-c65eaa3fd94f",
      title: "Loreum Ispum",
      description: "Loreum Ispum",
      fields: [
        {
          id: "e15459e7-1347-41ab-9334-4884be1d1cd1",
          title: "Loreum Ipsum",
          type: "input",

          description: {
            enabled: true,
            value: "",
          },
          rules: { required: { value: true } },
          value: "",
        },
        {
          id: "3c4a7001-94da-4ad7-9513-187bac3f1dc8",
          title: "Loreum Ipsum",
          type: "input",

          description: {
            enabled: false,
            value: "",
          },
          rules: { required: { value: true } },
          value: "",
        },
        {
          id: "32d54e03-7060-4a4d-a83b-3ac47f487e3a",
          title: "Gender",
          type: "radio",

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
          value: "",
        },
        {
          id: "c1671459-27f1-4031-9720-2a411879980f",
          title: "Hobbies",
          type: "checkbox",

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
          value: [],
        },
        {
          id: "c6b3af39-dfa3-4eba-b7ef-5b0194d6ba1b",
          title: "Location",
          type: "dropdown",
          options: ["Chennai", "Hyderabad", "Mumbai", "Delhi", "Bangalore"],
          description: {
            enabled: false,
            value: "",
          },
          rules: { required: { value: true } },
          value: "",
        },
      ],
    },
  ],
};

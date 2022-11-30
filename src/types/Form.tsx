import { ChangeEvent } from "react";

export type FormDetail = {
  theme: string;
  header: FormHeader;
  sections: FormField[][];
};

export type FormHeader = {
  id: string;
  title: string;
  description: string;
};

export type FormTypes = {
  selectedId: string | null;
  formDetail: FormDetail;
  handleChangeForm: (
    event:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLDivElement>
      | ChangeEvent<HTMLTextAreaElement>
  ) => void;
  handleClickForm: (fieldId: string) => void;
  handleDeleteForm: (sectionindex: string, fieldindex: string) => void;
  handleDuplicateForm: (sectionindex: string, fieldindex: string) => void;
  handleFormHeader: (event: ChangeEvent<HTMLDivElement>) => void;
  handleAddOther: (sectionindex: string, fieldindex: string) => void;
  handleAddOption: (sectionindex: string, fieldindex: string) => void;
  handleFormType: (
    sectionindex: string,
    fieldindex: string,
    type: FormType
  ) => void;
  handleDeleteOptions: (
    sectionindex: string,
    fieldindex: string,
    optionindex: string
  ) => void;
  handleMoreOptions: (
    sectionindex: string,
    fieldindex: string,
    action: FormMoreOption["action"]
  ) => void;
  handleDeleteOther: (sectionindex: string, fieldindex: string) => void;
  handleRequired: (sectionindex: string, fieldindex: string) => void;
  handleFormTheme: (theme: FormTheme) => void;
};

export type FormTheme = "dark" | "light";

export type FormMoreOption = {
  label: string;
  action: "description" | "shuffle";
};

export type FormType =
  | "checkbox"
  | "dropdown"
  | "radio"
  | "textarea"
  | "input"
  | "date"
  | "file";

export type FormRules = {
  required?: boolean;
  pattern?: RegExp;
  minLength?: number;
  maxLength?: number;
  validate?: () => boolean;
};

export type FormErrorText = {
  required?: string;
  pattern?: string;
  minLength?: string;
  maxLegth?: string;
  validate?: string;
};

export type FormField = {
  id: string;
  question: string;
  value: string | string[];
  type: FormType;
  description: {
    enabled: boolean;
    value: string;
  };
  required?: boolean;
  options?: string[];
  other?: {
    enabled: boolean;
    value: string;
  };
};

export type FormParams = {
  formId: string;
};

export type FormTypeOption = {
  label: string;
  icon: string;
  type: FormType;
};

export type FormCustomAttributes = {
  type: FormType;
  name: Exclude<keyof FormField, "id">;
} & FormIndexes;

export type FormIndexes = {
  sectionindex: string;
  fieldindex: string;
  optionindex?: string;
};

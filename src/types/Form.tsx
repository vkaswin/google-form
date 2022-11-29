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

export type FormContextType = {
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
  handleMoreOptions: (action: FormMoreOption["action"], id: string) => void;
};

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
  description?: string;
  validation?: {
    rules?: FormRules;
    errorText?: FormErrorText;
  };
  options?: string[];
  other?: string;
};

export type FormParams = {
  formId: string;
};

export type FormTypeOption = {
  label: string;
  icon: string;
  type: FormType;
};

export type FormHandler = (
  id: string,
  type: FormType,
  value: string,
  fields: FormField[]
) => void;

export type FormCustomAttributes = {
  type: FormType;
  name: Exclude<keyof FormField, "id" | "validation">;
} & FormIndexes;

export type FormIndexes = {
  sectionindex: string;
  fieldindex: string;
  optionindex?: string;
};

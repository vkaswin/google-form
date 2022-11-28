import { ChangeEvent } from "react";

export type FormDetail = {
  theme: string;
  title: string;
  description: string;
  fields: FormField[];
};

export type FormContextType = {
  selectedId: string | null;
  handleChangeForm: <E>(data: {
    key: Exclude<keyof FormField, "id" | "validation">;
    id: string;
    type: FormType;
    event?:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLDivElement>
      | ChangeEvent<HTMLTextAreaElement>;
  }) => void;
  handleClickForm: (id: string) => void;
  handleDeleteForm: (id: string) => void;
  handleDuplicateForm: (id: string) => void;
  handleMoreOptions: (action: FormMoreOption["action"], id: string) => void;
  formDetail: FormDetail;
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
  readonly id: string;
  question: string;
  value: string | string[];
  type: FormType;
  description?: string;
  validation?: {
    rules?: FormRules;
    errorText?: FormErrorText;
  };
  options?: FormOption[];
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

export type FormOption = {
  value: string;
  url?: string;
};

export type FormHandler = (data: {
  id: string;
  type: FormType;
  fields: FormField[];
  value?: string;
}) => void;

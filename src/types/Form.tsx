export type FormDetail = {
  theme: string;
  title: string;
  description: string;
  fields: Field[];
};

export type Rules = {
  required?: boolean;
  pattern?: RegExp;
  minLength?: number;
  maxLength?: number;
  validate?: () => boolean;
};

export type ErrorText = {
  required?: string;
  pattern?: string;
  minLength?: string;
  maxLegth?: string;
  validate?: string;
};

export type Type =
  | "checkbox"
  | "dropdown"
  | "radio"
  | "input"
  | "textarea"
  | "date"
  | "file";

export type Options = {
  label: string;
  value: string;
};

export type Field = {
  label?: string;
  value?: string;
  type?: Type;
  description?: string;
  validation?: {
    rules?: Rules;
    errorText?: ErrorText;
  };
  options?: Options[];
};

export type FormParams = {
  formId: string;
};

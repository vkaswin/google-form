export type FormDetail = {
  theme: string;
  title: string;
  description: string;
  fields: Field[];
};

export type FormContextType = {
  selectedId: string | null;
  handleChange: (
    key: Exclude<keyof Field, "id" | "validation">,
    id: string,
    type: FormType
  ) => void;
  handleClickForm: (id: string) => void;
  formDetail: FormDetail;
};

export type FormType =
  | "checkbox"
  | "dropdown"
  | "radio"
  | "input"
  | "textarea"
  | "date"
  | "file";

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

export type Options = {
  label: string;
  value: string;
};

export type Field = {
  readonly id: string;
  label?: string;
  value: string | string[];
  type: FormType;
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

export type FormOption = {
  label: string;
  icon: string;
  type: FormType;
};

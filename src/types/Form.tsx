export type FormDetail = {
  theme: string;
  title: string;
  description: string;
  fields: FormField[];
};

export type FormContextType = {
  selectedId: string | null;
  handleChange: (
    key: Exclude<keyof FormField, "id" | "validation">,
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

export type FormDropDown = {
  label: string;
  icon: string;
  type: FormType;
};

export type FormOption = {
  value: string;
  url?: string;
};

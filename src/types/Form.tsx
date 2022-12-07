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

export type HandleFormHeader = (data: {
  key: Exclude<keyof FormHeader, "id">;
  value: string;
}) => void;

export type HandleFormChange = (
  event: any,
  options: {
    type: FormType | "header";
    indexes?: FormIndexes;
  }
) => void;

export type HandleFormAction = (
  action: FormAction,
  indexes: FormIndexes,
  options?: {
    type?: FormType;
    theme?: FormTheme;
    option?: "description" | "shuffle";
  }
) => void;

export type FormAction =
  | "theme"
  | "required"
  | "delete-option"
  | "type"
  | "add-option"
  | "other"
  | "duplicate-form"
  | "delete-form"
  | "focus-form"
  | "more-option";

export type FormTheme = "dark" | "light";

export type FormMoreOption = {
  label: string;
  option: "description" | "shuffle";
};

export type FormType =
  | "checkbox"
  | "dropdown"
  | "radio"
  | "textarea"
  | "input"
  | "date"
  | "file"
  | "texteditor";

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
  error?: boolean;
  options?: string[];
  other?: {
    enabled: boolean;
    value: string;
  };
};

export type FormKeys = Exclude<keyof FormField, "id"> | "header";

export type FormHeaderKeys = Exclude<keyof FormHeader, "id">;

export type FormParams = {
  formId: string;
};

export type FormTypeOption = {
  label: string;
  icon: string;
  type: FormType;
};

export type FormIndexes = {
  sectionIndex: number;
  fieldIndex: number;
  optionIndex?: number;
};

export type FormPages = {
  isEdit: boolean;
  isPreview: boolean;
  isFill: boolean;
};

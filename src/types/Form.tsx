export type FormDetail = {
  theme: string;
  sections: FormSection[];
};

export type FormSection = {
  id: string;
  title: string;
  description: string;
  fields: FormField[];
};

export type HandleFormChange = (data: {
  key: FormKeys;
  value: string;
  type: FormType;
  checked?: boolean;
  indexes?: FormIndexes;
}) => void;

export type HandleFormAction = (
  action: FormAction,
  indexes: FormIndexes,
  options?: {
    type?: FormType;
    theme?: FormTheme;
    option?: "description" | "shuffle";
  }
) => void;

export type HandleFormError = (field: FormField) => void;

export type HandleFormSection = (data: {
  key: "title" | "description";
  value: string;
  sectionIndex: number;
}) => void;

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
  | "more-option"
  | "blur";

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
    checked: boolean;
    value: string;
    error: boolean;
  };
};

export type FormKeys = Exclude<keyof FormField, "id"> | "header";

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

export type FormDragValue = {
  source: {
    droppableId: number | null;
    draggableId: number | null;
  };
  destination: {
    droppableId: number | null;
    draggableId: number | null;
  };
  dragElement: HTMLElement | null;
};

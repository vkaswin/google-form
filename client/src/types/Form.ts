import { DragEvent, TouchEvent } from "react";
import { User } from "./Auth";

export type FormDetail = {
  _id?: Readonly<string>;
  title: string;
  colorCode: ColorCodes;
  bgCode: string;
  sections: FormSection[];
};

export type FormSection = {
  _id?: Readonly<string>;
  title?: string;
  description?: string;
  fields: FormField[];
};

export type FormTheme = "dark" | "light";

export type FormType =
  | "checkbox"
  | "dropdown"
  | "radio"
  | "textarea"
  | "input"
  | "date"
  | "file"
  | "texteditor"
  | "slider"
  | "rating";

export type FormRules = {
  required?: { value?: boolean; message?: string };
  pattern?: { value?: RegExp | string; message?: string };
  minLength?: { value?: number; message?: string };
  maxLength?: { value?: number; message?: string };
  min?: { value?: string; message?: string };
  max?: { value?: string; message?: string };
};

export type FormField = {
  _id?: Readonly<string>;
  title?: string;
  fieldType: FormType;
  description?: string;
  response?: string | string[];
  otherReason?: string;
  options?: string[];
  other?: Boolean;
  rules: FormRules;
};

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
};

export type FormPages = {
  isEdit?: boolean;
  isView?: boolean;
};

export type FormDragRef = {
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

export type HandleDragOver = (e: DragEvent<HTMLDivElement>) => void;

export type HandleDrop = () => void;

export type HandleDragLeave = <T>(
  event: DragEvent<T> | TouchEvent<T>,
  droppableId: number,
  draggableId: number
) => void;

export type HandleDragEnter = <T>(
  event: DragEvent<T> | TouchEvent<T>,
  droppableId: number,
  draggableId: number
) => void;

export type HandleDragStart = (
  droppableId: number,
  draggableId: number
) => void;

export type HandleDragEnd = () => void;

export type ColorCodes =
  | "#db4437"
  | "#673ab7"
  | "#3f51b5"
  | "#4285f4"
  | "#03a9f4"
  | "#00bcd4"
  | "#ff5722"
  | "#ff9800"
  | "#009688"
  | "#4caf50"
  | "#607d8b"
  | "#9e9e9e";

export type BGCodeList = Record<ColorCodes, string[]>;

export type ColorCodeList = Record<ColorCodes, string>;

export type FormActions =
  | "add-field"
  | "add-section"
  | "delete-field"
  | "duplicate-field";

export type FormIcon = {
  label: string;
  name: string;
  icon: string;
  action: FormActions;
};

export type HandleFormAction = (
  data: { action: FormActions } & FormIndexes
) => void;

export type FormSubmitData = {
  fieldId: string;
  response: string | string[] | null;
};

export type FormResponse = {
  formId: string;
  responses: FormSubmitData[];
};

export type FormData = {
  readonly _id: string;
  title: string;
  updatedAt: string;
  createdAt: string;
};

export type FormResponses = {
  readonly _id: string;
  bgCode: string;
  colorCode: ColorCodes;
  title: string;
  description: string;
  fields: {
    readonly _id: string;
    title: string;
  }[];
  formResponses: {
    readonly _id: string;
    user: User;
    responses: {
      readonly fieldId: string;
      response: string | string[];
    }[];
    createdAt: string;
    updatedAt: string;
  }[];
};

export type PageMeta = {
  page: number;
  total: number;
  totalPages: number;
};

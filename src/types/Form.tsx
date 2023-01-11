import { DragEvent, TouchEvent } from "react";
import { UseForm } from "./UseForm";

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

export type FormTheme = "dark" | "light";

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
  required?: { value?: boolean; message?: string };
  pattern?: { value?: RegExp; message?: string };
  minLength?: { value?: number; message?: string };
  maxLength?: { value?: number; message?: string };
  min?: { value?: string; message?: string };
  max?: { value?: string; message?: string };
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
    checked: boolean;
    value: string;
  };
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

export type FormContext = UseForm;

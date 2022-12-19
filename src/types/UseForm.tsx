import { ChangeEvent, FocusEvent } from "react";

export type FormRegister = (
  name: string,
  options?: FormOptions
) =>
  | ({
      ref: (ref: any) => void;
      onInput?: <T>(event: ChangeEvent<T>) => void;
    } & FormRules)
  | undefined;

type ValidateFunction = (value: FormValueType) => boolean | undefined;

type FormOptions = {
  required?: boolean | { value?: boolean; message?: string };
  pattern?: RegExp | { value?: RegExp; message?: string };
  minLength?: number | { value?: number; message?: string };
  maxLength?: number | { value?: number; message?: string };
  min?: string | { value?: string; message?: string };
  max?: string | { value?: string; message?: string };
  validate?:
    | ValidateFunction
    | {
        value?: ValidateFunction;
        message?: string;
      };
  valueAsNumber?: boolean;
  valueAsDate?: boolean;
};

export type FormRules = {
  name: string;
  required?: boolean;
  pattern?: string;
  minLength?: number;
  maxLength?: number;
  min?: string;
  max?: string;
  valueAsNumber?: boolean;
  valueAsDate?: boolean;
};

export type FormSubmit = (
  onValid?: OnValid,
  onInvalid?: OnInvalid
) => (event: any) => void;

export type OnValid = (formValues: FormRecord) => void;

export type OnInvalid = (errors: FormRecord) => void;

export type FormValidateAllFields = (
  onValid?: OnValid,
  onInvalid?: OnInvalid
) => void;

export type FormValidate = (data: {
  name: string;
  ref: HTMLInputElement;
  render?: boolean;
}) => void;

export type FormValueSetter = (name: string, ref: HTMLInputElement) => void;

export type Field = {
  ref: HTMLInputElement;
  options: FormOptions;
  refs?: HTMLInputElement[];
};

export type FormRecord = {
  [key in string]: any;
};

export type FormFields = Record<string, Field>;

type FormValueType =
  | string
  | string[]
  | boolean
  | number
  | Date
  | FileList
  | null;

type WatchFunction = <T>(
  name: string,
  event: ChangeEvent<T>,
  value: FormValueType
) => void;

type WatchData = string | string[];

export type Watcher = { name?: WatchData; fn?: WatchFunction };

export type Watch = (name: WatchData, fn: WatchFunction) => void;

export type SetError = (name: string, error: string) => void;

export type ClearError = (name: string) => void;

export type SetFormField = (data: {
  name: string;
  ref: HTMLInputElement;
  options: FormOptions;
  field?: Field;
}) => void;

type FormTypes = "fields" | "errors" | "values";

export type FormSetter = (data: {
  name: string;
  value?: any;
  type: FormTypes;
  remove?: boolean;
  render?: boolean;
}) => void;

export type FormGetter = <T extends FormTypes>(
  name: string,
  type: T
) => T extends "fields" ? Field | undefined : any;

export type GetValue = (name: string) => FormValueType;

export type SetValue = (name: string, value: FormValueType) => void;

export type ResetField = (name: string) => void;

export type ResetFormField = (name: string, field: Field) => void;

export type ValidateField = (name: string) => void;

export type FormErrorTypes =
  | "required"
  | "minLength"
  | "maxLength"
  | "min"
  | "max"
  | "pattern"
  | "validate";

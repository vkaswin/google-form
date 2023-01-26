import { FocusEvent, ChangeEvent, Dispatch, SetStateAction } from "react";

export type FormRegister = (
  name: string,
  options?: FormOptions
) =>
  | ({
      ref: (ref: any) => void;
      onInput: <T>(event: ChangeEvent<T>) => void;
      onBlur: <T>(event: FocusEvent<T>) => void;
    } & FormRules)
  | undefined;

type ValidateFunction = (value: FormValueType) => boolean | undefined;

type FormOptions = {
  required?: boolean | { value?: boolean; message?: string };
  pattern?: RegExp | { value?: RegExp | string; message?: string };
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

export type FormSubmit<T> = (
  onValid?: OnValid<T>,
  onInvalid?: OnInvalid
) => (event: any) => void;

export type OnValid<T> = (formValues: T) => void;

export type OnInvalid = (errors: any) => void;

export type FormValidateAllFields<T> = (
  onValid?: OnValid<T>,
  onInvalid?: OnInvalid
) => boolean;

export type FormValidate = (data: {
  name: string;
  ref: HTMLInputElement;
  updateState?: boolean;
}) => void;

export type FormValueSetter = (name: string, ref: HTMLInputElement) => void;

export type Field = {
  ref: HTMLInputElement;
  options: FormOptions;
  refs?: HTMLInputElement[];
};

export type FormValues = {
  [key in string]: any;
};

export type FormFields = {
  [key in string]: Field;
};

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

export type FormSetter = (name: string, value: any, fields: any) => void;

export type FormGetter = (name: string, fields: any) => any;

export type GetValue = (name: string) => unknown;

export type SetValue = (name: string, value: any) => void;

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

export type Reset = () => void;

export type SetFormValues<T> = (values: T) => void;

export type ClearValue = (name: string) => void;

export type FormUnSet = (name: string, fields: any) => void;

export type UseForm<T = FormValues> = {
  register: FormRegister;
  setValue: SetValue;
  getValue: GetValue;
  watch: Watch;
  reset: Reset;
  resetField: ResetField;
  setError: SetError;
  clearError: ClearError;
  validate: ValidateField;
  handleSubmit: FormSubmit<T>;
  clearValue: ClearValue;
  setFormData: (data: T, notifyServer?: boolean) => void;
  formData: Readonly<T>;
  formErrors: Readonly<Record<string, any>>;
};

import { ChangeEvent, FocusEvent, useRef, useState } from "react";

type FormRegister = (
  name: string,
  options?: FormOptions
) =>
  | ({
      ref: <T>(ref: T) => void;
      onChange: <T>(event: ChangeEvent<T>) => void;
      onBlur?: (event: FocusEvent) => void;
    } & FormRules)
  | undefined;

type FormOptions = {
  required?: { value?: boolean; message?: string };
  pattern?: { value?: RegExp; message?: string };
  minLength?: { value?: number; message?: string };
  maxLength?: { value?: number; message?: string };
  min?: { value?: string; message?: string };
  max?: { value?: string; message?: string };
  validate?: {
    value: (value: FormValueType) => boolean | undefined;
    message: string;
  };
  valueAsNumber?: boolean;
  valueAsDate?: boolean;
};

type FormRules = {
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

type FormSubmit = (
  onValid?: OnValid,
  onInvalid?: OnInvalid
) => (event: any) => void;

type OnValid = (formValues: FormValues) => void;
type OnInvalid = (errors: FormErrors) => void;

type FormValidate = (name: string, ref: HTMLInputElement) => string | undefined;

type FormValueSetter = (name: string, ref: HTMLInputElement) => void;

type Field = {
  ref: HTMLInputElement;
  options: FormOptions;
  refs?: HTMLInputElement[];
};

type FormFields = Record<string, Field>;

type FormValues = Record<string, FormValueType>;

type FormValueType =
  | string
  | string[]
  | boolean
  | number
  | Date
  | FileList
  | null;

type FormErrors = Record<string, string>;

type WatchFunction = <T>(
  name: string,
  event: ChangeEvent<T>,
  value: FormValueType
) => void;

type WatchData = string | string[];

type Watcher = { name?: WatchData; fn?: WatchFunction };

type Watch = (name: WatchData, fn: WatchFunction) => void;

type SetError = (name: string, error: string) => void;

type ClearError = (name: string) => void;

type SetFormField = (data: {
  name: string;
  ref: HTMLInputElement;
  options: FormOptions;
}) => void;

const isCheckBoxOrRadio = (type: string): boolean => {
  return type === "checkbox" || type === "radio";
};

const isFile = (type: string): boolean => {
  return type === "file";
};

const useForm = () => {
  let formFields = useRef<FormFields>({});
  let [formErrors, setFormErrors] = useState<FormErrors>({});
  let formValues = useRef<FormValues>({});
  let watcher = useRef<Watcher>({});

  const setFormField: SetFormField = ({ name, ref, options }) => {
    let fields = { ...formFields.current };

    let field = fields[name];

    if (isCheckBoxOrRadio(ref.type)) {
      if (
        field &&
        field.ref &&
        Array.isArray(field.refs) &&
        !field.refs.includes(ref)
      ) {
        fields[name] = { ...field, refs: [...field.refs, ref] };
      } else {
        fields[name] = {
          ref: { name, type: ref.type } as any,
          refs: [ref],
          options,
        };
      }
    } else {
      fields[name] = {
        ref,
        options,
      };
    }

    if (typeof formValues.current[name] === "undefined") {
      formValues.current = { ...formValues.current, [name]: "" };
    }

    formFields.current = fields;
  };

  const setFieldValue: FormValueSetter = (name, ref) => {
    let values = { ...formValues.current };
    let field = formFields.current[name];
    let value = values[name];

    if (isCheckBoxOrRadio(ref.type)) {
      if (Array.isArray(field.refs) && field.refs.length > 1) {
        if (Array.isArray(value)) {
          if (ref.checked) {
            value.push(ref.value);
          } else {
            value.splice(value.indexOf(ref.value), 1);
          }
        } else {
          value = [ref.value];
        }
      } else {
        if (ref.checked) {
          value = ref.value;
        } else {
          value = "";
        }
      }
    } else if (isFile(ref.type)) {
      value = ref.files;
    } else {
      value = ref.value;
    }

    values[name] = value;

    formValues.current = values;
  };

  const validateField: FormValidate = (name, ref) => {
    let field = formFields.current[name];

    if (!field) return;

    let { validate, max, min, pattern, required, maxLength, minLength } =
      field.options || {};

    if (isCheckBoxOrRadio(ref.type)) {
      let value = formValues.current[name] as string;

      if (required?.value && value.length === 0) {
        return required?.message || "This field is required";
      }
    } else if (!ref.checkValidity()) {
      let {
        valueMissing,
        patternMismatch,
        rangeUnderflow,
        rangeOverflow,
        tooShort,
        tooLong,
      } = ref.validity;

      if (valueMissing && required?.value) {
        return required?.message || "This field is required";
      } else if (rangeOverflow && max?.value && max.message) {
        return (
          max?.message || `This field should not be greater than ${ref.max}`
        );
      } else if (rangeUnderflow && min?.value && min.message) {
        return min?.message || `This field should not be less than ${ref.min}`;
      } else if (tooLong && maxLength?.value) {
        return (
          maxLength?.message ||
          `This field should contain atleast ${ref.maxLength} characters`
        );
      } else if (tooShort && minLength?.value) {
        return (
          minLength?.message ||
          `This field should contain atleast ${ref.minLength} characters`
        );
      } else if (patternMismatch && pattern?.value) {
        return pattern?.message || "This field has mismatched pattern";
      }
    } else if (
      typeof validate?.value === "function" &&
      validate.value(formValues.current[name])
    ) {
      return validate.message || "Validation failed for this field";
    }
  };

  const register: FormRegister = (name, options = {}) => {
    let {
      max,
      maxLength,
      min,
      minLength,
      pattern,
      required,
      valueAsDate,
      valueAsNumber,
    } = options;

    let formRules = {} as FormRules;

    formRules.name = name;
    if (required?.value) formRules.required = required.value;
    if (max?.value) formRules.max = max.value;
    if (min?.value) formRules.min = min.value;
    if (minLength?.value) formRules.minLength = minLength.value;
    if (maxLength?.value) formRules.maxLength = maxLength.value;
    if (pattern?.value) formRules.pattern = pattern.value.source;
    if (valueAsNumber) formRules.valueAsDate = valueAsDate;
    if (valueAsNumber) formRules.valueAsNumber = valueAsNumber;

    return {
      ref: (ref) => {
        if (!ref) return;

        setFormField({
          name,
          options,
          ref: ref as unknown as HTMLInputElement,
        });
      },
      onChange: (event) => {
        let ref = event.target as unknown as HTMLInputElement;
        setFieldValue(name, ref);
        let prevError = formErrors[name];
        let error = validateField(name, ref);

        if (typeof error === "undefined") {
          if (formErrors[name]) {
            let errors = { ...formErrors };
            delete errors[name];
            setFormErrors(errors);
          }
        } else if (prevError !== error) {
          let errors = { ...formErrors };
          errors[name] = error;
          setFormErrors(errors);
        }

        if (watcher.current.name && watcher.current.fn) {
          let { name: watchName, fn } = watcher.current;
          if (
            Array.isArray(watchName)
              ? watchName.includes(name)
              : watchName === name
          ) {
            let value = formValues.current[name];
            fn(name, event, value);
          }
        }
      },
      ...formRules,
    };
  };

  const focusField = (errors: FormErrors) => {
    let errorKeys = Object.keys(errors);

    if (errorKeys.length === 0) return;

    let field = formFields.current[errorKeys[0]];

    if (!field || !field.ref.focus) return;

    field.ref.focus();
  };

  const validateAllFields = (
    onValid?: OnValid,
    onInvalid?: OnInvalid
  ): void => {
    let errors = { ...formErrors };

    for (let name in formFields.current) {
      let field = formFields.current[name];

      //TODO CHECK VALIDITY OF A FIELD TO IGNORE THE ERROR
      //   if (typeof field === "undefined" || field.ref.checkValidity()) continue;

      let error = validateField(name, field.ref);
      let prevError = errors[name];
      if (typeof error === "undefined") {
        delete errors[name];
      } else if (prevError !== error) {
        errors[name] = error;
      }
    }

    let hasError = Object.keys(errors).length !== 0;

    if (hasError) {
      focusField(errors);
      if (typeof onInvalid === "function") onInvalid(errors);
    } else {
      if (typeof onValid === "function") onValid(formValues.current);
    }

    setFormErrors(errors);
  };

  const handleSubmit: FormSubmit = (onValid, onInvalid) => {
    return (event: Event) => {
      event.preventDefault();
      validateAllFields(onValid, onInvalid);
    };
  };

  const watch: Watch = (name, fn) => {
    watcher.current.name = name;
    watcher.current.fn = fn;
  };

  const setError: SetError = (name, error) => {
    let errors = { ...formErrors };
    errors[name] = error;
    setFormErrors(errors);
  };

  const clearError: ClearError = (name) => {
    let errors = { ...formErrors };
    delete errors[name];
    setFormErrors(errors);
  };

  return {
    watch,
    register,
    setError,
    clearError,
    handleSubmit,
    formErrors,
  };
};

export default useForm;

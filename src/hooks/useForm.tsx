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

type GetValue = (name: string) => FormValueType;

type SetValue = (name: string, value: FormValueType) => void;

type ResetField = (name: string) => void;

type ResetFormField = (
  name: string,
  field: Field,
  formValues: FormValues
) => void;

const isCheckBoxOrRadioInput = (type: string): boolean => {
  return type === "checkbox" || type === "radio";
};

const isFileInput = (type: string): boolean => {
  return type === "file";
};

const useForm = () => {
  let formFields = useRef<FormFields>({});
  let [formErrors, setFormErrors] = useState<FormErrors>({});
  let formValues = useRef<FormValues>({});
  let watcher = useRef<Watcher>({});
  let isSubmitted = useRef<boolean>(false);

  const setFormField: SetFormField = ({ name, ref, options }) => {
    let fields = { ...formFields.current };

    let field = fields[name];

    if (isCheckBoxOrRadioInput(ref.type)) {
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

    if (isCheckBoxOrRadioInput(ref.type)) {
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
    } else if (isFileInput(ref.type)) {
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

    let error: string | undefined;

    if (isCheckBoxOrRadioInput(ref.type)) {
      let value = formValues.current[name] as string;

      if (
        (typeof required === "boolean" ? required : required?.value) &&
        value.length === 0
      ) {
        error = typeof required === "object" ? required.message : undefined;
        return error || "This field is required";
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

      if (
        valueMissing &&
        (typeof required === "boolean" ? required : required?.value)
      ) {
        error = typeof required === "object" ? required.message : undefined;
        return error || "This field is required";
      } else if (
        rangeOverflow &&
        (typeof max === "string" ? max : max?.value)
      ) {
        error = typeof max === "object" ? max.message : undefined;
        return error || `This field should not be greater than ${ref.max}`;
      } else if (
        rangeUnderflow &&
        (typeof min === "string" ? min : min?.value)
      ) {
        error = typeof min === "object" ? min.message : undefined;
        return error || `This field should not be less than ${ref.min}`;
      } else if (
        tooLong &&
        (typeof maxLength === "number" ? maxLength : maxLength?.value)
      ) {
        error = typeof maxLength === "object" ? maxLength.message : undefined;
        return (
          error ||
          `This field should contain atleast ${ref.maxLength} characters`
        );
      } else if (
        tooShort &&
        (typeof minLength === "number" ? minLength : minLength?.value)
      ) {
        error = typeof minLength === "object" ? minLength.message : undefined;
        return (
          error ||
          `This field should contain atleast ${ref.minLength} characters`
        );
      } else if (
        patternMismatch &&
        (pattern instanceof RegExp ? pattern : pattern?.value)
      ) {
        error = typeof required === "object" ? required.message : undefined;
        return error || "This field has mismatched pattern";
      }
    } else {
      let validateFn =
        typeof validate === "function" ? validate : validate?.value;
      if (typeof validateFn !== "function") return;
      let value = formValues.current[name];
      if (validateFn(value)) {
        error = typeof validate === "object" ? validate.message : undefined;
        return error || "Validation failed for this field";
      }
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
    if (typeof required === "boolean" || required?.value) {
      formRules.required =
        typeof required === "boolean" ? required : required.value;
    }
    if (typeof max === "string" ? max : max?.value) {
      formRules.max = typeof max === "object" ? max.value : max;
    }
    if (typeof min === "string" ? min : min?.value) {
      formRules.min = typeof min === "object" ? min.value : min;
    }
    if (typeof minLength === "number" ? minLength : minLength?.value) {
      formRules.minLength =
        typeof minLength === "object" ? minLength.value : minLength;
    }
    if (typeof maxLength === "number" ? maxLength : maxLength?.value) {
      formRules.maxLength =
        typeof maxLength === "object" ? maxLength.value : maxLength;
    }
    if (pattern instanceof RegExp ? pattern : pattern?.value) {
      formRules.pattern =
        pattern instanceof RegExp ? pattern.source : pattern?.value?.source;
    }
    if (valueAsNumber) {
      formRules.valueAsDate = valueAsDate;
    }
    if (valueAsNumber) {
      formRules.valueAsNumber = valueAsNumber;
    }

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

        if (!isSubmitted.current) return;

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
      },
      ...formRules,
    };
  };

  const focusField = (errors: FormErrors) => {
    let errorKeys = Object.keys(errors);

    if (errorKeys.length === 0) return;

    let fieldName: string | undefined;

    for (let field of Object.keys(formFields.current)) {
      if (errorKeys.includes(field)) {
        fieldName = field;
        break;
      }
    }

    if (!fieldName) return;

    let field = formFields.current[fieldName];

    if (!field) return;

    let ref: HTMLInputElement;

    if (field.refs) {
      ref = field.refs[0];
    } else {
      ref = field.ref;
    }

    ref.focus();
    ref.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const validateAllFields = (
    onValid?: OnValid,
    onInvalid?: OnInvalid
  ): void => {
    let errors = { ...formErrors };

    for (let name in formFields.current) {
      let field = formFields.current[name];
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
      if (!isSubmitted.current) {
        isSubmitted.current = true;
      }
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
    if (typeof formErrors[name] === "undefined") return;
    let errors = { ...formErrors };
    delete errors[name];
    setFormErrors(errors);
  };

  const setValue: SetValue = (name, value) => {
    let values = { ...formValues.current };
    values[name] = value;
    formValues.current = values;
  };

  const getValue: GetValue = (name) => {
    let value = formValues.current[name];
    if (typeof value === "undefined") return null;
    return value;
  };

  const resetFormField: ResetFormField = (name, field, formValues) => {
    if (isCheckBoxOrRadioInput(field.ref.type)) {
      if (Array.isArray(field.refs)) {
        for (let ref of field.refs) {
          ref.checked = false;
        }
        if (field.refs.length > 1) {
          formValues[name] = [];
        } else {
          formValues[name] = "";
        }
      }
    } else {
      if (isFileInput(field.ref.type)) {
        field.ref.files = null;
      } else {
        field.ref.value = "";
      }
      formValues[name] = "";
    }
  };

  const reset = (): void => {
    let values = { ...formValues.current };

    for (let name in formFields.current) {
      let field = formFields.current[name];
      if (!field) continue;
      resetFormField(name, field, values);
    }

    isSubmitted.current = false;
    formValues.current = values;
    setFormErrors({});
  };

  const resetField: ResetField = (name) => {
    let field = formFields.current[name];
    if (!field) return;
    let values = { ...formValues.current };
    resetFormField(name, field, values);
    formValues.current = values;
    clearError(name);
  };

  return {
    watch,
    reset,
    register,
    setValue,
    getValue,
    setError,
    clearError,
    resetField,
    handleSubmit,
    formErrors,
  };
};

export default useForm;

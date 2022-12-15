import { ChangeEvent, FocusEvent, useRef } from "react";

type FormRegister = (
  name: string,
  options?: FormOptions
) =>
  | {
      ref: <T>(ref: T) => void;
      onChange: <T>(event: ChangeEvent<T>) => void;
      onBlur?: (event: FocusEvent) => void;
    }
  | undefined;

type FormOptions = {
  required?: { value?: boolean; message?: string };
  pattern?: { value?: RegExp; message?: string };
  minLength?: { value?: number; message?: string };
  maxLength?: { value?: number; message?: string };
  min?: { value?: string; message?: string };
  max?: { value?: string; message?: string };
  validate?: { value: (value: string) => boolean; message: string };
};

type FormSubmit = (
  onValid?: (formValues: FormValues) => void,
  onInvalid?: (errors: FormErrors) => void
) => (event: any) => void;

type FormValidate = (field: Field, name: string) => void;

type FormValueSetter = (ref: HTMLInputElement, name: string) => void;

type Field = {
  ref: HTMLInputElement | HTMLInputElement[];
  options: FormOptions;
};

type FormFields = Record<string, Field>;

type FormValues = Record<string, string | string[] | boolean>;

type FormErrors = Record<string, string>;

const isCheckBox = (type: string): boolean => {
  return type === "checkbox";
};

const isCheckBoxOrRadio = (type: string): boolean => {
  return type === "checkbox" || type === "radio";
};

const useForm = () => {
  let formFields = useRef<FormFields>({});
  let formErrors = useRef<FormErrors>({});
  let formValues = useRef<FormValues>({});

  const setFormValidation = (
    ref: HTMLInputElement,
    name: string,
    options: FormOptions
  ) => {
    let checkBoxOrRadio = isCheckBoxOrRadio(ref.type);
    let fields = { ...formFields.current };
    let values = { ...formValues.current };
    ref.name = name;
    let { max, maxLength, min, minLength, pattern, required } = options;

    if (required?.value) ref.required = required.value;

    if (!checkBoxOrRadio) {
      if (max?.value) ref.max = max.value;
      if (min?.value) ref.min = min.value;
      if (minLength?.value) ref.minLength = minLength.value;
      if (maxLength?.value) ref.maxLength = maxLength.value;
      if (pattern?.value) ref.pattern = pattern.value.source;
    }

    if (checkBoxOrRadio) {
      if (Array.isArray(fields[name]?.ref)) {
        (fields[name].ref as HTMLInputElement[]).push(ref);
      } else if (fields[name]?.ref) {
        fields[name] = {
          ref: [fields[name].ref as HTMLInputElement, ref],
          options,
        };
      } else {
        fields[name] = { ref, options };
      }
    } else {
      fields[name] = {
        ref,
        options,
      };
    }

    values[name] =
      isCheckBox(ref.type) && Array.isArray(fields[name]?.ref) ? [] : "";

    formFields.current = fields;
    formValues.current = values;
  };

  const setFormField = <T,>(name: string, ref: T, options: FormOptions) => {
    if (ref instanceof HTMLFieldSetElement) {
      for (let element of ref.elements) {
        setFormValidation(element as HTMLInputElement, name, options);
      }
    } else {
      setFormValidation(ref as HTMLInputElement, name, options);
    }
  };

  const hasError = (): boolean => {
    return Object.keys(formErrors.current).length !== 0;
  };

  const setFieldValues: FormValueSetter = (ref, name) => {
    let values = formValues.current;

    if (isCheckBoxOrRadio(ref.type)) {
      if (
        isCheckBox(ref.type) &&
        Array.isArray(formFields.current[ref.name].ref)
      ) {
        let value = values[ref.name] as string[];
        if (ref.checked) {
          value.push(ref.value);
        } else {
          value.splice(value.indexOf(ref.value), 1);
        }
      } else {
        values[name] = ref.checked ? ref.value || ref.checked : "";
      }
    } else {
      values[name] = ref.value;
    }

    formValues.current = values;
  };

  const validateField: FormValidate = ({ ref, options }, name) => {
    let { validate, max, min, pattern, required, maxLength, minLength } =
      options || {};

    let errors = { ...formErrors.current };

    if (Array.isArray(ref)) {
      if (!required?.value) return;

      let value = formValues.current[name] as string[];

      if (value.length > 0) {
        delete errors[name];
      } else {
        errors[name] = required?.message || "This field is required";
      }
    } else {
      let isValid = ref.checkValidity();

      if (isValid) {
        delete errors[name];
      } else {
        let {
          valueMissing,
          patternMismatch,
          rangeUnderflow,
          rangeOverflow,
          tooShort,
          tooLong,
        } = ref.validity;

        if (valueMissing && required?.value) {
          errors[name] = required?.message || "This field is required";
        } else if (rangeOverflow && max?.value && max.message) {
          errors[name] =
            max?.message || `This field should not be greater than ${ref.max}`;
        } else if (rangeUnderflow && min?.value && min.message) {
          errors[name] =
            min?.message || `This field should not be less than ${ref.min}`;
        } else if (tooLong && maxLength?.value) {
          errors[name] =
            maxLength?.message ||
            `This field should contain atleast ${ref.maxLength} characters`;
        } else if (tooShort && minLength?.value) {
          errors[name] =
            minLength?.message ||
            `This field should contain atleast ${ref.minLength} characters`;
        } else if (patternMismatch && pattern?.value) {
          errors[name] =
            pattern?.message || "This field has mismatched pattern";
        }
      }
    }

    // let validateFn =
    //   typeof validate?.value === "function" ? validate.value : null;

    // if (validateFn) {
    //   validateFn(ref.value);
    // }

    formErrors.current = errors;
  };

  const register: FormRegister = (name, options = {}) => {
    let field = formFields.current[name];

    if (field) return;

    return {
      ref: (ref) => {
        if (!ref) return;
        setFormField(name, ref, options);
      },
      onChange: (event) => {
        let ref = event.target as unknown as HTMLInputElement;
        validateField({ options, ref }, name);
        setFieldValues(ref, name);
      },
    };
  };

  const focusField = () => {
    let errorKeys = Object.keys(formErrors.current);

    if (errorKeys.length === 0) return;

    let field = formFields.current[errorKeys[0]];

    if (!field) return;

    if (Array.isArray(field.ref)) {
      field.ref[0].focus();
    } else {
      field.ref.focus();
    }
  };

  const validateAllFields = (): boolean => {
    for (let name in formFields.current) {
      let field = formFields.current[name];
      let value = formValues.current[name];

      if (typeof field === "undefined" || typeof value === "undefined") break;

      validateField(field, name);
    }

    if (hasError()) {
      focusField();
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit: FormSubmit = (onValid, onInvalid) => {
    return (event: Event) => {
      event.preventDefault();
      let isValid = validateAllFields();

      if (isValid) {
        if (typeof onValid === "function") onValid(formValues.current);
      } else {
        if (typeof onInvalid === "function") onInvalid(formErrors.current);
      }
    };
  };

  return {
    register,
    handleSubmit,
  };
};

export default useForm;

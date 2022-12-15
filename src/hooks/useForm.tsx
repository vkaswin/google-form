import { ChangeEvent, FocusEvent, useRef, useState } from "react";

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
  onValid?: OnValid,
  onInvalid?: OnInvalid
) => (event: any) => void;

type OnValid = (formValues: FormValues) => void;
type OnInvalid = (errors: FormErrors) => void;

type FormValidate = (field: Field, name: string) => string | undefined;

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
  let [formErrors, setFormErrors] = useState<FormErrors>({});
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

    if (Array.isArray(ref)) {
      if (!required?.value) return;

      let value = formValues.current[name] as string[];

      if (value.length > 0) return;

      return required?.message || "This field is required";
    } else {
      let isValid = ref.checkValidity();

      if (isValid) return;

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
    }

    // let validateFn =
    //   typeof validate?.value === "function" ? validate.value : null;

    // if (validateFn) {
    //   validateFn(ref.value);
    // }
  };

  const register: FormRegister = (name, options = {}) => {
    return {
      ref: (ref) => {
        if (!ref) return;
        setFormField(name, ref, options);
      },
      onChange: (event) => {
        let ref = event.target as unknown as HTMLInputElement;
        let prevError = formErrors[name];
        let error = validateField({ options, ref }, name);

        if (typeof error === "undefined") {
          if (!formErrors[name]) return;
          let errors = { ...formErrors };
          delete errors[name];
          setFormErrors(errors);
        } else if (prevError !== error) {
          let errors = { ...formErrors };
          errors[name] = error;
          setFormErrors(errors);
        }
      },
    };
  };

  const focusField = (errors: FormErrors) => {
    let errorKeys = Object.keys(errors);

    if (errorKeys.length === 0) return;

    let field = formFields.current[errorKeys[0]];

    if (!field) return;

    if (Array.isArray(field.ref)) {
      field.ref[0].focus();
    } else {
      field.ref.focus();
    }
  };

  const isValidField = (
    name: string,
    ref: HTMLInputElement | HTMLInputElement[]
  ) => {
    if (Array.isArray(ref)) {
      let value = formValues.current[name] as string[];
      return value.length > 0;
    }

    return ref.checkValidity();
  };

  const validateAllFields = (
    onValid?: OnValid,
    onInvalid?: OnInvalid
  ): void => {
    let errors = { ...formErrors };

    for (let name in formFields.current) {
      let field = formFields.current[name];
      let value = formValues.current[name];

      if (
        typeof field === "undefined" ||
        typeof value === "undefined" ||
        isValidField(name, field.ref)
      )
        break;

      let error = validateField(field, name);
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

  return {
    register,
    handleSubmit,
    formErrors,
  };
};

export default useForm;

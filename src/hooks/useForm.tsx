import { useRef, useState, createContext, useContext, useEffect } from "react";
import {
  FormErrorTypes,
  FormGetter,
  ClearError,
  Watch,
  Watcher,
  FormRegister,
  FormRules,
  FormValues,
  FormSetter,
  FormSubmit,
  FormValidate,
  FormValueSetter,
  GetValue,
  ResetField,
  ResetFormField,
  SetError,
  SetFormField,
  SetValue,
  ValidateField,
  FormValidateAllFields,
  Field,
  UseForm,
  Reset,
  ClearValue,
  FormFields,
  FormUnSet,
} from "types/UseForm";
import { isEmptyObject } from "helpers";

const isCheckBoxOrRadioInput = (type: string): boolean => {
  return type === "checkbox" || type === "radio";
};

const isCheckBox = (type: string): boolean => {
  return type === "checkbox";
};

const isFileInput = (type: string): boolean => {
  return type === "file";
};

const isContendEditable = (editable: string): boolean => {
  return editable === "true";
};

const defaultErrors = {
  required: `This field is required`,
  minLength: `Tis field should not less than minlength value`,
  maxLength: `This field should not greater than maxlength value`,
  min: `This field should not be less than min value`,
  max: `This field should not be greater than max value`,
  pattern: `This field has mismatched pattern`,
  validate: `Validation failed for this field`,
};

export const useForm = <T extends FormValues = FormValues>(
  defaultValue?: T
): UseForm<T> => {
  let { current: formNames } = useRef<string[]>([]);

  let { current: formFields } = useRef<FormFields>({});

  let [formValues, setFormValues] = useState<T>({} as T);

  let [formErrors, setFormErrors] = useState<T>({} as T);

  let { current: watcher } = useRef<Watcher>({});

  let isSubmitted = useRef(false);

  useEffect(() => {
    if (!defaultValue) return;
    setFormValues(defaultValue);
  }, [defaultValue]);

  const setFormField: SetFormField = ({ name, ref, options, field }) => {
    if (!formNames.includes(name)) {
      formNames.push(name);
    }

    let formField: Field;

    if (!isFileInput(ref.type)) {
      let defaultValue = ref.defaultValue;
      if (defaultValue) {
        ref.value = defaultValue;
      }
    }

    if (isCheckBoxOrRadioInput(ref.type)) {
      let defaultChecked = ref.defaultChecked;
      if (defaultChecked) {
        ref.checked = defaultChecked;
      }

      formField = {
        ref: { name, type: ref.type } as HTMLInputElement,
        refs:
          field && field.refs
            ? field.refs.findIndex((el) => el === ref) === -1
              ? [...field.refs, ref].filter(({ isConnected }) => isConnected)
              : field.refs
            : [ref],
        options,
      };
    } else {
      formField = {
        ref,
        options,
      };
    }

    set(name, formField, formFields);
  };

  const set: FormSetter = (name, value, fields) => {
    if (typeof fields === "undefined") return;

    if (!name.includes(".")) {
      fields[name] = value;
    } else {
      let keys = name.split(".");
      let key: string | number | undefined;
      name = keys[0];

      let obj = {
        [name]: isNaN(parseInt(keys[1]))
          ? { ...fields[name] }
          : Array.isArray(fields[name])
          ? fields[name]
          : [],
      };
      let temp = obj[name];
      keys.shift();
      key = keys[0];

      while (keys.length > 1) {
        key = keys[0];
        key = isNaN(parseInt(key)) ? key : parseInt(key);
        if (typeof temp[key] === "undefined") {
          temp[key] = isNaN(parseInt(keys[1])) ? {} : [];
        }
        temp = temp[key];
        keys.shift();
        key = keys[0];
      }

      let keyName = isNaN(parseInt(key)) ? key : parseInt(key);
      temp[keyName] = value;
      fields[name] = obj[name];
    }
  };

  const get: FormGetter = (name, fields) => {
    if (typeof fields === "undefined") return;

    if (name.includes(".")) {
      let value: any;
      let keys = name.split(".");
      let key = keys.shift();

      if (key) {
        value = fields[key];
        if (typeof value === "undefined") return;
      }

      for (let key of keys) {
        if (typeof value[key] === "undefined") return;
        value = value[key];
      }

      return value;
    } else {
      return fields[name];
    }
  };

  const setFieldValue: FormValueSetter = (name, ref) => {
    let field = get(name, formFields);
    let value = get(name, formValues);

    if (isCheckBoxOrRadioInput(ref.type)) {
      let fieldValue = ref.value || ref.checked;
      if (
        isCheckBox(ref.type) &&
        field &&
        Array.isArray(field.refs) &&
        field.refs.length > 1
      ) {
        if (Array.isArray(value)) {
          if (ref.checked) {
            value.push(fieldValue);
          } else {
            value.splice(value.indexOf(fieldValue), 1);
          }
        } else {
          value = [fieldValue];
        }
      } else {
        if (ref.checked) {
          value = fieldValue;
        } else {
          value = ref.checked;
        }
      }
    } else if (isFileInput(ref.type)) {
      value = ref.files;
    } else if (isContendEditable(ref.contentEditable)) {
      if (ref.innerHTML === "<br>") {
        ref.innerHTML = "";
      }
      value = ref.innerHTML;
    } else {
      value = ref.value;
    }

    set(name, value, formValues);
  };

  const validateField: FormValidate = ({ name, ref, updateState = true }) => {
    let prevError = get(name, formErrors);

    if (!ref) return;

    let field = get(name, formFields);

    if (!field) return;

    let { validate, max, min, pattern, required, maxLength, minLength } =
      field.options || {};
    let validateFn =
      typeof validate === "function" ? validate : validate?.value;
    let error: string | undefined;
    let errorType: FormErrorTypes | undefined;

    if (
      !isCheckBoxOrRadioInput(ref.type) &&
      typeof ref.checkValidity === "function" &&
      !ref.checkValidity()
    ) {
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
        errorType = "required";
      } else if (
        rangeOverflow &&
        (typeof max === "string" ? max : max?.value)
      ) {
        error = typeof max === "object" ? max.message : undefined;
        errorType = "max";
      } else if (
        rangeUnderflow &&
        (typeof min === "string" ? min : min?.value)
      ) {
        error = typeof min === "object" ? min.message : undefined;
        errorType = "min";
      } else if (
        tooLong &&
        (typeof maxLength === "number" ? maxLength : maxLength?.value)
      ) {
        error = typeof maxLength === "object" ? maxLength.message : undefined;
        errorType = "maxLength";
      } else if (
        tooShort &&
        (typeof minLength === "number" ? minLength : minLength?.value)
      ) {
        error = typeof minLength === "object" ? minLength.message : undefined;
        errorType = "minLength";
      } else if (
        patternMismatch &&
        (pattern instanceof RegExp ? pattern : pattern?.value)
      ) {
        error =
          !(pattern instanceof RegExp) && typeof pattern === "object"
            ? pattern.message
            : undefined;
        errorType = "pattern";
      }
    } else if (typeof validateFn === "function") {
      let value = get(name, formValues);
      if (validateFn(value)) {
        error = typeof validate === "object" ? validate.message : undefined;
        errorType = "validate";
      }
    } else {
      let value = get(name, formValues);

      if (
        (typeof required === "boolean" ? required : required?.value) &&
        (!value || value.length === 0)
      ) {
        error = typeof required === "object" ? required.message : undefined;
        errorType = "required";
      }
    }

    error = errorType ? error || defaultErrors[errorType] : undefined;

    if (typeof error === "undefined") {
      if (typeof prevError !== "undefined") {
        unset(name, formErrors);
        updateState && setFormErrors({ ...formErrors });
      }
    } else if (prevError !== error) {
      set(name, error, formErrors);
      updateState && setFormErrors({ ...formErrors });
    }
  };

  const register: FormRegister = (name, options = {}, handler = {}) => {
    let {
      max,
      maxLength,
      min,
      minLength,
      pattern,
      required,
      valueAsDate,
      valueAsNumber,
      onInput,
    } = options;

    let {} = handler;

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

        let field = get(name, formFields);

        setFormField({
          name,
          options,
          ref: ref as HTMLInputElement,
          field,
        });
      },
      onBlur: (event: any) => {
        let ref = event.target as unknown as HTMLInputElement;
        validateField({ name, ref });
      },
      onInput: (event) => {
        let ref = event.target as unknown as HTMLInputElement;
        setFieldValue(name, ref);
        let { name: watchName, fn } = watcher;
        if (watchName && fn) {
          if (
            Array.isArray(watchName)
              ? watchName.includes(name)
              : watchName === name
          ) {
            let value = get(name, formValues);
            fn(name, event, value);
          }
        }
        // if (!isSubmitted.current) return;
        validateField({ name, ref });
        if (typeof onInput === "function") onInput(event);
      },
      ...formRules,
    };
  };

  const focusField = () => {
    let errorKeys = Object.keys(formErrors);

    if (errorKeys.length === 0) return;

    let fieldName: string | undefined;

    for (let field of Object.keys(formFields)) {
      if (errorKeys.includes(field)) {
        fieldName = field;
        break;
      }
    }

    if (!fieldName) return;

    let field = get(fieldName, formFields);

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

  const validateAllFields: FormValidateAllFields = () => {
    for (let name of formNames) {
      let field = get(name, formFields);

      if (!field) continue;

      if (Array.isArray(field.refs)) {
        for (let ref of field.refs) {
          validateField({ name, ref, updateState: false });
        }
      } else {
        validateField({ name, ref: field.ref, updateState: false });
      }
    }

    setFormErrors({ ...formErrors });

    return isEmptyObject(formErrors);
  };

  const handleSubmit: FormSubmit = (onValid, onInvalid) => {
    return (event: Event) => {
      event.preventDefault();
      if (!isSubmitted.current) {
        isSubmitted.current = true;
      }

      let isValid = validateAllFields();

      if (isValid && typeof onValid === "function") {
        onValid(formValues);
      } else if (typeof onInvalid === "function") {
        focusField();
        onInvalid(formErrors);
      }
    };
  };

  const watch: Watch = (name, fn) => {
    watcher.name = name;
    watcher.fn = fn;
  };

  const setError: SetError = (name, value) => {
    let error = get(name, formErrors);
    if (typeof error === "undefined") return;
    set(name, value, formErrors);
    setFormErrors({ ...formErrors });
  };

  const clearError: ClearError = (name) => {
    let error = get(name, formErrors);
    if (typeof error === "undefined") return;
    unset(name, formErrors);
    setFormErrors({ ...formErrors });
  };

  const setValue: SetValue = (name, value) => {
    let field = get(name, formFields);
    if (!field) return;
    set(name, value, formValues);
    validateField({ name, ref: field.ref });
    setFormValues({ ...formValues });
  };

  const getValue: GetValue = (name) => {
    let value = get(name, formValues);
    if (typeof value === "undefined") return;
    return value;
  };

  const resetFormField: ResetFormField = (name, field) => {
    if (isCheckBoxOrRadioInput(field.ref.type)) {
      if (Array.isArray(field.refs)) {
        for (let ref of field.refs) {
          ref.checked = false;
        }
        if (field.refs.length > 1) {
          set(name, [], formValues);
        } else {
          set(name, null, formValues);
        }
      }
    } else {
      if (isFileInput(field.ref.type)) {
        field.ref.files = null;
      } else {
        field.ref.value = "";
      }
      set(name, null, formValues);
    }
  };

  const reset: Reset = () => {
    for (let name of formNames) {
      let field = get(name, formFields);
      if (!field) continue;
      resetFormField(name, field);
    }

    isSubmitted.current = false;
    setFormErrors({} as T);
  };

  const resetField: ResetField = (name) => {
    let field = get(name, formFields);
    if (!field) return;
    resetFormField(name, field);
    clearError(name);
  };

  const validate: ValidateField = (name) => {
    let field = get(name, formFields);
    if (!field) return;
    validateField({ name, ref: field.ref, updateState: true });
  };

  const clearValue: ClearValue = (name) => {
    let field = get(name, formFields);
    if (!field) return;
    unset(name, formFields);
    unset(name, formErrors);
    unset(name, formValues);
    setFormValues({ ...formValues });
  };

  const unset: FormUnSet = (name: string, fields: any) => {
    if (typeof fields === "undefined") return;

    if (!name.includes(".")) {
      delete fields[name];
    } else {
      let value: any;
      let keys = name.split(".");
      let initialKey = keys.shift();
      let lastKey = keys.pop();

      if (initialKey) {
        value = fields[initialKey];
        if (typeof value === "undefined") return;
      }

      for (let key of keys) {
        if (typeof value[key] === "undefined") return;
        value = value[key];
      }

      if (!lastKey) return;

      if (Array.isArray(value)) {
        value.splice(parseInt(lastKey), 1);
      } else if (typeof value === "object") {
        delete value[lastKey];
      }
    }
  };

  return {
    watch,
    reset,
    register,
    setValue,
    getValue,
    validate,
    setError,
    clearError,
    resetField,
    handleSubmit,
    clearValue,
    formValues,
    formErrors,
  };
};

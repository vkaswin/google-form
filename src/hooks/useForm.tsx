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

type OnValid = (formValues: FormRecord) => void;
type OnInvalid = (errors: FormRecord) => void;

type FormValidate = (data: {
  name: string;
  ref: HTMLInputElement;
  render?: boolean;
}) => void;

type FormValueSetter = (name: string, ref: HTMLInputElement) => void;

type Field = {
  ref: HTMLInputElement;
  options: FormOptions;
  refs?: HTMLInputElement[];
};

type FormRecord = {
  [key in string]: any;
};

type FormFields = Record<string, Field>;

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

type Watcher = { name?: WatchData; fn?: WatchFunction };

type Watch = (name: WatchData, fn: WatchFunction) => void;

type SetError = (name: string, error: string) => void;

type ClearError = (name: string) => void;

type SetFormField = (data: {
  name: string;
  ref: HTMLInputElement;
  options: FormOptions;
}) => void;

type FormTypes = "fields" | "errors" | "values";

type FormSetter = (data: {
  name: string;
  value?: any;
  type: FormTypes;
  remove?: boolean;
  render?: boolean;
}) => void;

type FormGetter = <T extends FormTypes>(
  name: string,
  type: T
) => T extends "fields" ? Field | undefined : any;

type GetValue = (name: string) => FormValueType;

type SetValue = (name: string, value: FormValueType) => void;

type ResetField = (name: string) => void;

type ResetFormField = (
  name: string,
  field: Field,
  formValues: FormRecord
) => void;

type Revalidate = (name: string) => void;

type FormErrorTypes =
  | "required"
  | "minLength"
  | "maxLength"
  | "min"
  | "max"
  | "pattern"
  | "validate";

const isCheckBoxOrRadioInput = (type: string): boolean => {
  return type === "checkbox" || type === "radio";
};

const isFileInput = (type: string): boolean => {
  return type === "file";
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

const useForm = () => {
  let { current: formFields } = useRef<FormFields>({});
  let { current: formErrors } = useRef<FormRecord>({});
  let { current: formNames } = useRef<string[]>([]);
  let { current: formValues } = useRef<FormRecord>({});
  let [render, setRender] = useState(0);
  let watcher = useRef<Watcher>({});
  let isSubmitted = useRef<boolean>(false);

  const setFormField: SetFormField = ({ name, ref, options }) => {
    if (!formNames.includes(name)) {
      formNames.push(name);
    }

    let formField: any;

    if (isCheckBoxOrRadioInput(ref.type)) {
      let field = get(name, "fields");
      if (
        field &&
        field.ref &&
        Array.isArray(field.refs) &&
        !field.refs.includes(ref)
      ) {
        formField = { ...field, refs: [...field.refs, ref] };
      } else {
        formField = {
          ref: { name, type: ref.type },
          refs: [ref],
          options,
        };
      }
    } else {
      formField = {
        ref,
        options,
      };
    }

    if (typeof get(name, "fields") === "undefined") {
      let value: any;
      if (isCheckBoxOrRadioInput(ref.type)) {
        //TODO HANDLE DEFAULT VALUE
      } else {
        value = ref.defaultValue;
      }
      set({ name, value, type: "values" });
    }

    set({ name, value: formField, type: "fields" });
  };

  const set: FormSetter = ({
    name,
    value,
    type,
    remove = false,
    render = false,
  }) => {
    let data: FormRecord;

    switch (type) {
      case "fields":
        data = formFields;
        break;
      case "errors":
        data = formErrors;
        break;
      case "values":
        data = formValues;
        break;
      default:
        return;
    }

    if (name.includes(".")) {
      let keys = name.split(".");
      let key: string | number | undefined;
      name = keys[0];

      let obj: FormRecord = {
        [name]: isNaN(parseInt(keys[1]))
          ? { ...data[name] }
          : Array.isArray(data[name])
          ? data[name]
          : [],
      };
      let currentObj: FormRecord = obj[name];
      keys.shift();
      key = keys[0];

      while (keys.length > 1) {
        key = keys[0];
        key = isNaN(parseInt(key)) ? key : parseInt(key);
        if (typeof currentObj[key] === "undefined") {
          currentObj[key] = isNaN(parseInt(keys[1])) ? {} : [];
        }
        currentObj = currentObj[key];
        keys.shift();
        key = keys[0];
      }

      let keyName = isNaN(parseInt(key)) ? key : parseInt(key);
      if (remove && typeof currentObj[keyName] !== "undefined") {
        delete currentObj[keyName];
      } else {
        currentObj[keyName] = value;
      }
      data[name] = obj[name];
    } else {
      data[name] = value;
    }

    if (render) triggerReRender();
  };

  const get: FormGetter = (name, type) => {
    let data: FormRecord;
    switch (type) {
      case "fields":
        data = formFields;
        break;
      case "errors":
        data = formErrors;
        break;
      case "values":
        data = formValues;
        break;

      default:
        return;
    }
    if (name.includes(".")) {
      let value: any;
      let keys = name.split(".");
      let key = keys.shift();

      if (key) {
        value = data[key];
        if (typeof value === "undefined") return;
      }

      for (let key of keys) {
        if (typeof value[key] === "undefined") return;
        value = value[key];
      }

      return value;
    } else {
      return data[name];
    }
  };

  const setFieldValue: FormValueSetter = (name, ref) => {
    let field = get(name, "fields");
    let value = get(name, "values");

    if (isCheckBoxOrRadioInput(ref.type)) {
      if (field && Array.isArray(field.refs) && field.refs.length > 1) {
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

    set({ name, value, type: "values" });
  };

  const validateField: FormValidate = ({ name, ref, render = true }) => {
    let prevError = get(name, "errors");

    if (!ref) return;

    let field = get(name, "fields");

    if (!field) return;

    let { validate, max, min, pattern, required, maxLength, minLength } =
      field.options || {};

    let error: string | undefined;
    let errorType: FormErrorTypes | undefined;

    if (isCheckBoxOrRadioInput(ref.type)) {
      let value = get(name, "values");

      if (typeof value === "undefined") return;

      if (
        (typeof required === "boolean" ? required : required?.value) &&
        value.length === 0
      ) {
        error = typeof required === "object" ? required.message : undefined;
        errorType = "required";
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
    } else {
      let validateFn =
        typeof validate === "function" ? validate : validate?.value;
      if (typeof validateFn === "function") {
        let value = get(name, "values");
        if (validateFn(value)) {
          error = typeof validate === "object" ? validate.message : undefined;
          errorType = "validate";
        }
      }
    }

    error = errorType ? error || defaultErrors[errorType] : undefined;

    if (typeof error === "undefined") {
      if (typeof prevError !== "undefined") {
        set({ name, type: "errors", remove: true, render });
      }
    } else if (prevError !== error) {
      set({
        name,
        value: error,
        type: "errors",
        render,
      });
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
            let value = get(name, "values");
            fn(name, event, value);
          }
        }

        if (!isSubmitted.current) return;

        validateField({ name, ref });
      },
      ...formRules,
    };
  };

  const focusField = (errors: FormRecord) => {
    let errorKeys = Object.keys(errors);

    if (errorKeys.length === 0) return;

    let fieldName: string | undefined;

    for (let field of Object.keys(formFields)) {
      if (errorKeys.includes(field)) {
        fieldName = field;
        break;
      }
    }

    if (!fieldName) return;

    let field = get(fieldName, "fields");

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
    for (let name of formNames) {
      let field = get(name, "fields");
      if (typeof field === "undefined") continue;
      validateField({ name, ref: field.ref, render: false });
    }

    // TODO ERROR HANDLING

    // let hasError = Object.keys(formErrors).length !== 0;

    // if (hasError) {
    //     focusField();
    //   if (typeof onInvalid === "function") onInvalid(formErrors);
    // } else {
    //   if (typeof onValid === "function") onValid(formValues);
    // }

    triggerReRender();
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

  const setError: SetError = (name, value) => {
    set({ name, value, type: "errors", render: true });
  };

  const clearError: ClearError = (name) => {
    if (typeof get(name, "errors") === "undefined") return;
    set({ name, type: "errors", remove: true, render: true });
  };

  const setValue: SetValue = (name, value) => {
    set({ name, value, type: "values" });
  };

  const getValue: GetValue = (name) => {
    let value = get(name, "values");
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
    for (let name in formFields) {
      let field = get(name, "fields");
      if (!field) continue;
      resetFormField(name, field, formValues);
    }

    isSubmitted.current = false;
    formErrors = {};
    triggerReRender();
  };

  const resetField: ResetField = (name) => {
    let field = get(name, "fields");
    if (!field) return;
    resetFormField(name, field, formValues);
    clearError(name);
  };

  const reValidate: Revalidate = (name) => {
    let field = get(name, "fields");
    if (!field) return;
    validateField({ name, ref: field.ref, render: true });
  };

  const triggerReRender = () => {
    setRender(render + 1);
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
    reValidate,
    handleSubmit,
    formErrors,
  };
};

export default useForm;

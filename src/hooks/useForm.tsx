import { useRef } from "react";
import { FormRules } from "types/Form";

export type FormHook = {
  register: (
    name?: string | undefined,
    rules?: FormRules
  ) => {
    ref: (element: HTMLElement | undefined) => void;
  };
};

export const useForm = (): FormHook => {
  const register: FormHook["register"] = (
    name,
    { maxLength, minLength, pattern, required, validate } = {}
  ) => {
    console.log({
      name,
      rules: { maxLength, minLength, pattern, required, validate },
    });
    return {
      ref: (element) => {
        console.log(element);
      },
    };
  };

  return {
    register,
  };
};

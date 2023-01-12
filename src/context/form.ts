import { createContext, useContext } from "react";
import { FormContext as FormContextType } from "types/Form";

export const FormContext = createContext({} as FormContextType);

export const useFormContext = () => {
  return useContext(FormContext);
};

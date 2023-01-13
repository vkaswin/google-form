import { createContext, ReactNode, useContext } from "react";
import { UseForm } from "types/UseForm";

const FormContext = createContext({} as UseForm);

type FormProviderType = {
  children: ReactNode;
} & UseForm;

export const useFormContext = () => {
  return useContext(FormContext);
};

export const FormProvider = ({ children, ...form }: FormProviderType) => {
  return <FormContext.Provider value={form}>{children}</FormContext.Provider>;
};

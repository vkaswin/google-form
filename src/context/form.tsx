import { createContext, ReactNode, useContext } from "react";
import { FormDetail } from "types/Form";
import { UseForm } from "types/UseForm";

const FormContext = createContext({} as UseForm<FormDetail>);

type FormProviderType = {
  children: ReactNode;
} & UseForm<FormDetail>;

export const useFormContext = () => {
  return useContext(FormContext);
};

export const FormProvider = ({ children, ...form }: FormProviderType) => {
  return <FormContext.Provider value={form}>{children}</FormContext.Provider>;
};

import { ChangeEvent } from "react";
import { TextEditor, Box } from "components";

export type FormHeaderProps = {
  disable?: boolean;
};

export const FormHeader = ({ disable = false }: FormHeaderProps) => {
  const handleChange = (event: ChangeEvent<HTMLDivElement>) => {
    console.log(event);
  };

  return (
    <Box isHeader={true} isSelected={true}>
      <TextEditor as="h1" placeholder="Form Title" onInput={handleChange} />
      <TextEditor
        as="div"
        placeholder="Form Description"
        onInput={handleChange}
      />
    </Box>
  );
};

import { ChangeEvent } from "react";
import { TextEditor, Box } from "components";

export type FormHeaderProps = {
  selectedId: string | null;
  handleClickForm: (id: string) => void;
};

let headerId: string = crypto.randomUUID();

export const FormHeader = ({
  selectedId,
  handleClickForm,
}: FormHeaderProps) => {
  const handleChange = (event: ChangeEvent<HTMLDivElement>) => {
    console.log(event);
  };

  return (
    <Box
      isHeader={true}
      isSelected={selectedId === headerId}
      onClick={() => handleClickForm(headerId)}
    >
      <TextEditor as="h1" placeholder="Form title" onInput={handleChange} />
      <TextEditor placeholder="Form description" onInput={handleChange} />
    </Box>
  );
};

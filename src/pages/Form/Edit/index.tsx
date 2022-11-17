import { useParams } from "react-router-dom";
import { FormParams } from "types/form";

const EditForm = () => {
  const { formId } = useParams<FormParams>();
  return (
    <div>
      <h2>EditForm</h2>
    </div>
  );
};

export default EditForm;

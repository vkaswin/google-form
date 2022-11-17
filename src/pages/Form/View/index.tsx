import { useParams } from "react-router-dom";
import { FormParams } from "types/form";

const ViewForm = () => {
  const { formId } = useParams<FormParams>();
  return (
    <div>
      <h2>ViewForm</h2>
    </div>
  );
};

export default ViewForm;

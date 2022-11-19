import { useOutletContext } from "react-router-dom";
import { FormDetail } from "types/Form";

const ViewForm = () => {
  const { theme } = useOutletContext<FormDetail>();
  return (
    <div>
      <h2>ViewForm</h2>
    </div>
  );
};

export default ViewForm;

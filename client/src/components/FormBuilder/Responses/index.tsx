import { useEffect, useState } from "react";
import { getFormResponsesById } from "services/Form";
import { FormResponses } from "types/Form";

import styles from "./Responses.module.scss";

type ResponsesProps = {
  formId?: string;
};

const Responses = ({ formId }: ResponsesProps) => {
  let [formDetail, setFormDetail] = useState<FormResponses>();

  useEffect(() => {
    if (!formId) return;
    getFormResponse();
  }, [formId]);

  const getFormResponse = async () => {
    if (!formId) return;

    try {
      let { data } = await getFormResponsesById(formId);
      setFormDetail(data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!formDetail) return null;

  let { formResponses, fields } = formDetail;
  console.log(formResponses);
  return (
    <div className={styles.container}>
      <table>
        <thead>
          <tr>
            <td>S.No</td>
            <td>Name</td>
            <td>Email</td>
            {fields.map(({ title, _id }) => {
              return <td key={_id}>{title}</td>;
            })}
          </tr>
        </thead>
        <tbody>
          {formResponses.map(({ responses, user }, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                {responses.map(({ response }, ind) => {
                  return (
                    <td key={ind}>
                      {response
                        ? Array.isArray(response)
                          ? response.join(", ")
                          : response
                        : "-"}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Responses;

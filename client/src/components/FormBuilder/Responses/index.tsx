import moment from "moment-timezone";
import { useEffect, useState } from "react";
import { getFormResponsesById } from "services/Form";
import { FormResponses } from "types/Form";

import styles from "./Responses.module.scss";

type ResponsesProps = {
  formId?: string;
};

const Responses = ({ formId }: ResponsesProps) => {
  let [formDetail, setFormDetail] = useState<FormResponses>();
  let [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!formId) return;
    getFormResponse();
  }, [formId]);

  const getFormResponse = async () => {
    if (!formId) return;

    try {
      let { data } = await getFormResponsesById(formId);
      setFormDetail(data);
    } finally {
      if (isLoading) setIsLoading(false);
    }
  };

  if (!formDetail) return null;

  let { formResponses, fields } = formDetail;

  return (
    <div className={styles.container}>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <table>
          <thead>
            <tr>
              <td>Timestamp</td>
              <td>Responsed by</td>
              {fields.map(({ title, _id }) => {
                return (
                  <td
                    key={_id}
                    dangerouslySetInnerHTML={{ __html: title }}
                  ></td>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {formResponses.length === 0 ? (
              <tr style={{ height: "85px" }}>
                <td colSpan={fields.length + 2} align="center">
                  No Records Found
                </td>
              </tr>
            ) : (
              formResponses.map(({ responses, user, createdAt }, index) => {
                return (
                  <tr key={index}>
                    <td>
                      {moment
                        .tz(createdAt, "Asia/Kolkata")
                        .format("M/D/YYYY h:mm:ss a")}
                    </td>
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
              })
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Responses;

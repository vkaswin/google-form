import { useEffect } from "react";

import styles from "./Responses.module.scss";

const Responses = () => {
  useEffect(() => {
    getFormResponse();
  }, []);

  const getFormResponse = () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.container}>
      <table>
        <thead>
          <tr>
            <td>Title</td>
            <td>Question</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Loruem Ispum</td>
            <td>Loreum Ispum</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Responses;

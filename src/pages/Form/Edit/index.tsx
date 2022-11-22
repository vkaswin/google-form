import { Fragment } from "react";
import { TextEditor, DropDown, Box } from "components";
import { useOutletContext } from "react-router-dom";
import { FormDetail } from "types/Form";

import styles from "./Edit.module.scss";

const EditForm = () => {
  const { theme, fields } = useOutletContext<FormDetail>();

  return (
    <Fragment>
      {fields.map(
        ({ label, value, options, description, type, validation }, index) => {
          return (
            <Box key={index} className={styles.card}>
              <div className={styles.wrapper}>
                <TextEditor as="div" placeholder="Question" />
                <DropDown />
              </div>
              <div className={styles.short_para}></div>
              <div className={styles.long_para}></div>
              <div className={styles.date}></div>
              <div className={styles.options}></div>
            </Box>
          );
        }
      )}
    </Fragment>
  );
};

export default EditForm;

import Form from "components/Form";
import { Fragment } from "react";

import styles from "./Edit.module.scss";

const EditForm = () => {
  return (
    <Fragment>
      <Form>
        <div className={styles.header}>
          <div className={styles.title}>
            <span>Google Form</span>
          </div>
        </div>
      </Form>
    </Fragment>
  );
};

export default EditForm;

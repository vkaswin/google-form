import { useState } from "react";

import styles from "./FormList.module.scss";

const FormList = () => {
  const [forms, setForms] = useState([]);

  return (
    <div className={styles.container}>
      <h1>FormList</h1>
    </div>
  );
};

export default FormList;

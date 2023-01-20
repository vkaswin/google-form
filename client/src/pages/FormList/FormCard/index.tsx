import { useMemo } from "react";
import { FormData } from "types/Form";
import { baseURL } from "services/config";
import { googleFormIcon } from "helpers";

import styles from "./FormCard.module.scss";

type FormCardProps = {
  onClick: (formId: string) => void;
} & FormData;

const FormCard = ({ _id, title, onClick }: FormCardProps) => {
  const url = useMemo(() => {
    return `${baseURL}/form/${_id}.png`;
  }, [_id]);

  return (
    <div className={styles.container} onClick={() => onClick(_id)}>
      <img src={url} />
      <div className={styles.wrapper}>
        <div className={styles.title}>
          <span>{title}</span>
        </div>
        <div className={styles.info}>
          {googleFormIcon}
          <div className={styles.time}>
            <span>Opened 12:02 PM</span>
            <i className="bx-dots-vertical-rounded"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormCard;

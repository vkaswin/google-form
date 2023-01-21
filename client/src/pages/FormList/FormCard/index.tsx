import { useMemo, Fragment } from "react";
import { FormData } from "types/Form";
import { baseURL } from "services/config";
import { googleFormIcon } from "utils";
import moment from "moment-timezone";
import DropDown from "components/DropDown";

import styles from "./FormCard.module.scss";

type FormCardProps = {
  handleOpenForm: (formId: string) => void;
  handleDeleteForm: (formId: string) => void;
} & FormData;

const FormCard = ({
  _id,
  title,
  updatedAt,
  createdAt,
  handleDeleteForm,
  handleOpenForm,
}: FormCardProps) => {
  const url = useMemo(() => {
    return `${baseURL}/form/${_id}.png`;
  }, [_id]);

  return (
    <Fragment>
      <div className={styles.container} onClick={() => handleOpenForm(_id)}>
        <img src={url} />
        <div className={styles.wrapper}>
          <div className={styles.title}>
            <span>{title}</span>
          </div>
          <div className={styles.info}>
            {googleFormIcon}
            <div className={styles.time}>
              <span>
                Last updated at &nbsp;
                {moment.tz(updatedAt, "Asia/Kolkata").fromNow()}
              </span>
              <i
                id={`dropdown-${_id}`}
                className="bx-dots-vertical-rounded"
                onClick={(e) => e.stopPropagation()}
              ></i>
            </div>
          </div>
        </div>
      </div>
      <DropDown
        selector={`#dropdown-${_id}`}
        placement="bottom"
        className={styles.dropdown}
      >
        <DropDown.Item onClick={() => handleDeleteForm(_id)}>
          <i className="bx-trash"></i>
          <span>Remove</span>
        </DropDown.Item>
        <DropDown.Item onClick={() => handleOpenForm(_id)}>
          <i className="bx-link-external"></i>
          <span>Open in new tab</span>
        </DropDown.Item>
      </DropDown>
    </Fragment>
  );
};

export default FormCard;

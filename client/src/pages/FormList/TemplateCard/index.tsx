import { useMemo } from "react";
import { FormData } from "types/Form";
import { baseURL } from "services/config";

import styles from "./TemplateCard.module.scss";

type TemplateCardProps = {
  onClick: (templateId: string) => void;
} & FormData;

const TemplateCard = ({ _id, title, onClick }: TemplateCardProps) => {
  const url = useMemo(() => {
    return `${baseURL}/template/${_id}.png`;
  }, [_id]);

  return (
    <div className={styles.container}>
      <img src={url} onClick={() => onClick(_id)} />
      <span>{title}</span>
    </div>
  );
};

export default TemplateCard;

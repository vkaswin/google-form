import addIcon from "assets/images/add-icon.png";

import styles from "./TemplateCard.module.scss";

type AddTemplateProps = {
  onClick: () => void;
};

const AddTemplate = ({ onClick }: AddTemplateProps) => {
  return (
    <div className={styles.container} onClick={onClick}>
      <img src={addIcon} />
      <span>Blank</span>
    </div>
  );
};

export default AddTemplate;

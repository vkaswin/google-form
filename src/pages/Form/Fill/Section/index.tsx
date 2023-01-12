import styles from "./Section.module.scss";

export type FormSectionProps = {
  title: string;
  description: string;
};

const Section = ({ title, description }: FormSectionProps) => {
  return (
    <div className={styles.wrapper}>
      <div
        className={styles.header}
        dangerouslySetInnerHTML={{ __html: title }}
      ></div>
      <div
        className={styles.footer}
        dangerouslySetInnerHTML={{ __html: description }}
      ></div>
    </div>
  );
};

export default Section;

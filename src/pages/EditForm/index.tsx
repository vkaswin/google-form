import { Fragment, useState } from "react";
import { FormPages } from "types/Form";
import FormBuilder from "components/FormBuilder";
import Themes from "./Themes";
import Responses from "./Responses";

import styles from "./EditForm.module.scss";

const googleFormIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
    <rect x="-4" y="-4" fill="none" width="48" height="48"></rect>
    <g>
      <polygon
        fill="#56368A"
        points="24.5,10 30,11 34.5,10 24.5,0 23.2,4.7"
      ></polygon>
      <path
        fill="#7248B9"
        d="M24.5,10V0H8.2C6.7,0,5.5,1.2,5.5,2.7v34.5c0,1.5,1.2,2.7,2.7,2.7h23.6c1.5,0,2.7-1.2,2.7-2.7V10H24.5z"
      ></path>
      <path
        fill="#FFFFFF"
        d="M13.2,28.9c-0.8,0-1.4-0.6-1.4-1.4c0-0.8,0.6-1.4,1.4-1.4c0.8,0,1.4,0.6,1.4,1.4 C14.5,28.2,13.9,28.9,13.2,28.9z M13.2,23.4c-0.8,0-1.4-0.6-1.4-1.4s0.6-1.4,1.4-1.4c0.8,0,1.4,0.6,1.4,1.4S13.9,23.4,13.2,23.4z M13.2,17.9c-0.8,0-1.4-0.6-1.4-1.4c0-0.8,0.6-1.4,1.4-1.4c0.8,0,1.4,0.6,1.4,1.4C14.5,17.3,13.9,17.9,13.2,17.9z M28.2,28.6H16.8 v-2.3h11.4V28.6z M28.2,23.2H16.8v-2.3h11.4V23.2z M28.2,17.7H16.8v-2.3h11.4V17.7z"
      ></path>
    </g>
  </svg>
);

const EditForm = () => {
  let [activeTab, setActiveTab] = useState(0);

  const tabs = ["Questions", "Responses"];

  return (
    <Fragment>
      <div className={styles.header}>
        <div className={styles.header_top}>
          <div className={styles.form_title}>
            {googleFormIcon}
            <input name="title" defaultValue="Google Form" />
          </div>
          <div className={styles.header_icon}>
            <Themes
            //   colorCode={colorCode}
            //   bgCode={bgCode}
            //   onChange={handleTheme}
            />
            <i className="bx-show"></i>
            <div className={styles.avatar}>
              <span>AK</span>
            </div>
          </div>
        </div>
        <ul className={styles.header_bottom}>
          {tabs.map((label, index) => {
            let isActive = activeTab === index;
            return (
              <li
                key={index}
                className={`${styles.tab} ${
                  isActive ? styles.active : ""
                }`.trim()}
                onClick={() => setActiveTab(index)}
              >
                {label}
                {isActive && <div className={styles.indicator}></div>}
              </li>
            );
          })}
        </ul>
      </div>
      {activeTab === 0 && <FormBuilder isEdit />}
      {activeTab === 1 && <Responses />}
    </Fragment>
  );
};

export default EditForm;

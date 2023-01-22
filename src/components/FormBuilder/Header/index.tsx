import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { ColorCodes } from "types/Form";
import Themes from "./Themes";
import { debounce, googleFormIcon } from "utils";

import styles from "./Header.module.scss";

type HeaderProps = {
  activeTab: number;
  colorCode: ColorCodes;
  bgCode: string;
  title: string;
  handleTheme: (data: { colorCode: ColorCodes; bgCode: string }) => void;
  handleTitle: (title: string) => void;
  setActiveTab: Dispatch<SetStateAction<number>>;
};

const Header = ({
  activeTab,
  colorCode,
  bgCode,
  title,
  handleTheme,
  handleTitle,
  setActiveTab,
}: HeaderProps) => {
  const tabs = ["Questions", "Responses"];

  const [hide, setHide] = useState(true);

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (hide) return;
    if (!inputRef.current) return;
    inputRef.current.focus();
  }, [hide]);

  const toggleTitle = () => {
    setHide(!hide);
  };

  const handleChange = debounce((e: ChangeEvent<HTMLInputElement>) => {
    handleTitle(e.target.value);
  }, 500);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.title}>
          {googleFormIcon}
          <input
            ref={inputRef}
            name="title"
            defaultValue={title || "Google Form"}
            onChange={handleChange}
            onBlur={toggleTitle}
            hidden={hide}
          />
          {hide && <h1 onClick={toggleTitle}>{title}</h1>}
        </div>
        <div className={styles.icon}>
          <Themes
            colorCode={colorCode}
            bgCode={bgCode}
            onChange={handleTheme}
          />
          <i className="bx-show"></i>
          <div className={styles.avatar}>
            <span>AK</span>
          </div>
        </div>
      </div>
      <ul className={styles.bottom}>
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
  );
};

export default Header;

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { ColorCodes } from "types/Form";
import { User } from "types/Auth";
import Themes from "./Themes";
import { debounce, googleFormIcon } from "utils";
import Avatar from "components/Avatar";
import { NavigateFunction } from "react-router-dom";

import styles from "./Header.module.scss";
import { toast } from "react-toastify";

type HeaderProps = {
  formId?: string;
  params: URLSearchParams;
  colorCode: ColorCodes;
  bgCode: string;
  title: string;
  user: User | null;
  logout: () => void;
  navigate: NavigateFunction;
  handleTheme: (data: { colorCode: ColorCodes; bgCode: string }) => void;
  handleTitle: (title: string) => void;
};

const Header = ({
  formId,
  params,
  colorCode,
  bgCode,
  title,
  user,
  navigate,
  logout,
  handleTheme,
  handleTitle,
}: HeaderProps) => {
  const tabs = ["Questions", "Responses"] as const;

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

  const handleChange = debounce(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      if (value.length === 0)
        return toast("Title should not be empty", { type: "error" });
      handleTitle(value);
    },
    500
  );

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
          <i
            className="bx-show"
            onClick={() => window.open(`#/form/${formId}/preview`)}
          ></i>
          <Avatar userName={user?.name} logout={logout} />
        </div>
      </div>
      <ul className={styles.bottom}>
        {tabs.map((label, index) => {
          let isActive =
            (params.get("tab") || "questions") === label.toLocaleLowerCase();
          return (
            <li
              key={index}
              className={`${styles.tab} ${
                isActive ? styles.active : ""
              }`.trim()}
              onClick={() =>
                navigate({
                  search: label === "Responses" ? `?tab=responses` : "",
                })
              }
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

import { ChangeEvent } from "react";
import { User } from "types/Auth";
import { useNavigate } from "react-router-dom";
import { debounce, googleFormIcon } from "utils";
import Avatar from "components/Avatar";

import styles from "./Header.module.scss";

type HeaderProps = {
  search: string | null;
  user: User | null;
  logout: () => void;
};

const Header = ({ search, user, logout }: HeaderProps) => {
  const navigate = useNavigate();

  const handleChange = debounce<ChangeEvent<HTMLInputElement>>(
    ({ target: { value } }) => {
      navigate({ search: value ? `?search=${value}` : "" });
    },
    500
  );

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        {googleFormIcon}
        <span>Google Form</span>
      </div>
      <div className={styles.search_box}>
        <input
          placeholder="Search by title"
          defaultValue={search || ""}
          onChange={handleChange}
        />
        <i className="bx-search"></i>
      </div>
      <div className={styles.avatar}>
        <Avatar userName={user?.name} logout={logout} />
      </div>
    </div>
  );
};

export default Header;

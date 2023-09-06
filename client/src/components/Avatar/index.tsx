import { Fragment, useMemo } from "react";
import DropDown from "components/DropDown";

import styles from "./Avatar.module.scss";

type AvatarProps = {
  userName?: string;
  logout: () => void;
};

const Avatar = ({ userName, logout }: AvatarProps) => {
  const initial = useMemo(() => {
    if (!userName) return;
    let [firstName, lastName = ""] = userName.split(" ");
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.trim();
  }, [userName]);

  return (
    <Fragment>
      <div id="user-dropdown" className={styles.avatar}>
        <span>{initial}</span>
      </div>
      <DropDown
        selector="#user-dropdown"
        placement="bottom-end"
        className={styles.dropdown}
      >
        <DropDown.Item onClick={logout}>
          <i className="bx-log-out"></i>
          <span>Logout</span>
        </DropDown.Item>
      </DropDown>
    </Fragment>
  );
};

export default Avatar;

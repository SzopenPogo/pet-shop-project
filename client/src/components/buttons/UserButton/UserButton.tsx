import classes from "./UserButton.module.scss";
import userIcon from '../../../images/icon/user.svg';
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import UserMenu from "../../menu/UserMenu/UserMenu";

interface IProps {
  size: string;
}

const UserButton = ({ size }: IProps) => {
  const isMobile = useSelector((state: RootState) => state.clientWindow.isWindowMobile);
  const [isUserMenu, setIsUserMenu] = useState<boolean>(false);

  return (
    <button
      type='button'
      onMouseEnter={() => setIsUserMenu(true)}
      onMouseLeave={() => setIsUserMenu(false)}
      className={classes['user-button']}
      style={{
        width: `${size}`,
        height: `${size}`,
        backgroundImage: `url(${userIcon})`
      }}
    >
      {isUserMenu && !isMobile && <UserMenu />}
    </button>
  )
}

export default UserButton
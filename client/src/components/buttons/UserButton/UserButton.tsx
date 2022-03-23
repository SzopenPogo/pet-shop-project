import classes from "./UserButton.module.scss";
import userIcon from '../../../images/icon/user.svg';
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import UserMenu from "../../menu/UserMenu/UserMenu";
import { useNavigate } from "react-router";
import { LOGIN_ROUTE } from "../../../constants/routes";

interface IProps {
  size: string;
}

const UserButton = ({ size }: IProps) => {
  const navigate = useNavigate();
  const isMobile = useSelector((state: RootState) => state.clientWindow.isWindowMobile);
  const [isUserMenu, setIsUserMenu] = useState<boolean>(false);

  const clickHandler = () => {
    if (isMobile) {
      navigate(LOGIN_ROUTE);
    }
  }

  return (
    <button
      type='button'
      onMouseEnter={() => setIsUserMenu(true)}
      onMouseLeave={() => setIsUserMenu(false)}
      onClick={clickHandler}
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
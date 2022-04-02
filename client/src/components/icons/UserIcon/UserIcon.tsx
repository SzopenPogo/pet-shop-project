import classes from "./UserIcon.module.scss";
import userIcon from '../../../images/icon/user.svg';
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import UserMenu from "../../menu/UserMenu/UserMenu";
import { useNavigate } from "react-router";
import { LOGIN_ROUTE, PROFILE_ROUTE } from "../../../constants/routes";

interface IProps {
  size: string;
}

const UserIcon = ({ size }: IProps) => {
  const navigate = useNavigate();
  const isMobile = useSelector((state: RootState) => state.clientWindow.isWindowMobile);
  const [isUserMenu, setIsUserMenu] = useState<boolean>(false);

  const { data } = useSelector((state: RootState) => state.user);

  const clickHandler = () => {
    if (isMobile) {
      if (!data._id) {
        return navigate(LOGIN_ROUTE);
      }
      navigate(`${PROFILE_ROUTE}/${data._id}`);
    }
  }

  return (
    <span
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
    </span>
  )
}

export default UserIcon
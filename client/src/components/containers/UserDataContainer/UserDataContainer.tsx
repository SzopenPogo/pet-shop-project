import { useDispatch, useSelector } from 'react-redux';
import { IUserData } from '../../../interfaces/IUserData';
import { RootState } from '../../../store';
import { userLogout } from '../../../store/user/actions/user-logout-action';
import SecondaryButton from '../../buttons/SecondaryButton/SecondaryButton';
import AvatarElement from '../../elements/AvatarElement/AvatarElement';
import classes from './UserDataContainer.module.scss';

interface IProps {
  data: IUserData;
  token: string;
}

const UserDataContainer = ({ data, token }: IProps) => {
  const dispatch = useDispatch();

  const isMobile = useSelector((state: RootState) => state.clientWindow.isWindowMobile);

  const logoutHandler = () => {
    dispatch(userLogout(token))
  }

  return (
    <section className={classes.data}>
      <AvatarElement avatarUrl={data.avatarUrl} />
      <div>
        <h1>{data.email}</h1>
        {isMobile && <SecondaryButton isSubmit={true} title='Logout' onClick={logoutHandler} />}
      </div>
    </section>
  )
}

export default UserDataContainer
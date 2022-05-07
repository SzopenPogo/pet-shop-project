import classes from './UserLogoutAllContainer.module.scss';
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store';
import { userLogoutAll } from '../../../store/user/actions/user-logout-all-action';
import MainButton from '../../buttons/MainButton/MainButton'

const UserLogoutAllContainer = () => {
  const dispatch = useDispatch();

  const token = useSelector((state: RootState) => state.user.token);

  const logoutAllHandler = () => {
    dispatch(userLogoutAll(token));
  }

  return (
    <div className={classes['logout-all-container']}>
      <span>Logout from all dvices</span>
      <MainButton isSubmit={false} title='Logout all' onClick={logoutAllHandler} />
    </div>
  )
}

export default UserLogoutAllContainer
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import AuthorizedMenuElement from '../../elements/AuthorizedMenuElement/AuthorizedMenuElement';
import UnauthorizedMenuElement from '../../elements/UnauthorizedMenuElenemts/UnauthorizedMenuElements';
import classes from './UserMenu.module.scss';

const UserMenu = () => {
  const { data, token } = useSelector((state: RootState) => state.user);

  return (
    <div className={classes['user-menu']}>
      {!data._id 
      ? <UnauthorizedMenuElement />
      : <AuthorizedMenuElement _id={data._id} token={token} />
      }
    </div>
  )
}

export default UserMenu
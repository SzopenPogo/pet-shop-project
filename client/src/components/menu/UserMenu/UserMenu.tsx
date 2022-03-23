import { LOGIN_ROUTE, REGISTER_ROUTE } from '../../../constants/routes';
import MainLink from '../../links/MainLink/MainLink';
import SecondaryLink from '../../links/SecondaryLink/SecondaryLink';
import classes from './UserMenu.module.scss';

const UserMenu = () => {
  return (
    <div className={classes['user-menu']}>
      <MainLink title='Sign in' route={LOGIN_ROUTE} />
      <SecondaryLink title='Register' route={REGISTER_ROUTE} />
    </div>
  )
}

export default UserMenu
import MainLink from '../../links/MainLink/MainLink';
import SecondaryLink from '../../links/SecondaryLink/SecondaryLink';
import classes from './UserMenu.module.scss';

const UserMenu = () => {
  return (
    <div className={classes['user-menu']}>
      <MainLink title='Sign in' route='/login' />
      <SecondaryLink title='Register' route='register' />
    </div>
  )
}

export default UserMenu
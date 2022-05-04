import { useSelector } from 'react-redux';
import UserDataContainer from '../../../components/containers/UserDataContainer/UserDataContainer';
import UserLayout from '../../../components/layout/UserLayout/UserLayout';
import ProfileLink from '../../../components/links/ProfileLink/ProfileLink';
import { PROFILE_EDIT_ADDRESS_ROUTE, PROFILE_EDIT_DATA_ROUTE } from '../../../constants/routes';
import { RootState } from '../../../store';
import classes from './UserProfilePage.module.scss';

const UserProfilePage = () => {

  const userData = useSelector((state: RootState) => state.user);
  const { token, data } = userData;
  
  return (
    <UserLayout>
      <>
        <UserDataContainer data={data} token={token} />
        <section className={classes['profile-page-options']}>
          <ProfileLink link={`${PROFILE_EDIT_ADDRESS_ROUTE}`} title='Address' />
          <ProfileLink link={`${PROFILE_EDIT_DATA_ROUTE}`} title='User Data' />
        </section>
      </>
    </UserLayout>
  )
}

export default UserProfilePage
import { useSelector } from 'react-redux';
import UserDataContainer from '../../../components/containers/UserDataContainer/UserDataContainer';
import UserLayout from '../../../components/layout/UserLayout/UserLayout';
import ProfileAdminLink from '../../../components/links/ProfileAdminLink/ProfileAdminLink';
import ProfileLink from '../../../components/links/ProfileLink/ProfileLink';
import { PROFILE_ADMIN_EDIT_CATEGORY_ROUTE, PROFILE_ADMIN_EDIT_PRODUCT_ROUTE, PROFILE_ADMIN_EDIT_SLIDER_ROUTE, PROFILE_ADMIN_EDIT_SUBCATEGORY_ROUTE, PROFILE_ADMIN_EDIT_USERS_ROUTE, PROFILE_EDIT_ADDRESS_ROUTE, PROFILE_EDIT_DATA_ROUTE } from '../../../constants/routes';
import { RootState } from '../../../store';
import classes from './UserProfilePage.module.scss';

const UserProfilePage = () => {

  const userData = useSelector((state: RootState) => state.user);
  const { token, data } = userData;
  const { isAdmin } = data;
  
  return (
    <UserLayout>
      <>
        <UserDataContainer data={data} token={token} />
        <section className={classes['profile-page-options']}>
          <ProfileLink link={PROFILE_EDIT_ADDRESS_ROUTE} title='Address' />
          <ProfileLink link={PROFILE_EDIT_DATA_ROUTE} title='User Data' />

          <ProfileAdminLink link={PROFILE_ADMIN_EDIT_USERS_ROUTE} title='Users' isAdmin={isAdmin} />
          <ProfileAdminLink link={PROFILE_ADMIN_EDIT_CATEGORY_ROUTE} title='Category' isAdmin={isAdmin} />
          <ProfileAdminLink link={PROFILE_ADMIN_EDIT_SUBCATEGORY_ROUTE} title='Subcategory' isAdmin={isAdmin} />
          <ProfileAdminLink link={PROFILE_ADMIN_EDIT_PRODUCT_ROUTE} title='Product' isAdmin={isAdmin} />
          <ProfileAdminLink link={PROFILE_ADMIN_EDIT_SLIDER_ROUTE} title='Slider' isAdmin={isAdmin} />
        </section>
      </>
    </UserLayout>
  )
}

export default UserProfilePage
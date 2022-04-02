import { useSelector } from 'react-redux';
import UserDataContainer from '../../../components/containers/UserDataContainer/UserDataContainer';
import UserLayout from '../../../components/layout/UserLayout/UserLayout';
import ProfileLink from '../../../components/links/ProfileLink/ProfileLink';
import { PROFILE_EDIT_ADDRESS_ROUTE } from '../../../constants/routes';
import { RootState } from '../../../store';

const UserProfilePage = () => {

  const userData = useSelector((state: RootState) => state.user);
  const { token, data } = userData;
  
  return (
    <UserLayout>
      <>
        <UserDataContainer data={data} token={token} />
        <ProfileLink link={`${PROFILE_EDIT_ADDRESS_ROUTE}/${data._id}`} title='Address' />
      </>
    </UserLayout>
  )
}

export default UserProfilePage
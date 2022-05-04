import UserDataEditForm from '../../../components/forms/UserDataEditForm/UserDataEditForm';
import UserLayout from '../../../components/layout/UserLayout/UserLayout';
import InfoModal from '../../../components/modals/InfoModal/InfoModal';

const UserEditDataPage = () => {
  return (
    <UserLayout>
      <>
        <InfoModal />
        <UserDataEditForm />
      </>
    </UserLayout>
  )
}

export default UserEditDataPage
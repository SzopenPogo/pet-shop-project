import UserLogoutAllContainer from '../../../components/containers/UserLogoutAllContainer/UserLogoutAllContainer';
import UserDataEditForm from '../../../components/forms/UserDataEditForm/UserDataEditForm';
import UserLayout from '../../../components/layout/UserLayout/UserLayout';
import InfoModal from '../../../components/modals/InfoModal/InfoModal';
import classes from './UserEditDataPage.module.scss';

const UserEditDataPage = () => {
  return (
    <UserLayout>
      <>
        <InfoModal />
        <div className={classes['edit-data-container']}>
          <UserDataEditForm />
          <UserLogoutAllContainer />
        </div>
      </>
    </UserLayout>
  )
}

export default UserEditDataPage
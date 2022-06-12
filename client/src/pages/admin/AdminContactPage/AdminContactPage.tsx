import classes from './AdminContactPage.module.scss';
import UserLayout from '../../../components/layout/UserLayout/UserLayout'
import InfoModal from '../../../components/modals/InfoModal/InfoModal'
import CreateContactDataContainer from '../../../components/containers/CreateContactDataContainer/CreateContactDataContainer';
import AdminContactListContainer from '../../../components/containers/AdminContactListContainer/AdminContactListContainer';

const AdminContactPage = () => {
  return (
    <UserLayout>
      <>
        <InfoModal />
        <section className={classes['admin-contact-page']}>
          <CreateContactDataContainer />
          <AdminContactListContainer />
        </section>
      </>
    </UserLayout>
  )
}

export default AdminContactPage
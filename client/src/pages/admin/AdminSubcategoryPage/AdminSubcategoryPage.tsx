import classes from './AdminSubcategoryPage.module.scss';
import UserLayout from '../../../components/layout/UserLayout/UserLayout';
import InfoModal from '../../../components/modals/InfoModal/InfoModal';
import CreateSubcategoryContainer from '../../../components/containers/CreateSubcategoryContainer/CreateSubcategoryContainer';

const AdminSubcategoryPage = () => {
  return (
    <UserLayout>
      <>
        <InfoModal />
        <section className={classes['admin-subcategory-page']}>
          <CreateSubcategoryContainer />
        </section>
      </>
    </UserLayout>
  )
}

export default AdminSubcategoryPage
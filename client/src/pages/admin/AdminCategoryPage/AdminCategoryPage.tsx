import CreateCategoryContainer from '../../../components/containers/CreateCategoryContainer/CreateCategoryContainer'
import UserLayout from '../../../components/layout/UserLayout/UserLayout'
import AdminCategoryList from '../../../components/lists/AdminCategoryList/AdminCategoryList'
import InfoModal from '../../../components/modals/InfoModal/InfoModal'
import classes from './AdminCategoryPage.module.scss';

const AdminCategoryPage = () => {
  return (
    <UserLayout>
      <>
        <InfoModal />
        <section className={classes['admin-category-page']}>
          <CreateCategoryContainer />
          <AdminCategoryList />
        </section>
      </>
    </UserLayout>
  )
}

export default AdminCategoryPage
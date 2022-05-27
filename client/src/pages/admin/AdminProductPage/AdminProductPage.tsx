import AdminProductListContainer from '../../../components/containers/AdminProductListContainer/AdminProductListContainer';
import CreateProductContainer from '../../../components/containers/CreateProductContainer/CreateProductContainer';
import UserLayout from '../../../components/layout/UserLayout/UserLayout';
import InfoModal from '../../../components/modals/InfoModal/InfoModal';
import classes from './AdminProductPage.module.scss';

const AdminProductPage = () => {
  return (
    <UserLayout>
      <>
        <InfoModal />
        <section className={classes['admin-product-page']}>
          <CreateProductContainer />
          <AdminProductListContainer />
        </section>
      </>
    </UserLayout>
  )
}

export default AdminProductPage
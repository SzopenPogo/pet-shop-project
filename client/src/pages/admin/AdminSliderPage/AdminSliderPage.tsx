import classes from './AdminSliderPage.module.scss';
import UserLayout from '../../../components/layout/UserLayout/UserLayout';
import InfoModal from '../../../components/modals/InfoModal/InfoModal';
import CreateSliderContainer from '../../../components/containers/CreateSliderContainer/CreateSliderContainer';
import AdminSliderListContainer from '../../../components/containers/AdminSliderListContainer/AdminSliderListContainer';

const AdminSliderPage = () => {
  return (
    <UserLayout>
      <>
        <InfoModal />
        <section className={classes['admin-slider-page']}>
          <CreateSliderContainer />
          <AdminSliderListContainer />
        </section>
      </>
    </UserLayout>
  )
}

export default AdminSliderPage
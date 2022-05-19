import UserLayout from '../../../components/layout/UserLayout/UserLayout'
import AdminCategoryList from '../../../components/lists/AdminCategoryList/AdminCategoryList'
import InfoModal from '../../../components/modals/InfoModal/InfoModal'

const AdminCategoryPage = () => {
  return (
    <UserLayout>
      <>
        <InfoModal />
        <AdminCategoryList />
      </>
    </UserLayout>
  )
}

export default AdminCategoryPage
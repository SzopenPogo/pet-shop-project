import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserLayout from '../../../components/layout/UserLayout/UserLayout';
import AdminUsersList from '../../../components/lists/AdminUsersList/AdminUsersList';
import InfoModal from '../../../components/modals/InfoModal/InfoModal';
import Spinner from '../../../components/spinners/Spinner/Spinner';
import { RootState } from '../../../store';
import { adminGetAllUsers } from '../../../store/admin/actions/admin-get-all-users';
import classes from './AdminUsersPage.module.scss';

const AdminUsersPage = () => {
  const dispatch = useDispatch();

  const token = useSelector((state:RootState) => state.user.token);
  const data = useSelector((state:RootState) => state.admin);
  const {loading, error, users} = data;

  useEffect(() => {
    dispatch(adminGetAllUsers(token));
  }, [dispatch, token]);


  return (
    <UserLayout>
      <>
        <InfoModal />
        <section className={classes['users-container']}>
          {loading && <Spinner borderSize='.75rem' size='12rem' color='gray' />}
          {error && <h1>{error}</h1>}
          <AdminUsersList users={users} />
        </section>
      </>
    </UserLayout>
  )
}

export default AdminUsersPage
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdminUsersFilterBar from '../../../components/elements/AdminUsersFilterBar/AdminUsersFilterBar';
import UserLayout from '../../../components/layout/UserLayout/UserLayout';
import AdminUsersList from '../../../components/lists/AdminUsersList/AdminUsersList';
import InfoModal from '../../../components/modals/InfoModal/InfoModal';
import Spinner from '../../../components/spinners/Spinner/Spinner';
import { RootState } from '../../../store';
import { adminGetAllUsers } from '../../../store/admin/actions/admin-get-all-users';
import { addInfoMessage } from '../../../store/ui/actions/info-items-actions';
import classes from './AdminUsersPage.module.scss';

const AdminUsersPage = () => {
  const dispatch = useDispatch();

  const token = useSelector((state: RootState) => state.user.token);
  const data = useSelector((state: RootState) => state.admin);
  const {loading, error, users, getUsersUrl} = data;

  useEffect(() => {
    dispatch(adminGetAllUsers(token, getUsersUrl));

    if(error) {
      dispatch(addInfoMessage({message: error, timeout: 2000, isPositive: false}));
    }
  }, [dispatch, token, error, getUsersUrl]);


  return (
    <UserLayout>
      <>
        <InfoModal />
        <section className={classes['users-container']}>
          <AdminUsersFilterBar />
          <section className={classes.content}>
            {loading && <div className={classes.spinner}>
              <Spinner borderSize='.75rem' size='12rem' color='gray' />
            </div>}
            {!loading && <AdminUsersList users={users} />}
          </section>
        </section>
      </>
    </UserLayout>
  )
}

export default AdminUsersPage
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdminOrderFilterBar from '../../../components/elements/AdminOrderFilterBar/AdminOrderFilterBar';
import UserLayout from '../../../components/layout/UserLayout/UserLayout';
import OrderList from '../../../components/lists/OrderList/OrderList';
import InfoModal from '../../../components/modals/InfoModal/InfoModal';
import { RootState } from '../../../store';
import { getAllOrders } from '../../../store/order/actions/order-get-all-actions';
import { setOrderUrl } from '../../../store/order/actions/order-url-actions';
import classes from './AdminOrderPage.module.scss';

const AdminOrderPage = () => {
  const dispatch = useDispatch();

  const token = useSelector((state: RootState) => state.user.token);
  const orderUrl = useSelector((state: RootState) => state.order.orderUrl);
  const orderUrlOptions = useSelector((state: RootState) => state.order.orderUrlOptions);

  useEffect(() => {
    dispatch(setOrderUrl(orderUrlOptions));
  }, [dispatch, orderUrlOptions])

  useEffect(() => {
    dispatch(getAllOrders(token, orderUrl));
  }, [dispatch, token, orderUrl]);
  
  return (
    <UserLayout>
      <>
        <InfoModal />
        <section className={classes['admin-order-page']}>
          <AdminOrderFilterBar />
          <OrderList isEditable={true} />
        </section>
      </>
    </UserLayout>
  )
}

export default AdminOrderPage;
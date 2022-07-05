import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserLayout from '../../../components/layout/UserLayout/UserLayout';
import OrderList from '../../../components/lists/OrderList/OrderList';
import { RootState } from '../../../store';
import { getMyOrders } from '../../../store/order/actions/order-get-me-actions';
import classes from './UserOrderPage.module.scss';

const UserOrderPage = () => {
  const dispatch = useDispatch();

  const token = useSelector((state: RootState) => state.user.token);

  useEffect(() => {
    dispatch(getMyOrders(token));
  }, [dispatch, token]);

  return (
    <UserLayout>
      <section className={classes['orders']}>
        <h1 className={classes['orders-title']}>Your orders</h1>
        <OrderList isEditable={false} />
      </section>
    </UserLayout>
  )
}

export default UserOrderPage;
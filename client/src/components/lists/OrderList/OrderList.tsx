import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import OrderListItem from '../../list-items/OrderListItem/OrderListItem';
import Spinner from '../../spinners/Spinner/Spinner';
import classes from './OrderList.module.scss';

interface IProps {
  isEditable: boolean;
}

const OrderList = ({isEditable}: IProps) => {
  const {loading, error, data} =  useSelector((state: RootState) => state.order.orders);

  const renderOrders = data.map((order, index) => (
    <OrderListItem
      key={order._id}
      _id={order._id}
      status={order.status}
      city={order.city}
      country={order.country}
      homeNumber={order.homeNumber}
      paymentMethod={order.paymentMethod}
      phoneNumber={order.phoneNumber}
      postalCode={order.postalCode}
      products={order.products}
      street={order.street}
      userId={order.userId}
      index={index}
      isEditable={isEditable}
      totalAmount={order.totalAmount}
      totalPrice={order.totalPrice}
    />
  ));

  return (
    <ul className={classes['order-list']}>
      {loading && !error && <Spinner size={'5rem'} borderSize={'.35rem'} color={'gray'} />}
      {error && <h3>{error}</h3>}
      {!loading && !error && renderOrders}
      {data.length <= 0 && <h1>No order found</h1>}
    </ul>
  )
}

export default OrderList;
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ORDER_CANCELED_STATUS } from '../../../constants/order';
import { IOrder } from '../../../interfaces/IOrder';
import { RootState } from '../../../store';
import { setPaymentMethodName } from '../../../utils/naming/setPaymentMethodName';
import CheckoutSummary from '../../elements/CheckoutSummary/CheckoutSummary';
import OrderItemElement from '../../elements/OrderItemElement/OrderItemElement';
import OrderDataList from '../../lists/OrderDataList/OrderDataList';
import OrderStatusSelect from '../../Select/OrderStatusSelect/OrderStatusSelect';
import CheckoutListItem from '../CheckoutListItem/CheckoutListItem';
import classes from './OrderListItem.module.scss';

interface IProps extends IOrder {
  index: number;
  isEditable: boolean;
}

const OrderListItem = ({
  city,
  country,
  homeNumber,
  paymentMethod,
  phoneNumber,
  postalCode,
  products,
  street,
  _id,
  status,
  userId,
  totalAmount,
  totalPrice,
  index,
  isEditable
}: IProps) => {
  const isAdmin = useSelector((state: RootState) => state.user.data.isAdmin);

  const [paymentMethodValue, setPaymentMethodValue] = useState<string>('');

  const addressData = [{
    title: 'Country',
    value: country
  }, {
    title: 'Postal code',
    value: postalCode
  }, {
    title: 'City',
    value: city
  }, {
    title: 'Street',
    value: street
  }, {
    title: 'Home number',
    value: homeNumber
  }, {
    title: 'Phone number',
    value: phoneNumber
  }];

  const renderAddressData = addressData.map((address, index) => {
    let haveAddresItemBorder = index === 0 ? false : true;

    return (
      <OrderItemElement
        key={address.title}
        title={address.title}
        value={address.value}
        haveBorder={haveAddresItemBorder}
      />
    )
  });

  const renderProducts = products.map(product => (
    <CheckoutListItem
      key={product._id}
      _id={product._id}
      amount={product.amount}
      price={product.price}
      title={product.title}
    />
  ))

  useEffect(() => {
    setPaymentMethodValue(setPaymentMethodName(paymentMethod));
  }, [paymentMethod])
  
  return (
    <li className={classes['order-item']}>
      <OrderItemElement title='Order ID' value={_id ? _id : ''} haveBorder={false} />

      {isAdmin && isEditable
        ? <OrderStatusSelect 
            orderStatus={status ?  status : ORDER_CANCELED_STATUS}
            index={index} 
            _id={_id ? _id : ''}
          />
        : <OrderItemElement title='Status' value={status ?  status : ''} />
      }

      <OrderItemElement title='Payment method' value={paymentMethodValue} />

      {isAdmin && isEditable && <OrderItemElement title='User ID' value={userId ? userId : 'none'} />}

      <OrderDataList title={'Address'}>
        <>
          {renderAddressData}
        </>
      </OrderDataList>

      <OrderDataList title={'Products'}>
        <>
          {renderProducts}
          <div className={classes['product-summary-container']}>
            <CheckoutSummary totalAmount={totalAmount} totalPrice={totalPrice} />
          </div>
        </>
      </OrderDataList>
    </li>
  )
}

export default OrderListItem;
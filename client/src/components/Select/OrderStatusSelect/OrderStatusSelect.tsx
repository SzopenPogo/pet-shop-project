import { useDispatch, useSelector } from 'react-redux';
import { ORDER_CANCELED_STATUS, ORDER_COMPLETE_STATUS, ORDER_PENDING_STATUS, ORDER_SHIPPING_STATUS } from '../../../constants/order';
import { RootState } from '../../../store';
import { editOrderStatus } from '../../../store/order/actions/order-ststus-edit-actions';
import { addInfoMessage } from '../../../store/ui/actions/info-items-actions';
import SelectInput from '../../inputs/SelectInput/SelectInput';
import classes from './OrderStatusSelect.module.scss';

interface IProps {
  orderStatus: string;
  index: number;
  _id: string;
}

const OrderStatusSelect = ({orderStatus, index, _id}: IProps) => {
  const dispatch = useDispatch();

  const token = useSelector((state: RootState) => state.user.token);

  const statusOptions = [{
      title: ORDER_PENDING_STATUS,
      value: ORDER_PENDING_STATUS
    }, {
      title: ORDER_SHIPPING_STATUS,
      value: ORDER_SHIPPING_STATUS
    }, {
      title: ORDER_COMPLETE_STATUS,
      value: ORDER_COMPLETE_STATUS
    }, {
      title: ORDER_CANCELED_STATUS,
      value: ORDER_CANCELED_STATUS
    }
  ];

  const changeOrderStatusHandler = (value: string) => {
    dispatch(editOrderStatus(token, _id, value, index));
    dispatch(addInfoMessage({
      message: 'Order status edited',
      isPositive: true,
      timeout: 1500
    }))
  }

  return (
    <span className={classes['order-select-status']}>
      Status:
      <SelectInput
        options={statusOptions}
        title={'Status'}
        isLabel={false}
        isRequired={false}
        selectedOptionValue={orderStatus}
        onChangeFunction={changeOrderStatusHandler}
      />
    </span>
  )
}

export default OrderStatusSelect;
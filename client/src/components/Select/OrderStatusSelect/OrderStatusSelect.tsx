import { useDispatch, useSelector } from 'react-redux';
import { ORDER_STATUS_OPTIONS } from '../../../constants/order';
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
        options={ORDER_STATUS_OPTIONS}
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
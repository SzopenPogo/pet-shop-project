import { useDispatch, useSelector } from 'react-redux';
import { ORDER_STATUS_OPTIONS } from '../../../constants/order';
import { RootState } from '../../../store';
import { manageOrderUrlAction } from '../../../store/order/actions/order-url-actions';
import SelectInput from '../../inputs/SelectInput/SelectInput';

const OrderStatusUrlSelect = () => {
  const dispatch = useDispatch();

  const orderUrlOptions = useSelector((state: RootState) => state.order.orderUrlOptions);

  const onStatusChengeHandler = (value: string) => {
    const urlOption = `status=${value}`;
    dispatch(manageOrderUrlAction(orderUrlOptions, urlOption));
  }

  const orderFilterStatus = [{
    title: '--Select status--',
    value: ''
  },
    ...ORDER_STATUS_OPTIONS
  ]

  return (
    <SelectInput 
      options={orderFilterStatus} 
      title={'Filter by status'} 
      isLabel={false}
      isRequired={false}
      onChangeFunction={onStatusChengeHandler}
    />
  )
}

export default OrderStatusUrlSelect;
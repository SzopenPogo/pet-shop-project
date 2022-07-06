import { FORMAT_TO_FULL_DATE } from "../../../constants/date";
import { formatBackendDate } from "../../../utils/date/formatBackendDate";
import OrderItemElement from "../OrderItemElement/OrderItemElement";

interface IProps {
  createdAt: string;
  updatedAt: string;
}

const OrderListItemTimeElement = ({createdAt, updatedAt}: IProps) => {
  return (
    <>
      <OrderItemElement 
          title='Created at'
          value={formatBackendDate(createdAt, FORMAT_TO_FULL_DATE)} 
        />
      <OrderItemElement 
        title='Updated at' 
        value={formatBackendDate(updatedAt, FORMAT_TO_FULL_DATE)}
      />
    </>
  )
}

export default OrderListItemTimeElement;
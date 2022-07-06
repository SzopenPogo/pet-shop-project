import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { manageOrderUrlAction } from "../../../store/order/actions/order-url-actions";
import SortSwitchInput from "../../inputs/SortSwitchInput/SortSwitchInput";

interface IProps {
  title: string;
  url: string;
}

const OrderSortSwitch = ({title, url}: IProps) => {
  const dispatch = useDispatch();
  
  const [isAscending, setIsAscending] = useState<boolean>(false);
  const orderUrlOptions = useSelector((state: RootState) => state.order.orderUrlOptions);

  const sortOrder = () => {
    const option = isAscending
      ? `${url}=desc`
      : `${url}=asc`;

    dispatch(manageOrderUrlAction(orderUrlOptions, option));
  };

  const sortOrderHandler = () => {
    setIsAscending(!isAscending);
    sortOrder();
  }

  return (
    <SortSwitchInput 
      defaultStatus={isAscending}
      onChange={sortOrderHandler}
      title={`Sort by ${title}`}         
    />
  )
}

export default OrderSortSwitch;
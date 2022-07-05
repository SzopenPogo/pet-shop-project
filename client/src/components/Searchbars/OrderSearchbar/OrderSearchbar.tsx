import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { manageOrderUrlAction } from "../../../store/order/actions/order-url-actions";
import SearchInput from "../../inputs/SearchInput/SearchInput";

const OrderSearchbar = () => {
  const dispatch = useDispatch();

  const orderUrlOptions = useSelector((state: RootState) => state.order.orderUrlOptions);

  const [urlOption, setUrlOption] = useState<string>('');

  useEffect(() => {
    dispatch(manageOrderUrlAction(orderUrlOptions, urlOption));
  }, [dispatch, urlOption])


  const searchOrderHandler = (value: string) => {
    setUrlOption(`orderId=${value}`);
  }

  return (
    <SearchInput 
      title={'Find order by order id'}
      searchTime={650}
      searchFunction={searchOrderHandler}
    />
  )
}

export default OrderSearchbar;
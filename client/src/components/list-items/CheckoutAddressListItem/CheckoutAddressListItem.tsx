import { useDispatch } from 'react-redux';
import { addressSelectById } from '../../../store/address/actions/address-select-actions';
import classes from './CheckoutAddressListItem.module.scss';

interface IProps {
  _id: string;
  country: string;
  postalCode: string;
  city: string;
  street: string;
  homeNumber: string;
  close: () => void;
}

const CheckoutAddressListItem = ({
  _id,
  city,
  country,
  homeNumber,
  street,
  postalCode,
  close
}: IProps) => {
  const dispatch = useDispatch();

  const selectAddresHandler = () => {
    dispatch(addressSelectById(_id))
    close();
  }

  return (
    <li className={classes['address-item']} onClick={selectAddresHandler}>
      <div className={classes['address-item-container']}>
        <span className={classes['address-conutry']}>{country}</span>
        <span>{postalCode}</span>
      </div>
      <div className={classes['address-item-container']}>
        <span>{city}</span>
        <span>{street}</span>
        <span>{homeNumber}</span>
      </div>
    </li>
  )
}

export default CheckoutAddressListItem;
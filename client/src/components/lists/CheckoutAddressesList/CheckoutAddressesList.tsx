import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { getAllAddresses } from '../../../store/address/actions/address-get-actions';
import CheckoutAddressListItem from '../../list-items/CheckoutAddressListItem/CheckoutAddressListItem';
import Spinner from '../../spinners/Spinner/Spinner';
import classes from './CheckoutAddressesList.module.scss';

interface IProps {
  close: () => void;
}

const CheckoutAddressesList = ({close}: IProps) => {
  const dispatch = useDispatch();
  
  const {loading, error, data} = useSelector((state: RootState) => state.address);
  const token = useSelector((state: RootState) => state.user.token);

  useEffect(() => {
    dispatch(getAllAddresses(token));
  }, [dispatch, token]);

  const renderAddresses = data.map(address => (
    <CheckoutAddressListItem
      key={address._id}
      _id={address._id}
      city={address.city}
      country={address.country}
      postalCode={address.postalCode}
      homeNumber={address.homeNumber}
      street={address.street}
      close={close}
    />
  ))
  

  return (
    <ul className={classes['addresses']}>
      {loading && <Spinner size={'4rem'} borderSize={'.5rem'} color={'black'} />}
      {!loading && error && <h1>{error}</h1>}
      {!loading && renderAddresses}
    </ul>
  )
}

export default CheckoutAddressesList;
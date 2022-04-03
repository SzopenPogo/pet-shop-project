import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddressForm from '../../../components/forms/AddressForm/AddressForm';
import UserLayout from '../../../components/layout/UserLayout/UserLayout';
import { RootState } from '../../../store';
import { getAllAddresses } from '../../../store/address/actions/address-get-actions';
import classes from './UserAddressPage.module.scss';

const UserAddressPage = () => {
  const dispatch = useDispatch();

  const { token } = useSelector((state: RootState) => state.user);
  const { loading, error, data } = useSelector((state: RootState) => state.address);

  useEffect(() => {
    dispatch(getAllAddresses(token));
  }, [dispatch, token])

  const renderAddresses = data.map((address, index) => (
    <AddressForm
      key={address._id}
      _id={address._id}
      country={address.country}
      city={address.city}
      postalCode={address.postalCode}
      street={address.street}
      homeNumber={address.homeNumber}
      phoneNumber={address.phoneNumber}
      userId={address.userId}
      addressIndex={index}
    />
  ));

  return (
    <UserLayout>
      <section className={classes.addresses}>
        {renderAddresses}
      </section>
    </UserLayout>
  )
}

export default UserAddressPage
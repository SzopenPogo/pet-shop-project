import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreateAddressContainer from '../../../components/containers/CreateAddressContainer/CreateAddressContainer';
import AddressForm from '../../../components/forms/AddressForm/AddressForm';
import UserLayout from '../../../components/layout/UserLayout/UserLayout';
import InfoModal from '../../../components/modals/InfoModal/InfoModal';
import Spinner from '../../../components/spinners/Spinner/Spinner';
import { RootState } from '../../../store';
import { getAllAddresses } from '../../../store/address/actions/address-get-actions';
import { addInfoMessage } from '../../../store/ui/actions/info-items-actions';
import classes from './UserAddressPage.module.scss';

const UserAddressPage = () => {
  const dispatch = useDispatch();

  const { token } = useSelector((state: RootState) => state.user);
  const { loading, error, data } = useSelector((state: RootState) => state.address);

  useEffect(() => {
    dispatch(getAllAddresses(token));

    if(error) {
      dispatch(addInfoMessage({message: error, timeout: 3000, isPositive: false}));
    }
  }, [dispatch, token, error])

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
      <>
        <InfoModal />
        <CreateAddressContainer />
        {!loading && <section className={classes.addresses}>
          {renderAddresses}
        </section>}
        {loading && <Spinner borderSize='.35rem' size='2rem' color='black' />}
        {error && <h1>{error}</h1>}
      </>
    </UserLayout>
  )
}

export default UserAddressPage
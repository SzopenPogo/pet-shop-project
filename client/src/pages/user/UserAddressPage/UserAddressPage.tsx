import AddressForm from '../../../components/forms/AddressForm/AddressForm';
import UserLayout from '../../../components/layout/UserLayout/UserLayout';
import classes from './UserAddressPage.module.scss';

const UserAddressPage = () => {
  return (
    <UserLayout>
      <AddressForm />
    </UserLayout>
  )
}

export default UserAddressPage
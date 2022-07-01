import CheckoutAddressForm from '../../forms/CheckoutAddressForm/CheckoutAddressForm';
import classes from './CheckoutAddressContainer.module.scss';

const CheckoutAddressContainer = () => {
  return (
    <div className={classes['checkout-address-container']}>
      <CheckoutAddressForm />
    </div>
  )
}

export default CheckoutAddressContainer;
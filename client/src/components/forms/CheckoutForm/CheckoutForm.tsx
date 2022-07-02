import { FormEvent, useState } from 'react';
import { IDeliveryAddressData } from '../../../interfaces/IAddressData';
import MainButton from '../../buttons/MainButton/MainButton';
import CheckoutAddressContainer from '../../containers/CheckoutAddressContainer/CheckoutAddressContainer';
import PaymentMethodContainer from '../../containers/PaymentMethodContainer/PaymentMethodContainer';
import classes from './CheckoutForm.module.scss';

const CheckoutForm = () => {
  const [addressData, setAddressData] = useState<IDeliveryAddressData>({
    city: '',
    country: '',
    homeNumber: '',
    phoneNumber: '',
    postalCode: '',
    street: ''
  });

  const handleAddressData = (addressData: IDeliveryAddressData) => {
    setAddressData(addressData);
  }

  const handlePaymentData = (paymentMethod: string) => {

  }

  const orderSubmitHandler = (event: FormEvent) => {
    event.preventDefault();

    console.log(addressData);
    
  }

  return (
    <form className={classes['checkout-data']} onSubmit={orderSubmitHandler}>
      <CheckoutAddressContainer sendDataToForm={handleAddressData} />
      <PaymentMethodContainer sendDataToForm={handlePaymentData} />
      
      <div className={classes['submit-button-container']}>
        <MainButton
          isSubmit={true}
          title='Order now'
        />
      </div>
    </form>
  )
}

export default CheckoutForm;
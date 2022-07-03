import { FormEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { IDeliveryAddressData } from '../../../interfaces/IAddressData';
import { IOrder } from '../../../interfaces/IOrder';
import { IOrderProduct } from '../../../interfaces/IProduct';
import { RootState } from '../../../store';
import MainButton from '../../buttons/MainButton/MainButton';
import CheckoutAddressContainer from '../../containers/CheckoutAddressContainer/CheckoutAddressContainer';
import PaymentMethodContainer from '../../containers/PaymentMethodContainer/PaymentMethodContainer';
import classes from './CheckoutForm.module.scss';

const CheckoutForm = () => {

  const cartProducts = useSelector((state: RootState) => state.cart.cart.data.cartProducts);
  const userId = useSelector((state: RootState) => state.user.data._id);

  const [addressData, setAddressData] = useState<IDeliveryAddressData>({
    city: '',
    country: '',
    homeNumber: '',
    phoneNumber: '',
    postalCode: '',
    street: ''
  });

  const [paymentMethod, setPaymentMethod] = useState<string>('');

  const handleAddressData = (addressData: IDeliveryAddressData) => {
    setAddressData(addressData);
  }

  const handlePaymentData = (paymentMethod: string) => {
    setPaymentMethod(paymentMethod)
  }

  const orderSubmitHandler = (event: FormEvent) => {
    event.preventDefault();

    const convertedProducts = [] as Array<IOrderProduct>
    
    cartProducts.map(product => {
      const convertedProduct: IOrderProduct = {
        _id: product._id,
        title: product.title,
        price: product.price,
        amount: product.ammount
      }

      return convertedProducts.push(convertedProduct);
    })

    const orderData: IOrder = {
      userId: userId ? userId : '0',
      city: addressData.city,
      country: addressData.country,
      homeNumber: addressData.homeNumber,
      paymentMethod,
      phoneNumber: addressData.phoneNumber,
      postalCode: addressData.postalCode,
      street: addressData.street,
      products: convertedProducts
    }
    
    console.log(orderData);
    
  }

  return (
    <form className={classes['checkout-data']} onSubmit={orderSubmitHandler}>
      <CheckoutAddressContainer sendDataToForm={handleAddressData} />
      <PaymentMethodContainer sendDataToForm={handlePaymentData} />
      
      {addressData.city && paymentMethod && <div className={classes['submit-button-container']}>
        <MainButton
          isSubmit={true}
          title='Order now'
        />
      </div>}
    </form>
  )
}

export default CheckoutForm;
import { FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { CREATE_ORDER_SUCCESS } from '../../../constants/order';
import { CHECKOUT_SUCCESS_ROUTE } from '../../../constants/routes';
import { IDeliveryAddressData } from '../../../interfaces/IAddressData';
import { IOrder } from '../../../interfaces/IOrder';
import { IOrderProduct } from '../../../interfaces/IProduct';
import { RootState } from '../../../store';
import { clearCart } from '../../../store/cart/actions/cart-clear-actions';
import { createOrder, resetCreateOrderActionType } from '../../../store/order/actions/order-create-actions';
import MainButton from '../../buttons/MainButton/MainButton';
import CheckoutAddressContainer from '../../containers/CheckoutAddressContainer/CheckoutAddressContainer';
import PaymentMethodContainer from '../../containers/PaymentMethodContainer/PaymentMethodContainer';
import Spinner from '../../spinners/Spinner/Spinner';
import classes from './CheckoutForm.module.scss';

const CheckoutForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartProducts = useSelector((state: RootState) => state.cart.cart.data.cartProducts);
  const userId = useSelector((state: RootState) => state.user.data._id);
  const {loading: orderLoading, 
    actionType: orderActionType,
    data: orderData
  } = useSelector((state: RootState) => state.order.order);

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
      city: addressData.city,
      country: addressData.country,
      homeNumber: addressData.homeNumber,
      paymentMethod,
      phoneNumber: addressData.phoneNumber,
      postalCode: addressData.postalCode,
      street: addressData.street,
      products: convertedProducts
    }
    if(userId) {
      orderData['userId'] = userId
    }
    
    if(convertedProducts.length > 0) {
      dispatch(createOrder(orderData));
    } else {
      navigate('/');
    }
  }

  useEffect(() => {
    if(orderActionType === CREATE_ORDER_SUCCESS) {
      dispatch(clearCart());
      dispatch(resetCreateOrderActionType());
      navigate(`${CHECKOUT_SUCCESS_ROUTE}/${orderData._id}`);
    }
  }, [orderActionType, dispatch, navigate, orderData])
  

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
      {orderLoading && <div className={classes['spinner-container']}>
        <Spinner size={'11rem'} borderSize={'.7rem'} color={'black'} />  
      </div>}
    </form>
  )
}

export default CheckoutForm;
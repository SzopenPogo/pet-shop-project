import { ChangeEvent, SyntheticEvent, useState } from 'react';
import generateInputId from '../../../utils/generateInputId';
import classes from './PaymentMethodInput.module.scss';

interface IProps {
  title: string;
  value: string;
  image: string;
  isSelected: boolean;
  selectPaymentMethod: (value: string) => void;
}

const PaymentMethodInput = ({title, value, image, isSelected, selectPaymentMethod}: IProps) => {

  const selectPaymentMethodHandler = () => {
    selectPaymentMethod(value);
  }

  const paymentMethodClass = isSelected 
    ? `${classes['payment-method']} ${classes['payment-method--active']}`
    : classes['payment-method'];

  const inputId = generateInputId(title);
  return (
    <div className={paymentMethodClass} >
      <input
        onChange={selectPaymentMethodHandler}
        type='radio'
        id={inputId}
        value={value}
        name='PAYMENT_METHOD'
      />
      <img src={image} alt={`${title}-img`} className={classes['payment-method-image']} />
      <label htmlFor={inputId}>{title}</label>
    </div>
  )
}

export default PaymentMethodInput;
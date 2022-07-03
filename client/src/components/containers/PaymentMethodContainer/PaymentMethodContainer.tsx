import classes from './PaymentMethodContainer.module.scss';
import boxIcon from '../../../images/icon/boxIcon.svg';
import cardIcon from '../../../images/icon/cardIcon.svg';
import PaymentMethodInput from '../../inputs/PaymentMethodInput/PaymentMethodInput';
import { CARD_PAYMENT_METHOD, DELIVERY_PAYMENT_METHOD } from '../../../constants/paymentMethod';
import { useState } from 'react';
import CardPaymentModal from '../../modals/CardPaymentModal/CardPaymentModal';

interface IProps {
  sendDataToForm: (paymentMethod: string) => void;
}

const PaymentMethodContainer = ({sendDataToForm}: IProps) => {

  const [isCardWindowActive, setIsCardWindowActive] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<string>('');

  const setPaymentMethodHandler = (value: string) => {
    setPaymentMethod(value);
    switch(value) {
      case CARD_PAYMENT_METHOD:
        toggleCardWindow();
        break;
      case DELIVERY_PAYMENT_METHOD:
        sendDataToForm(DELIVERY_PAYMENT_METHOD);
        break;
    }
  }

  const toggleCardWindow = () => {
    setIsCardWindowActive(!isCardWindowActive);
  }

  return (
    <>
      <div className={classes['payment-method-container']}>
        <h1 className={classes['payment-method-title']}>Payment method</h1>
        <div className={classes['payment-methods']}>
          <PaymentMethodInput
            title='Cash on delivery'
            image={boxIcon}
            value={DELIVERY_PAYMENT_METHOD}
            selectPaymentMethod={setPaymentMethodHandler}
            isSelected={paymentMethod === DELIVERY_PAYMENT_METHOD}
          />
          <PaymentMethodInput
            title='Pay by card'
            image={cardIcon}
            value={CARD_PAYMENT_METHOD}
            selectPaymentMethod={setPaymentMethodHandler}
            isSelected={paymentMethod === CARD_PAYMENT_METHOD}
          />
        </div>
      </div>
      <CardPaymentModal
        activate={isCardWindowActive}
        timeout={150}
        close={toggleCardWindow}
        sendDataToForm={sendDataToForm}
      />
    </>
  )
}

export default PaymentMethodContainer;
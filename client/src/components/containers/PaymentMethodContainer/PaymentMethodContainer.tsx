import PaymentMethodButton from '../../buttons/PaymentMethodButton/PaymentMethodButton';
import classes from './PaymentMethodContainer.module.scss';
import boxIcon from '../../../images/icon/boxIcon.svg';
import cardIcon from '../../../images/icon/cardIcon.svg';

interface IProps {
  sendDataToForm: (paymentMethod: string) => void;
}

const PaymentMethodContainer = ({sendDataToForm}: IProps) => {
  return (
    <div className={classes['payment-method-container']}>
      <h1 className={classes['payment-method-title']}>Payment method</h1>
      <div className={classes['payment-methods']}>
        <PaymentMethodButton title='Cash on delivery' image={boxIcon} />
        <PaymentMethodButton title='Pay by card' image={cardIcon} />
      </div>
    </div>
  )
}

export default PaymentMethodContainer;
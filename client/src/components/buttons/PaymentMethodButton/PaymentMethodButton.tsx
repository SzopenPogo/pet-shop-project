import classes from './PaymentMethodButton.module.scss';

interface IProps {
  title: string;
  image: string;
  onClick?: () => void;
}

const PaymentMethodButton = ({title, image, onClick}: IProps) => {
  return (
    <button className={classes['payment-method-button']}>
      <img src={image} alt={`${title}-img`} className={classes['payment-method-image']} />
      <h3 className={classes['payment-method-title']}>{title}</h3>
    </button>
  )
}

export default PaymentMethodButton;
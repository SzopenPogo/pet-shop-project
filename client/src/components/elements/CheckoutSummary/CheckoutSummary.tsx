import classes from './CheckoutSummary.module.scss';

interface IProps {
  totalAmount: number;
  totalPrice: number;
}

const CheckoutSummary = ({totalAmount, totalPrice}: IProps) => {
  return (
    <div className={classes['checkout-summary']}>
        <span className={classes['checkout-total-amount']}>{totalAmount}</span>
        <span className={classes['checkout-total-price']}>{totalPrice}$</span>
    </div>
  )
}

export default CheckoutSummary;
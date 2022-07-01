import { useSelector } from 'react-redux';
import { CHECKOUT_ROUTE } from '../../../constants/routes';
import { RootState } from '../../../store';
import MainLink from '../../links/MainLink/MainLink';
import classes from './CartSummaryContainer.module.scss';

const CartSummaryContainer = () => {
  const totalPrice = useSelector((state: RootState) => state.cart.cart.data.totalPrice);
  const productsLenght = useSelector((state: RootState) => state.cart.cart.data.cartProducts.length);

  return (
    <div className={classes['cart-summary']}>
      <div className={classes['cart-summary-total-price-container']}>
        <span className={classes['total-price-title']}>Total price:</span>
        <span className={classes['total-price-price']}>{totalPrice}$</span>
      </div>
      {productsLenght > 0 && <MainLink title='Go to checkout' route={CHECKOUT_ROUTE} />}
    </div>
  )
}

export default CartSummaryContainer
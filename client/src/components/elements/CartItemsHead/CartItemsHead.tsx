import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import ClearCartButton from '../../buttons/ClearCartButton/ClearCartButton';
import classes from './CartItemsHead.module.scss';


const CartItemsHead = () => {
  const cartProductLength = useSelector((state: RootState) => state.cart.cart.data.cartProducts.length);
  
  return (
    <div className={classes['cart-items-head']}>
      <h1 className={classes['cart-title']}>
        Cart <span className={classes['cart-ammount']}>({cartProductLength})</span>
      </h1>
      <ClearCartButton />
    </div>
  )
}

export default CartItemsHead
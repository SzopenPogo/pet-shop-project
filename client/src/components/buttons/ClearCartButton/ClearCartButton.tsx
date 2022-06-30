import { useDispatch } from 'react-redux';
import { clearCart } from '../../../store/cart/actions/cart-clear-actions';
import classes from './ClearCartButton.module.scss';

const ClearCartButton = () => {
  const dispatch = useDispatch();

  const clearCartHandler = () => {
    dispatch(clearCart());
  }

  return (
    <button
      className={classes['clear-cart-button']}
      onClick={clearCartHandler}
    >
      Clear cart
    </button>
  )
}

export default ClearCartButton
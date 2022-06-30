import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { CART_ROUTE } from '../../../constants/routes';
import { RootState } from '../../../store';
import classes from './CartButton.module.scss';

interface IProps {
  size: string;
}

const CartButton = ({ size }: IProps) => {
  
  const cartProductsLength = useSelector((state: RootState) => state.cart.cart.data.cartProducts.length);

  const cartStyle = {
    width: size,
    height: size
  }

  return (
    <Link
      to={CART_ROUTE}
      style={cartStyle}
      className={classes.cart}
    >
      {cartProductsLength > 0 && <span className={classes['cart-ammount']}>
        {cartProductsLength}
      </span>}
    </Link>
  )
}

export default CartButton
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import CartListItem from '../../list-items/CartListItem/CartListItem';
import Spinner from '../../spinners/Spinner/Spinner';
import classes from './CartList.module.scss';

const CartList = () => {
  const {loading, error, data} = useSelector((state: RootState) => state.cart.cart)
  const {cartProducts} = data;
  
  const renderProducts = cartProducts.map((product, index) => (
    <CartListItem
      key={product._id}
      _id={product._id}
      image={product.images[0]}
      price={product.price}
      title={product.title}
      ammount={product.ammount}
      haveBorderBottom={index !== cartProducts.length - 1}
    />
  ))
  return (
    <ul className={classes['cart-items']}>
      {!loading && !error && cartProducts.length > 0 && renderProducts}
      {error && <h1>{error}</h1>}
      {loading && <Spinner size={'4rem'} borderSize={'.35rem'} color={'gray'} />}
      {cartProducts.length <= 0 && <h1>You don't have any items in your cart</h1>}
    </ul>
  )
}

export default CartList
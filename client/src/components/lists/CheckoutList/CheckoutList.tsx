import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { deleteItemFromCart } from '../../../store/cart/actions/cart-delete-item-acions';
import CheckoutSummary from '../../elements/CheckoutSummary/CheckoutSummary';
import CheckoutListItem from '../../list-items/CheckoutListItem/CheckoutListItem';
import classes from './CheckoutList.module.scss';

const CheckoutList = () => {
  const dispatch = useDispatch();

  const {cartProducts, totalAmmount, totalPrice} = useSelector((state: RootState) => state.cart.cart.data)

  const renderItems = cartProducts.map(product => {
    if(product.ammount <= 0) {
      return (dispatch(deleteItemFromCart(product._id)));
    }
    return (
      <CheckoutListItem
      key={product._id}
      title={product.title}
      amount={product.ammount}
      price={product.price}
      _id={product._id}
    />
    )
  })

  return (
    <ul className={classes['checkout-items']}>
      <div className={classes['checkout-items']}>
        {renderItems}
      </div>
      <div className={classes['checkout-summary-container']}>
        <CheckoutSummary totalAmount={totalAmmount} totalPrice={totalPrice} />
      </div>
    </ul>
  )
}

export default CheckoutList;
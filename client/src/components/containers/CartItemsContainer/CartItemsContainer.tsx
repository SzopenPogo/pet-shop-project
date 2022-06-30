import CartItemsHead from '../../elements/CartItemsHead/CartItemsHead';
import CartList from '../../lists/CartList/CartList';
import classes from './CartItemsContainer.module.scss';

const CartItemsContainer = () => {
  

  return (
    <section className={classes['cart-items']}>
      <>
        <CartItemsHead />
        <CartList />
      </>
    </section>
  )
}

export default CartItemsContainer
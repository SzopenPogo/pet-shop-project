import classes from './CartPage.module.scss';
import MainLayout from '../../../components/layout/MainLayout/MainLayout';
import CartItemsContainer from '../../../components/containers/CartItemsContainer/CartItemsContainer';

const CartPage = () => {
  return (
    <MainLayout>
      <section className={classes['cart']}>
        <CartItemsContainer />
      </section>
    </MainLayout>
  )
}

export default CartPage
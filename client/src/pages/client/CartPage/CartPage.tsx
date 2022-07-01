import classes from './CartPage.module.scss';
import MainLayout from '../../../components/layout/MainLayout/MainLayout';
import CartItemsContainer from '../../../components/containers/CartItemsContainer/CartItemsContainer';
import CartSummaryContainer from '../../../components/containers/CartSummaryContainer/CartSummaryContainer';

const CartPage = () => {
  return (
    <MainLayout>
      <section className={classes['cart']}>
        <CartItemsContainer />
        <CartSummaryContainer />
      </section>
    </MainLayout>
  )
}

export default CartPage
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import CheckoutForm from '../../../components/forms/CheckoutForm/CheckoutForm';
import MainLayout from '../../../components/layout/MainLayout/MainLayout';
import MainLink from '../../../components/links/MainLink/MainLink';
import CheckoutList from '../../../components/lists/CheckoutList/CheckoutList';
import { CART_ROUTE } from '../../../constants/routes';
import { RootState } from '../../../store';
import classes from './CheckoutPage.module.scss';

const CheckoutPage = () => {
  const navigate = useNavigate();

  const productsLenght = useSelector((state: RootState) => state.cart.cart.data.cartProducts.length)

  useEffect(() => {
    if(productsLenght <= 0) {
      navigate('/');
    }
  }, [productsLenght, navigate])
  

  return (
    <MainLayout>
      <section className={classes['checkout']}>
        <div className={classes['cart-link-container']}>
          <MainLink route={CART_ROUTE} title='Back to cart' />
        </div>
        <CheckoutList />
        <CheckoutForm />
      </section>
    </MainLayout>
  )
}

export default CheckoutPage
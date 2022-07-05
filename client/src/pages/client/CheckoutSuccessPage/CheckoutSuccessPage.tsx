import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import MainLayout from '../../../components/layout/MainLayout/MainLayout';
import MainLink from '../../../components/links/MainLink/MainLink';
import { PROFILE_ORDERS_ROUTE } from '../../../constants/routes';
import { RootState } from '../../../store';
import classes from './CheckoutSuccessPage.module.scss';
import checkmarkIcon from '../../../images/icon/checkMarkIcon.svg';

const CheckoutSuccessPage = () => {
  const params = useParams();

  const token = useSelector((state: RootState) => state.user.token);

  return (
    <MainLayout>
      <section className={classes['checkout-success']}>
        <div className={classes['checkout-success-container']}>
          <img src={checkmarkIcon} alt='checkout-success' className={classes['checkout-success-image']} />
          <h1 className={classes['checkout-success-title']}>See you next time!</h1>
          <h3 className={classes['checkout-success-data']}>
            Order ID: <span className={classes['checkout-success-id']}>{params.id}</span></h3>
        </div>
        <div className={classes['checkout-success-button-container']}>
          <MainLink route='/' title={'Main page'} />
          {token && <MainLink route={PROFILE_ORDERS_ROUTE} title={'Your orders'} />}
        </div>
      </section>
    </MainLayout>
  )
}

export default CheckoutSuccessPage;
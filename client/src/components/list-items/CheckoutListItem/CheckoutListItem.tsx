import { Link } from 'react-router-dom';
import { PRODUCT_ROUTE } from '../../../constants/routes';
import classes from './CheckoutListItem.module.scss';

interface IProps {
  _id: string;
  title: string;
  amount: number;
  price: number;
}

const CheckoutListItem = ({_id, title, amount, price}: IProps) => {
  const totalProductPrice = (price*amount).toFixed(2);

  return (
    <li className={classes['checkout-item']}>
      <div className={classes['checkout-title']}>
        <span>{amount}</span>
        <span>x</span>
        <Link
          className={classes['checkout-product-title']}
          to={`${PRODUCT_ROUTE}/${_id}`}
          >
            {title}
          </Link>
      </div>
      <span>{totalProductPrice}$</span>
    </li>
  )
}

export default CheckoutListItem
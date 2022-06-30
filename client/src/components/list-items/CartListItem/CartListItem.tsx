import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { BACKEND_URL } from '../../../constants/backend';
import { PRODUCT_ROUTE } from '../../../constants/routes';
import { ICartProductItem } from '../../../interfaces/IProduct';
import { changeCartItemAmmount } from '../../../store/cart/actions/cart-item-ammount-actions';
import DeleteCartButton from '../../buttons/DeleteCartButton/DeleteCartButton';
import NumberInput from '../../inputs/NumberInput/NumberInput';
import classes from './CartListItem.module.scss';

interface IProps extends ICartProductItem {
  haveBorderBottom: boolean;
}

const CartListItem = ({
  _id,
  image,
  price,
  title,
  ammount,
  haveBorderBottom
}: IProps) => {
  const dispatch = useDispatch();

  const productStyle = {
    borderBottom: haveBorderBottom ? '1px solid rgba(0, 0, 0, 0.3)' : 'none'
  }

  const changeItemAmmount = (ammount: number) => {
    dispatch(changeCartItemAmmount(_id, ammount));
  }
  

  return (
    <li className={classes['cart-product']} style={productStyle}>
      <img 
        src={`${BACKEND_URL}/${image}`}
        alt={`title-img`}
        className={classes['cart-product-image']}
      />

      <div className={classes['cart-product-container']}>
        <Link
          to={`${PRODUCT_ROUTE}/${_id}`}
          className={classes['cart-product-link']}
        >
          <h2 className={classes['cart-product-title']}>
            {title}
          </h2>
        </Link>
        <div className={classes['cart-ammount-container']}>
          <NumberInput
            isLabel={false}
            isReadonly={false}
            isRequired={true}
            title='ammount'
            value={ammount}
            min={1}
            onValueChange={changeItemAmmount}
          />
        </div>
      </div>

      <span className={classes['cart-price']}>{price}$</span>

      <div className={classes['delete-cart-button-container']}>
        <DeleteCartButton _id={_id} />
      </div>
      
    </li>
  )
}

export default CartListItem
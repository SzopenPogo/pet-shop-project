import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../../store/cart/actions/cart-add-to-actions';
import AddToCartButton from '../../buttons/AddToCartButton/AddToCartButton';
import classes from './AddToCartContainer.module.scss';

interface IProps {
  productId: string;
}

const AddToCartContainer = ({productId}: IProps) => {
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(addItemToCart({_id: productId, ammount: 1}))
  }

  return (
    <div className={classes['cart-container']} >
      <AddToCartButton onClick={addToCartHandler} />
    </div>
  )
}

export default AddToCartContainer
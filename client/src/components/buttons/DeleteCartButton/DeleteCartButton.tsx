import { useDispatch } from 'react-redux';
import { deleteItemFromCart } from '../../../store/cart/actions/cart-delete-item-acions';
import classes from './DeleteCartButton.module.scss';

interface IProps {
  _id: string;
}

const DeleteCartButton = ({_id}: IProps) => {
  const dispatch = useDispatch();

  const deleteCartItemHandler = () => {
    dispatch(deleteItemFromCart(_id));
  }

  return (
    <button
      className={classes['delete-cart-item']}
      type='button'
      onClick={deleteCartItemHandler}
    />
  )
}

export default DeleteCartButton
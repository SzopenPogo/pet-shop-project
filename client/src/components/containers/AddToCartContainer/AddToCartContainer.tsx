import AddToCartButton from '../../buttons/AddToCartButton/AddToCartButton';
import classes from './AddToCartContainer.module.scss';

interface IProps {
  productId: string;
}

const AddToCartContainer = ({productId}: IProps) => {
  return (
    <div className={classes['cart-container']} >
      <AddToCartButton />
    </div>
  )
}

export default AddToCartContainer
import AddManyToCartContainer from '../AddManyToCartContainer/AddManyToCartContainer';
import classes from './ProductDetailsContainer.module.scss';

interface IProps {
  _id: string;
  title: string;
  price: number;
}

const ProductDetailsContainer = ({
  _id, 
  title, 
  price
}: IProps) => {

  return (
    <div className={classes['product-details']}>
      <h1 className={classes['product-title']}>{title}</h1>
      <div className={classes['product-cart-container']}>
        <span className={classes['product-price']}>{price} $</span>
        <AddManyToCartContainer _id={_id} />
      </div>
    </div>
  )
}

export default ProductDetailsContainer
import classes from './AddToCartBigButton.module.scss';

interface IProps {
  onClick: () => void;
}


const AddToCartBigButton = ({onClick}: IProps) => {
  return (
    <button
      type='button'
      className={classes['cart-button']}
      onClick={onClick}
    >
      Add to cart
    </button>
  )
}

export default AddToCartBigButton
import classes from './AddToCartButton.module.scss';

interface IProps {
  onClick: () => void;
}

const AddToCartButton = ({onClick}: IProps) => {
  return (
    <button
      className={classes['add-to-cart-button']}
      title='Add to cart'
      onClick={onClick}
    />
  )
}

export default AddToCartButton
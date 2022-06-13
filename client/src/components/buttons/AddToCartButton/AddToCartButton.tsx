import classes from './AddToCartButton.module.scss';

const AddToCartButton = () => {
  return (
    <button
      className={classes['add-to-cart-button']}
      title='Add to cart'
    />
  )
}

export default AddToCartButton
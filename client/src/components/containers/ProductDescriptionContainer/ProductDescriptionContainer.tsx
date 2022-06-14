import classes from './ProductDescriptionContainer.module.scss';

interface IProps {
  description: string;
}

const ProductDescriptionContainer = ({description}: IProps) => {
  return (
    <div className={classes['product-description']}>
      <h3 className={classes['product-description-title']}>Description</h3>
      <p className={classes['product-description-description']}>
        {description}
      </p>
    </div>
  )
}

export default ProductDescriptionContainer
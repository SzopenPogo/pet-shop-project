import ProductDescriptionContainer from '../../ProductDescriptionContainer/ProductDescriptionContainer';
import ProductDetailsContainer from '../../ProductDetailsContainer/ProductDetailsContainer';
import ProductItemImageContainer from '../../ProductItemImageContainer/ProductItemImageContainer';
import classes from './ProductPresentationContainer.module.scss';

interface IProps {
  _id: string;
  images: Array<string>;
  title: string;
  price: number;
  description: string;
}

const ProductPresentationContainer = ({
  _id, 
  images, 
  title, 
  price, 
  description
}: IProps) => {
  return (
    <div className={classes['product-presentation']}>
      {images && <ProductItemImageContainer images={images} title={title} />}
      <ProductDetailsContainer
        _id={_id}
        title={title}
        price={price}
      />
      <ProductDescriptionContainer description={description} />
    </div>
  )
}

export default ProductPresentationContainer
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
      <div className={classes['product-main-presentation']}>
        {images && <div className={classes['product-images-container']}>
          <ProductItemImageContainer images={images} title={title} />
        </div>}
        <ProductDetailsContainer
          _id={_id}
          title={title}
          price={price}
        />
      </div>
      <ProductDescriptionContainer description={description} />
    </div>
  )
}

export default ProductPresentationContainer
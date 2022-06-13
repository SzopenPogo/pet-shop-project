import classes from './ProductListItem.module.scss';
import { Link } from 'react-router-dom';
import { PRODUCT_ROUTE } from '../../../constants/routes';
import AddToCartContainer from '../../containers/AddToCartContainer/AddToCartContainer';
import { BACKEND_URL } from '../../../constants/backend';

interface IProps {
  _id: string;
  title: string;
  image: string;
  description: string;
  price: number;
}

const ProductListItem = ({_id, title, image, description, price}: IProps) => {

  const slicedDescription = description.slice(0, 70).trim();
  const isSlicedDescriptionShorter = slicedDescription.length < description.length;
  const renderDescription = `${slicedDescription}${isSlicedDescriptionShorter ? '...' : ''}`

  return (
    <li className={classes['product-item']}>
      <Link 
        to={`${PRODUCT_ROUTE}/${_id}`}
        className={classes['product-item-content']}
      >
        <img
          src={`${BACKEND_URL}/${image}`}
          alt={`${title}-img`}
          className={classes['content__product-image']}
        />
        <div className={classes['content__text-container']}>
          <h1 className={classes['text-container__product-title']}>
            {title}
          </h1>
          <span className={classes['text-container__product-description']}>
            {renderDescription}
          </span>
          <span className={classes['text-container__product-price']}>
            {price}$
          </span>
        </div>
      </Link>
      <AddToCartContainer productId={_id} />
    </li>
  )
}

export default ProductListItem
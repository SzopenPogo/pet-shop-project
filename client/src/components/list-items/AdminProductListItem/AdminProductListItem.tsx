import { IProduct } from '../../../interfaces/IProduct';
import ProductItemImageContainer from '../../containers/ProductItemImageContainer/ProductItemImageContainer';
import classes from './AdminProductListItem.module.scss';

interface IProps extends IProduct {
  index: number
}

const AdminProductListItem = ({
  _id,
  description,
  images,
  price,
  subcategoryId,
  title,
  index
}: IProps) => {
  return (
    <li className={classes['admin-product-item']}>
      {title}
      <ProductItemImageContainer images={images} title={title} />
    </li>
  )
}

export default AdminProductListItem
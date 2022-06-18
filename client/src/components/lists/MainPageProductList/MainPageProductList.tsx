import { IProduct } from '../../../interfaces/IProduct';
import ProductListItem from '../../list-items/ProductListItem/ProductListItem';
import classes from './MainPageProductList.module.scss';

interface IProps {
  products: Array<IProduct>;
}

const MainPageProductList = ({products}: IProps) => {
  const renderProducts = products.map(product => (
    <div className={classes['product-container']} key={product._id} >
      <ProductListItem
        _id={product._id}
        description={product.description}
        image={product.images[0]}
        price={product.price}
        title={product.title}
      />
    </div>
  ))

  return (
    <ul className={classes['product-list']}>
      {renderProducts}
    </ul>
  )
}

export default MainPageProductList
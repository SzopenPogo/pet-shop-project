import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import classes from './AdminProductList.module.scss';

const AdminProductList = () => {
  const {loading, error, data} = useSelector((state: RootState) => state.product.products);

  const renderProducts = data.map((product, index) => (
    <li key={product._id}>{product.title}</li>
  ))

  return (
    <ul className={classes['admin-product-list']}>
      {renderProducts}
    </ul>
  )
}

export default AdminProductList
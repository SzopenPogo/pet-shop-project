import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import AdminProductListItem from '../../list-items/AdminProductListItem/AdminProductListItem';
import classes from './AdminProductList.module.scss';

const AdminProductList = () => {
  const {loading, error, data} = useSelector((state: RootState) => state.product.products);
  
  const renderProducts = data.map((product, index) => (
    <AdminProductListItem
      _id={product._id}
      description={product.description}
      images={product.images}
      index={index}
      price={product.price}
      subcategoryId={product.subcategoryId}
      title={product.title}
      key={product._id}
    />
  ))

  return (
    <ul className={classes['admin-product-list']}>
      {data.length >= 0 && renderProducts}
      {data.length <= 0 && <h1>No products found</h1>}
    </ul>
  )
}

export default AdminProductList
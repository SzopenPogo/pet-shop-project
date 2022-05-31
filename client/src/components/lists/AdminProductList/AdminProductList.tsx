import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import AdminProductListItem from '../../list-items/AdminProductListItem/AdminProductListItem';
import Spinner from '../../spinners/Spinner/Spinner';
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
      {loading && <div className={classes['spinner-container']}>
          <Spinner size={'11rem'} borderSize={'.75rem'} color={'black'} />  
        </div>}
      {data.length >= 0 && renderProducts}
      {data.length <= 0 && <h1>No products found</h1>}
      {!loading && error && <h1>{error}</h1>}
    </ul>
  )
}

export default AdminProductList
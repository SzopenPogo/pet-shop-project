import ProductSubcategory from '../../Select/ProductSubcategory/ProductSubcategory';
import classes from './AdminProductFilterBar.module.scss';

const AdminProductFilterBar = () => {
  return (
    <div className={classes['admin-product-filter-bar']}>
      <ProductSubcategory />
    </div>
  )
}

export default AdminProductFilterBar
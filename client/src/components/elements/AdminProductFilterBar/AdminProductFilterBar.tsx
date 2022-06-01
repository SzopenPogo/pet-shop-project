import ProductSearchbar from '../../Searchbars/ProductSearchbar/ProductSearchbar';
import ProductSubcategory from '../../Select/ProductSubcategory/ProductSubcategory';
import classes from './AdminProductFilterBar.module.scss';

const AdminProductFilterBar = () => {
  return (
    <div className={classes['admin-product-filter-bar']}>
      <ProductSubcategory />
      <ProductSearchbar 
        isSearchProductWindow={true}
      />
    </div>
  )
}

export default AdminProductFilterBar
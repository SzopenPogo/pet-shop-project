import ProductSearchbar from '../../Searchbars/ProductSearchbar/ProductSearchbar';
import ProductSubcategory from '../../Select/ProductSubcategory/ProductSubcategory';
import ProductSortBySwitch from '../../Switches/ProductSortBySwitch/ProductSortBySwitch';
import classes from './AdminProductFilterBar.module.scss';

const AdminProductFilterBar = () => {

  

  return (
    <div className={classes['admin-product-filter-bar']}>
      <div className={classes['filter-bar-main-options-container']}>
        <div className={classes['filter-bar-searchbar']}>
        <ProductSearchbar 
          isSearchProductWindow={false}
        />
        </div>
        <ProductSubcategory />
      </div>
      <div className={classes['filter-bar-sort-container']}>
        <ProductSortBySwitch
          sortByTitle='price'
          sortByUrl='sortPrice'         
        />
        <ProductSortBySwitch
          sortByTitle='title'
          sortByUrl='sortTitle'         
        />
      </div>
    </div>
  )
}

export default AdminProductFilterBar
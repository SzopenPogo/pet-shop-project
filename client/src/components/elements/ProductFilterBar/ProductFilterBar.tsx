import classes from './ProductFilterBar.module.scss';
import ProductSortBySwitch from '../../Switches/ProductSortBySwitch/ProductSortBySwitch';


const ProductFilterBar = () => {
  return (
    <div className={classes['product-filter-bar']}>
      <h3>Filters</h3>
      <div className={classes['sort-container']}>
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

export default ProductFilterBar
import { Link } from 'react-router-dom';
import { BACKEND_PRODUCT_ROUTER, BACKEND_URL } from '../../../constants/backend';
import { PRODUCT_ROUTE } from '../../../constants/routes';
import { ISearchbarData } from '../../../interfaces/ISearchbar';
import Spinner from '../../spinners/Spinner/Spinner';
import classes from './SearchBarResultsList.module.scss';

interface IProps {
  searchbarData: ISearchbarData
}

const SearchBarproductsList = ({searchbarData}: IProps) => {
  const {loading, data} = searchbarData;

  const renderProducts = data.map(product => (
    <li key={product._id} className={classes['product-item-container']}>
      <Link to={`${PRODUCT_ROUTE}/${product._id}`} className={classes['product-item']}>
        <div 
          className={classes['product-item-image']}
          style={{backgroundImage: `url('${BACKEND_URL}/${product.images[0]}')`}}
         />
        <h3 className={classes['product-item-title']}>
          {product.title}
        </h3>
      </Link>
    </li>
  ));

  return (
    <ul className={classes['search-products']}>
      {!loading && renderProducts}
      {loading && <Spinner size={'2rem'} borderSize={'.35rem'} color={'gray'} />}
    </ul>
  )
}

export default SearchBarproductsList
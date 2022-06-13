import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { getProducts } from '../../../store/product/actions/product-get-actions';
import { setProductUrl } from '../../../store/product/actions/product-url-actions';
import ProductListItem from '../../list-items/ProductListItem/ProductListItem';
import Spinner from '../../spinners/Spinner/Spinner';
import classes from './ProductList.module.scss';

const ProductList = () => {
  const dispatch = useDispatch();

  const {productUrl, productUrlOptions} = useSelector((state: RootState) => state.product);
  const {loading, error, data} = useSelector((state: RootState) => state.product.products);
  const isMobile = useSelector((state: RootState) => state.clientWindow.isWindowMobile);

  const listInlineStyle = {
    gridTemplateRows: `repeat(${data.length / 4} , auto)`
  }
  
  useEffect(() => {
    dispatch(setProductUrl(productUrlOptions));
  }, [productUrlOptions, dispatch])

  useEffect(() => {
    if(productUrl) {
      dispatch(getProducts(productUrl));
    }
  }, [dispatch, productUrl])
  
  const renderProducts = data.map(product => (
    <ProductListItem
      key={product._id}
      _id={product._id}
      title={product.title}
      image={product.images[0]}
      description={product.description}
      price={product.price}
    />
  ));

  

  return (
    <ul className={classes['product-list']} style={isMobile ? {} : listInlineStyle} >
      {loading && <div className={classes['spinner-container']}>
          <Spinner size={'11rem'} borderSize={'.75rem'} color={'black'} />  
        </div>}
      {data.length >= 0 && renderProducts}
      {data.length <= 0 && <h1>No products found</h1>}
      {!loading && error && <h1>{error}</h1>}
    </ul>
  )
}

export default ProductList

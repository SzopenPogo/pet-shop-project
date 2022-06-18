import classes from './MainPageProductContainer.module.scss';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { getProducts } from '../../../store/product/actions/product-get-actions';
import { manageProductUrlAction, setProductUrl } from '../../../store/product/actions/product-url-actions';
import MainPageProductList from '../../lists/MainPageProductList/MainPageProductList';
import Spinner from '../../spinners/Spinner/Spinner';

const MainPageProductContainer = () => {
  const dispatch = useDispatch();

  const productUrl = useSelector((state: RootState) => state.product.productUrl);
  const productUrlOptions = useSelector((state: RootState) => state.product.productUrlOptions);
  const {loading, data} = useSelector((state: RootState) => state.product.products);
  const isMobile = useSelector((state: RootState) => state.clientWindow.isWindowMobile);

  useEffect(() => {
    const limit = isMobile ? 5 : 14;

    if(productUrlOptions.length === 0 || productUrlOptions.length > 1) {
      dispatch(manageProductUrlAction(productUrlOptions, `limit=${limit}`, true));
    }

    dispatch(setProductUrl(productUrlOptions))

    if(productUrl) {
      dispatch(getProducts(productUrl));
    }
  }, [dispatch, productUrl, productUrlOptions, isMobile])
  
  return (
    <section className={classes['products']}>
      {!loading && <MainPageProductList products={data} />}
      {loading && <Spinner size={'7rem'} borderSize={'.35rem'} color={'gray'} />}
    </section>
  )
}

export default MainPageProductContainer
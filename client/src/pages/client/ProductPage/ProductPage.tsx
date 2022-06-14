import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PathContainer from '../../../components/containers/PathContainer/PathContainer';
import ProductPresentationContainer from '../../../components/containers/productPageContainers/ProductPresentationContainer/ProductPresentationContainer';
import MainLayout from '../../../components/layout/MainLayout/MainLayout';
import Spinner from '../../../components/spinners/Spinner/Spinner';
import { PRODUCT_ROUTE, SUBCATEGORY_ROUTE } from '../../../constants/routes';
import { RootState } from '../../../store';
import { getProductById } from '../../../store/product/actions/product-get-by-id-actions';
import { getSubcategoryById } from '../../../store/subcategory/actions/subcategory-get-by-id-actions';
import { addToPath, resetPath } from '../../../store/ui/actions/path-actions';
import classes from './ProductPage.module.scss';

const ProductPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const productId = params.id;

  const path = useSelector((state: RootState) => state.ui.pathes);
  const {loading, error, data} = useSelector((state: RootState) => state.product.product);
  const subcategoryTitle = useSelector((state: RootState) => state.subcategory.subcategory.data.title);

  useEffect(() => {
    if(productId === data._id) {
      dispatch(resetPath());

      if(data.subcategoryId) {
        dispatch(getSubcategoryById(data.subcategoryId));

        dispatch(addToPath([{
          title: subcategoryTitle,
          route: `${SUBCATEGORY_ROUTE}/${data.subcategoryId}`
        }, {
          title: data.title,
          route: `${PRODUCT_ROUTE}/${productId}`
        }]));
      }
    }
  }, [data, dispatch, productId, subcategoryTitle]);

  useEffect(() => {
    if(productId) {
      dispatch(getProductById(productId));
    }
  }, [dispatch, productId])

  return (
    <MainLayout>
      <section className={classes['product']}>
        <PathContainer pathes={path} />
        {!loading && !error && <div className={classes['product-content']}>
          <ProductPresentationContainer
            _id={data._id}
            images={data.images}
            title={data.title}
            price={data.price}
            description={data.description}
          />
        </div>}
        {error && <h1>{error}</h1>}
        {loading && <Spinner size={'10rem'} borderSize={'.75rem'} color={'gray'} />}
      </section>
    </MainLayout>
  )
}

export default ProductPage
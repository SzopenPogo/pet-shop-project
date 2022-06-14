import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import PathContainer from '../../../components/containers/PathContainer/PathContainer';
import ProductFilterBar from '../../../components/elements/ProductFilterBar/ProductFilterBar';
import MainLayout from '../../../components/layout/MainLayout/MainLayout';
import ProductList from '../../../components/lists/ProductList/ProductList';
import Spinner from '../../../components/spinners/Spinner/Spinner';
import { SUBCATEGORY_ROUTE } from '../../../constants/routes';
import { RootState } from '../../../store';
import { manageProductUrlAction } from '../../../store/product/actions/product-url-actions';
import { getSubcategoryById } from '../../../store/subcategory/actions/subcategory-get-by-id-actions';
import { addToPath, resetPath } from '../../../store/ui/actions/path-actions';
import classes from './SubcategoryPage.module.scss';

const SubcategoryPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const subcategoryId = params.id;

  const {productUrlOptions} = useSelector((state: RootState) => state.product);
  const {loading, error, data} = useSelector((state: RootState) => state.subcategory.subcategory);
  const path = useSelector((state: RootState) => state.ui.pathes);

  useEffect(() => {
    dispatch(resetPath());
    dispatch(addToPath([{
      title: data.title,
      route: `${SUBCATEGORY_ROUTE}/${subcategoryId}`
    }]));
  }, [data.title, dispatch, subcategoryId])
  
  useEffect(() => {
    if(subcategoryId) {
      dispatch(getSubcategoryById(subcategoryId));
      dispatch(manageProductUrlAction(productUrlOptions, `subcategoryId=${subcategoryId}`))
    }
  }, [dispatch, subcategoryId])

  return (
    <MainLayout>
      <section className={classes['subcategory']}>
        <PathContainer pathes={path} />
        {!loading && !error && <div className={classes['subcategory-content']}>
          <ProductFilterBar />
          <ProductList />
        </div>}
        {error && <h1>{error}</h1>}
        {loading && <Spinner size={'10rem'} borderSize={'.75rem'} color={'gray'} />}
      </section>
    </MainLayout>
  )
}

export default SubcategoryPage
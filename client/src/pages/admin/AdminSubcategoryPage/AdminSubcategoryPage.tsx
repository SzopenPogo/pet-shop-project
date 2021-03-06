import classes from './AdminSubcategoryPage.module.scss';
import UserLayout from '../../../components/layout/UserLayout/UserLayout';
import InfoModal from '../../../components/modals/InfoModal/InfoModal';
import CreateSubcategoryContainer from '../../../components/containers/CreateSubcategoryContainer/CreateSubcategoryContainer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { useEffect } from 'react';
import { addInfoMessage } from '../../../store/ui/actions/info-items-actions';
import Spinner from '../../../components/spinners/Spinner/Spinner';
import AdminSubcategoryList from '../../../components/lists/AdminSubcategoryList/AdminSubcategoryList';
import { subcategoryGet } from '../../../store/subcategory/actions/subcategory-get-actions';
import AdminSubcategorySearchbar from '../../../components/elements/AdminSubcategorySearchbar/AdminSubcategorySearchbar';
import { categoriesFetch } from '../../../store/category/actions/category-get-actions';

const AdminSubcategoryPage = () => {
  const dispatch = useDispatch();

  const {loading, error} = useSelector((state: RootState) => state.subcategory.subcategories);
  const subcategoryUrl = useSelector((state: RootState) => state.subcategory.subcategoryUrl);
  const subcategoryLastUpdate = useSelector((state: RootState) => state.subcategory.subcategoryLastUpdate);

  useEffect(() => {
    if(error) {
      dispatch(addInfoMessage({
        message: error,
        isPositive: false,
        timeout: 1500
      }))
    }

    dispatch(subcategoryGet(subcategoryUrl));

  }, [error, dispatch, subcategoryUrl])

  useEffect(() => {
    dispatch(categoriesFetch());
  }, [dispatch, subcategoryLastUpdate])

  return (
    <UserLayout>
      <>
        <InfoModal />
        <section className={classes['admin-subcategory-page']}>
          <CreateSubcategoryContainer />
          {!loading &&
          <>
            <AdminSubcategorySearchbar />
            <AdminSubcategoryList />
          </>}
          {loading && <Spinner borderSize='.75rem' size='12rem' color='gray' />}
        </section>
      </>
    </UserLayout>
  )
}

export default AdminSubcategoryPage
import classes from './AdminSubcategoryPage.module.scss';
import UserLayout from '../../../components/layout/UserLayout/UserLayout';
import InfoModal from '../../../components/modals/InfoModal/InfoModal';
import CreateSubcategoryContainer from '../../../components/containers/CreateSubcategoryContainer/CreateSubcategoryContainer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { useEffect } from 'react';
import { addInfoMessage } from '../../../store/ui/actions/info-items-actions';
import Spinner from '../../../components/spinners/Spinner/Spinner';

const AdminSubcategoryPage = () => {
  const dispatch = useDispatch();
  const {loading, error} = useSelector((state: RootState) => state.subcategory.subcategories);
  
  useEffect(() => {
    if(error) {
      dispatch(addInfoMessage({
        message: error,
        isPositive: false,
        timeout: 1500
      }))
    }
  }, [error, dispatch])

  return (
    <UserLayout>
      <>
        <InfoModal />
        <section className={classes['admin-subcategory-page']}>
          <CreateSubcategoryContainer />
          {loading && <Spinner borderSize='.75rem' size='12rem' color='gray' />}
        </section>
      </>
    </UserLayout>
  )
}

export default AdminSubcategoryPage
import { useEffect, useState } from 'react';
import BigAdminButton from '../../buttons/BigAdminButton/BigAdminButton';
import classes from './AdminProductListContainer.module.scss';
import listIcon from '../../../images/icon/listGray.svg';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { getProducts } from '../../../store/product/actions/product-get-actions';
import AdminProductFilterBar from '../../elements/AdminProductFilterBar/AdminProductFilterBar';
import { setProductUrl } from '../../../store/product/actions/product-url-actions';
import AdminProductList from '../../lists/AdminProductList/AdminProductList';

const AdminProductListContainer = () => {
  const dispatch = useDispatch();

  const {productUrl, productUrlOptions} = useSelector((state: RootState) => state.product);

  const [isListActive, setIsListActive] = useState<boolean>(false);
  const [isButtonActive, setIsButtonActive] = useState<boolean>(true);

  const timeout = 150;

  useEffect(() => {
    dispatch(setProductUrl(productUrlOptions));
  }, [productUrlOptions, dispatch])

  useEffect(() => {
    if(isListActive && productUrl) {
      dispatch(getProducts(productUrl));
    }
  }, [isListActive, dispatch, productUrl])
  

  const setListActive = () => {
    setIsButtonActive(false)
    setTimeout(() => {
      setIsListActive(true);
    }, timeout)
  }


  return (
    <section className={classes['product-list-container']}>
      <BigAdminButton
        title='Products'
        subtitle='list of'
        activate={isButtonActive}
        timeout={timeout}
        backgroundImage={listIcon}
        onClick={setListActive}
      />
      {isListActive &&
        <div className={classes['product-list']}>
          <AdminProductFilterBar />
          <AdminProductList />
        </div>}
    </section>
  )
}

export default AdminProductListContainer
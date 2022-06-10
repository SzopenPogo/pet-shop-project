import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { manageProductUrlAction } from '../../../store/product/actions/product-url-actions';
import SearchInput from '../../inputs/SearchInput/SearchInput'

interface IProps {
  isSearchProductWindow: boolean
}

const ProductSearchbar = ({isSearchProductWindow}: IProps) => {
  const dispatch = useDispatch();

  const productUrlOptions = useSelector((state: RootState) => state.product.productUrlOptions);
  const [urlOption, setUrlOption] = useState<string>('');

  useEffect(() => {
    dispatch(manageProductUrlAction(productUrlOptions, urlOption));
  }, [dispatch, urlOption])
  
  
  const searchProductHandler = (value: string) => {
    setUrlOption(`productTitle=${value}`);
  }

  return (
    <SearchInput 
      title={'Find product by name'}
      searchTime={650}
      searchFunction={searchProductHandler}
    />
  )
}

export default ProductSearchbar
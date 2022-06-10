import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { manageProductUrlAction } from '../../../store/product/actions/product-url-actions';
import SortSwitchInput from '../../inputs/SortSwitchInput/SortSwitchInput'

interface IProps {
  sortByTitle: string;
  sortByUrl: string;
}

const ProductSortBySwitch = ({sortByTitle, sortByUrl}: IProps) => {
  const dispatch = useDispatch();
  
  const [isAscending, setIsAscending] = useState<boolean>(false);
  const productUrlOptions = useSelector((state: RootState) => state.product.productUrlOptions);

  const sortByPrice = () => {
    let option = '';
    if(isAscending) {
      option = `${sortByUrl}=desc`
    } else {
      option = `${sortByUrl}=asc`
    }

    dispatch(manageProductUrlAction(productUrlOptions, option));
  };

  const sortByPriceHandler = () => {
    setIsAscending(!isAscending);
    sortByPrice();
  }

  return (
    <SortSwitchInput 
      defaultStatus={isAscending}
      onChange={sortByPriceHandler}
      title={`Sort by ${sortByTitle}`}         
    />
  )
}

export default ProductSortBySwitch
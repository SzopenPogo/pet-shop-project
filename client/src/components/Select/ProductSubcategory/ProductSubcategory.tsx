import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store';
import { manageProductUrlAction } from '../../../store/product/actions/product-url-actions';
import SubcategorySelect from '../SubcategorySelect/SubcategorySelect'

const ProductSubcategory = () => {
  const dispatch = useDispatch();

  const productUrlOptions = useSelector((state: RootState) => state.product.productUrlOptions);

  const addOptionToProductUrl = (value: string) => {
    let option = '';
    if(value) {
      option = `subcategoryId=${value}`
    }
    dispatch(manageProductUrlAction(productUrlOptions, option));
  }
  return (
    <SubcategorySelect
      onChangeFunction={addOptionToProductUrl}
      isEmptySubategory={true}
    />
  )
}

export default ProductSubcategory
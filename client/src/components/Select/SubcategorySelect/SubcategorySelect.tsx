import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ISelectOption } from '../../../interfaces/ISelectOption';
import { RootState } from '../../../store';
import { categoryGetById } from '../../../store/category/actions/category-get-by-id-actions';
import { findCategoryId } from '../../../utils/searching/findCategoryId';
import SelectInput from '../../inputs/SelectInput/SelectInput';
import Spinner from '../../spinners/Spinner/Spinner';
import CategorySelect from '../CategorySelect/CategorySelect';
import classes from './SubcategorySelect.module.scss';
//TODO reset subcategory value if !isCategoryValueChanged 
interface IProps {
  selectedValue?: string;
  onChangeFunction?: (value: string) => void;
  title?: string;
  isEmptySubategory?: boolean;
}

const SubcategorySelect =  React.forwardRef<HTMLSelectElement, IProps>(({
  selectedValue,
  onChangeFunction,
  title,
  isEmptySubategory
  }, ref) => {

  const dispatch = useDispatch();
  const category = useSelector((state: RootState) => state.category.category);
  const {loading, data} = category;
  const {subcategoryRef} = data;
  
  const categories = useSelector((state: RootState) => state.category.categories.data);
  const selectedCategoryId = selectedValue ? findCategoryId(selectedValue, categories) : '';
  const selectedCategoryIndex = categories.findIndex(category => category._id === selectedCategoryId);
  const selectedCategory = categories[selectedCategoryIndex];

  const [isSubcategorySelect, setIsSubcategorySelect] = useState<boolean>(!!selectedCategoryId);
  const [isCategoryValueChanged, setIsCategoryValueChanged] = useState<boolean>(false);

  const subcategoriesOptions = [] as Array<ISelectOption>;

  const categoryChangeHandler = (value: string) => {
    if(!value) {
      return setIsSubcategorySelect(false);
    }

    dispatch(categoryGetById(value));
    setIsSubcategorySelect(true);
    setIsCategoryValueChanged(true);
  }

  if(isEmptySubategory) {
    subcategoriesOptions.push({
      title: '-- Select --',
      value: ''
    })
  }

  // Render default subcategories when is no selectedValue or if is
  // selected value but user change default category 
  if(subcategoryRef) {
    if(!selectedValue || isCategoryValueChanged) {
      subcategoryRef.map((subcategory) => (
        subcategoriesOptions.push({
          title: subcategory.title,
          value: subcategory._id
        })
      ));
    }
  }

  // Render specyfic subcategories for selected category when
  // user has not changed category before
  if(selectedCategory  && !isCategoryValueChanged) {
    if(selectedValue) {
      selectedCategory.subcategoryRef.map((subcategory) => (
        subcategoriesOptions.push({
          title: subcategory.title,
          value: subcategory._id
        })
      ));
    }
  }

  const selectInputTitle = title ? title : 'Subcategory'
  return (
    <div className={classes.container}>
      <CategorySelect
          onChangeFunction={categoryChangeHandler}
          isEmptyCategory={true}
          selectedValue={selectedCategoryId}
      />
      {isSubcategorySelect && !loading && <SelectInput
        ref={ref}
        isLabel={true}
        isRequired={true}
        title={selectInputTitle}
        options={subcategoriesOptions}
        selectedOptionValue={selectedValue}
        onChangeFunction={onChangeFunction}
      />}
      {!isSubcategorySelect && loading && 
        <Spinner borderSize='.25rem' color='gray' size='1rem' />}
    </div>
  )
})

export default SubcategorySelect
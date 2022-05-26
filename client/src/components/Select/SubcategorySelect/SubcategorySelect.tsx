import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ISelectOption } from '../../../interfaces/ISelectOption';
import { RootState } from '../../../store';
import { categoryGetById } from '../../../store/category/actions/category-get-by-id-actions';
import SelectInput from '../../inputs/SelectInput/SelectInput';
import Spinner from '../../spinners/Spinner/Spinner';
import CategorySelect from '../CategorySelect/CategorySelect';
import classes from './SubcategorySelect.module.scss';

interface IProps {
  selectedValue?: string;
  onChangeFunction?: (value: string) => void;
  title?: string;
}

const SubcategorySelect =  React.forwardRef<HTMLSelectElement, IProps>(({
  selectedValue,
  onChangeFunction,
  title
  }, ref) => {

  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.category.category);
  const {loading, data} = categories;
  const {subcategoryRef} = data;

  const [isSubcategorySelect, setIsSubcategorySelect] = useState<boolean>(false);

  const subcategoriesOptions = [] as Array<ISelectOption>;

  const categoryChangeHandler = (value: string) => {
    if(!value) {
      return setIsSubcategorySelect(false);
    }

    dispatch(categoryGetById(value));
    setIsSubcategorySelect(true);
  }

  if(subcategoryRef) {
    subcategoryRef.map((subcategory) => (
      subcategoriesOptions.push({
        title: subcategory.title,
        value: subcategory._id
      })
    ));
  }

  const selectInputTitle = title ? title : 'Subcategory'
  return (
    <div className={classes.container}>
      <CategorySelect
          onChangeFunction={categoryChangeHandler}
          isEmptyCategory={true}
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
import React from 'react'
import { useSelector } from 'react-redux';
import { ISelectOption } from '../../../interfaces/ISelectOption';
import { RootState } from '../../../store';
import SelectInput from '../../inputs/SelectInput/SelectInput';

interface IProps {
  selectedValue?: string;
  onChangeFunction?: (value: string) => void;
  title?: string;
  isEmptyCategory?: boolean;
}

const CategorySelect = React.forwardRef<HTMLSelectElement, IProps>(({
  selectedValue,
  onChangeFunction,
  title,
  isEmptyCategory
  }, ref) => {
  const categories = useSelector((state: RootState) => state.category.categories.data);

  const categoriesOptions = [] as Array<ISelectOption>;

  if(isEmptyCategory) {
    categoriesOptions.push({
      title: '-- All --',
      value: ''
    })
  }
  
  categories.map((category) => (
    categoriesOptions.push({
      title: category.title,
      value: category._id
    })
  ));

  const selectInputTitle = title ? title : 'Category'

  return (
    <SelectInput
      ref={ref}
      isLabel={true}
      isRequired={true}
      title={selectInputTitle}
      options={categoriesOptions}
      selectedOptionValue={selectedValue}
      onChangeFunction={onChangeFunction}
    />
  )
})

export default CategorySelect
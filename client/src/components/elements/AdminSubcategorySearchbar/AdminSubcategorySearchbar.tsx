import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { selectSubcategory } from '../../../store/subcategory/actions/subcategory-select-actions';
import { setSubcategoryUrl } from '../../../store/subcategory/actions/subcategory-url-actions';
import SubcategorySelect from '../../Select/SubcategorySelect/SubcategorySelect';
import classes from './AdminSubcategorySearchbar.module.scss';

const AdminSubcategorySearchbar = () => {
  const dispatch = useDispatch();

  const categorySelectRef = useRef<HTMLSelectElement>(null);
  const selectedSubcategoryId = useSelector((state: RootState) => state.subcategory.selectedSubcategoryId);

  const changeSubcategoryUrlHandler = () => {
    const selectedCategoryValue = categorySelectRef.current!.value;
    dispatch(setSubcategoryUrl(selectedCategoryValue));
    dispatch(selectSubcategory(selectedCategoryValue));
  }

  return (
    <div className={classes['subcategory-searchbar-container']}>
      <h2>Find subcategory by:</h2>
      <SubcategorySelect
        ref={categorySelectRef}
        onChangeFunction={changeSubcategoryUrlHandler}
        selectedValue={selectedSubcategoryId}
        title='Category name'
        isEmptyCategory={true}
      />
    </div>
  )
}

export default AdminSubcategorySearchbar
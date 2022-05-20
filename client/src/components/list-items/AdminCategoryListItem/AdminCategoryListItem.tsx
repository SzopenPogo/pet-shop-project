import classes from './AdminCategoryListItem.module.scss';
import TextInput from '../../inputs/TextInput/TextInput';
import EditButton from '../../buttons/EditButton/EditButton';
import { useRef, useState } from 'react';
import MainButton from '../../buttons/MainButton/MainButton';
import DeleteButton from '../../buttons/DeleteButton/DeleteButton';
import { useDispatch, useSelector } from 'react-redux';
import { adminCategoryEdit } from '../../../store/category/actions/category-edit-actions';
import { RootState } from '../../../store';
import { selectCategory } from '../../../store/category/actions/category-select-actions';
import MainModal from '../../modals/MainModal/MainModal';
import { adminCategoryDelete } from '../../../store/category/actions/category-delete-actions';

interface IProps {
  index: number;
  title: string;
  _id: string;
}

const AdminCategoryListItem = ({index, title, _id}: IProps) => {
  const dispatch = useDispatch();

  const titleInputRef = useRef<HTMLInputElement>(null);

  const token = useSelector((state: RootState) => state.user.token);
  const selectedCategory = useSelector((state: RootState) => state.category.selectedCategory);
  const {_id: selectedCategoryId, index: selectedCategoryIndex} = selectedCategory;

  const [isReadonly , setIsReadonly] = useState<boolean>(true);
  const [isDeleteWindow , setIsDeleteWindow] = useState<boolean>(false);

  const toggleCategoryEdit = () => {
    setIsReadonly(!isReadonly);
  }

  const categoryEditDataHandler = (event: React.FormEvent) => {
    event.preventDefault();
    
    const titleInputValue = titleInputRef.current!.value;

    dispatch(adminCategoryEdit(token, index, _id, titleInputValue));
  }

  const deleteCategoryHandler = () => {
    toggleDeleteWindow();
    
    dispatch(adminCategoryDelete(token, selectedCategoryIndex, selectedCategoryId));
  }

  const categorySelectToDeleteHandler = () => {
    dispatch(selectCategory(_id, index));
    toggleDeleteWindow();
  }

  const toggleDeleteWindow = () => {
    setIsDeleteWindow(!isDeleteWindow);
  }

  const categoryItemClass = isReadonly 
    ? `${classes['category-item']}`
    : `${classes['category-item']} ${classes['category-item--edit']}`;
  return (
    <>
      <li className={categoryItemClass}>
        <span>ID: {_id}</span>
        <form className={classes['category-edit-data-container']} onSubmit={categoryEditDataHandler}>
          <TextInput 
            ref={titleInputRef}
            isLabel={true}
            isReadonly={isReadonly}
            isRequired={true}
            title='Category name'
            value={title}
          />
          {!isReadonly && <MainButton isSubmit={true} title='Change' />}
        </form>
        <div className={classes['category-manage-buttons']}>
          <DeleteButton onClick={categorySelectToDeleteHandler} />
          <EditButton isActive={isReadonly} onClick={toggleCategoryEdit} />
        </div>
      </li>
      <MainModal 
        activate={isDeleteWindow}
        timeout={300}
        title={`Delete "${title}"`}
        closeFunction={toggleDeleteWindow}
      >
        <>
          <h2 style={{margin: '.5rem 0'}}>
            Are you sure you want to delete this category?
          </h2>
          <span style={{marginBottom: '1rem'}}>ID: {_id}</span>
          <MainButton
            isSubmit={false}
            title='Delete'
            onClick={deleteCategoryHandler}
          />
        </>
      </MainModal>
    </>
  )
}

export default AdminCategoryListItem
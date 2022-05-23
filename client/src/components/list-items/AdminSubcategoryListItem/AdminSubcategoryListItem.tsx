import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ISubcategory } from '../../../interfaces/ISubcategory';
import { RootState } from '../../../store';
import { adminDeleteSubcategory } from '../../../store/subcategory/actions/subcategory-delete-actions';
import { selectSubcategory } from '../../../store/subcategory/actions/subcategory-select-actions';
import { addInfoMessage } from '../../../store/ui/actions/info-items-actions';
import DeleteButton from '../../buttons/DeleteButton/DeleteButton';
import EditButton from '../../buttons/EditButton/EditButton';
import MainButton from '../../buttons/MainButton/MainButton';
import SubcategoryEditForm from '../../forms/SubcategoryEditForm/SubcategoryEditForm';
import MainModal from '../../modals/MainModal/MainModal';
import classes from './AdminSubcategoryListItem.module.scss';

interface IProps extends ISubcategory {
  index: number;
}

const AdminSubcategoryListItem = ({
  index,
  _id,
  title,
  imageUrl,
  categoryId
  }: IProps) => {
  const dispatch = useDispatch();

  const selectedSubcategoryId = useSelector((state: RootState) => state.subcategory.selectedSubcategoryId);
  const token = useSelector((state: RootState) => state.user.token);

  const [isReadonly , setIsReadonly] = useState<boolean>(true);
  const [isDeleteWindow , setIsDeleteWindow] = useState<boolean>(false);

  const toggleSubcategoryEdit = () => {
    setIsReadonly(!isReadonly);
  }

  const toggleDeleteWindow = () => {
    setIsDeleteWindow(!isDeleteWindow);
  }

  
  const subcategorySelectToDeleteHandler = () => {
    dispatch(selectSubcategory(_id));
    toggleDeleteWindow();
  }

  const deleteSubategoryHandler = () => {
    dispatch(adminDeleteSubcategory(token, index, selectedSubcategoryId));
    dispatch(addInfoMessage({
      message: 'Subcategory deleted!',
      isPositive: true,
      timeout: 1500
    }))
    toggleDeleteWindow();
  }

  const subcategoryItemClass = isReadonly 
  ? `${classes['subcategory-item']}`
  : `${classes['subcategory-item']} ${classes['subcategory-item--edit']}`;

  return (
    <>
      <li className={subcategoryItemClass}>
        <span>ID: {_id}</span>
        <SubcategoryEditForm
          _id={_id}
          categoryId={categoryId}
          imageUrl={imageUrl}
          index={index}
          isReadonly={isReadonly}
          title={title}
          toggleFunction={toggleSubcategoryEdit}
        />
        <div className={classes['subcategory-manage-buttons']}>
            <DeleteButton onClick={subcategorySelectToDeleteHandler} />
            <EditButton isActive={isReadonly} onClick={toggleSubcategoryEdit} />
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
            onClick={deleteSubategoryHandler}
          />
        </>
      </MainModal>
    </>
  )
}

export default AdminSubcategoryListItem
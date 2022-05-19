import classes from './AdminCategoryListItem.module.scss';
import TextInput from '../../inputs/TextInput/TextInput';
import EditButton from '../../buttons/EditButton/EditButton';
import { useState } from 'react';
import MainButton from '../../buttons/MainButton/MainButton';
import DeleteButton from '../../buttons/DeleteButton/DeleteButton';

interface IProps {
  title: string;
  _id: string;
}

const AdminCategoryListItem = ({title, _id}: IProps) => {
  const [isReadonly , setIsReadonly] = useState<boolean>(true);

  const toggleCategoryEdit = () => {
    setIsReadonly(!isReadonly);
  }

  const categoryEditDataHandler = (event: React.FormEvent) => {
    //event.preventDefault();
  }

  const categoryDeleteHandler = () => {

  }

  const categoryItemClass = isReadonly 
    ? `${classes['category-item']}`
    : `${classes['category-item']} ${classes['category-item--edit']}`;
  return (
    <li className={categoryItemClass}>
      <span>ID: {_id}</span>
      <form className={classes['category-edit-data-container']} onSubmit={categoryEditDataHandler}>
        <TextInput 
          isLabel={true}
          isReadonly={isReadonly}
          isRequired={true}
          title='Category name'
          value={title}
        />
        {!isReadonly && <MainButton isSubmit={true} title='Change' />}
      </form>
      <div className={classes['category-manage-buttons']}>
        <DeleteButton onClick={categoryDeleteHandler} />
        <EditButton isActive={isReadonly} onClick={toggleCategoryEdit} />
      </div>
    </li>
  )
}

export default AdminCategoryListItem
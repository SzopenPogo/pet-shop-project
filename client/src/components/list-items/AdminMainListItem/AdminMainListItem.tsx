import { ReactChild, useState } from 'react'
import classes from './AdminMainListItem.module.scss'
import DeleteModal from '../../modals/DeleteModal/DeleteModal'
import DeleteButton from '../../buttons/DeleteButton/DeleteButton'
import EditButton from '../../buttons/EditButton/EditButton'
import { addInfoMessage } from '../../../store/ui/actions/info-items-actions'
import { useDispatch } from 'react-redux'

interface IProps {
  _id: string;
  title: string;
  isReadonly: boolean;
  selectItemToDelete: () => void;
  deleteItem: () => void;
  toggleItemEdit: () => void;
  children: ReactChild;
}

const AdminMainListItem = ({
  _id,
  title,
  isReadonly,
  selectItemToDelete,
  deleteItem,
  toggleItemEdit,
  children
}: IProps) => {
  const dispatch = useDispatch();

  const [isDeleteWindow , setIsDeleteWindow] = useState<boolean>(false);

  const selectItemToDeleteHandler = () => {
    selectItemToDelete();
    toggleDeleteWindow();
  }

  const toggleDeleteWindow = () => {
    setIsDeleteWindow(!isDeleteWindow);
  }

  const deleteItemHandler = () => {
    deleteItem();
    dispatch(addInfoMessage({
      message: `${title} deleted`,
      isPositive: true,
      timeout: 1500
    }))
    toggleDeleteWindow();
  }

  const mainListItemClass = isReadonly 
  ? `${classes['admin-list-item']}`
  : `${classes['admin-list-item']} ${classes['admin-list-item--edit']}`;

  return (
    <>
      <li className={mainListItemClass}>
        {children}
        <div className={classes['manage-buttons']}>
          <DeleteButton onClick={selectItemToDeleteHandler} />
          <EditButton isActive={isReadonly} onClick={toggleItemEdit} />
        </div>      
      </li>
      <DeleteModal
        _id={_id}
        title={title}
        isDeleteWindow={isDeleteWindow}
        closeWindow={toggleDeleteWindow}
        deleteHandler={deleteItemHandler}
      />
    </>
  )
}

export default AdminMainListItem
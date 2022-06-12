import { ReactChild, useState } from 'react'
import classes from './AdminMainListItem.module.scss'
import DeleteModal from '../../modals/DeleteModal/DeleteModal'
import DeleteButton from '../../buttons/DeleteButton/DeleteButton'
import EditButton from '../../buttons/EditButton/EditButton'
import { addInfoMessage } from '../../../store/ui/actions/info-items-actions'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store'

interface IProps {
  _id: string;
  title: string;
  isReadonly: boolean;
  selectItemToDelete: () => void;
  deleteItem: () => void;
  toggleItemEdit: () => void;
  children: ReactChild;
  pcWidth: string;
}

const AdminMainListItem = ({
  _id,
  title,
  isReadonly,
  selectItemToDelete,
  deleteItem,
  toggleItemEdit,
  children,
  pcWidth
}: IProps) => {
  const dispatch = useDispatch();

  const isMobile = useSelector((state: RootState) => state.clientWindow.isWindowMobile);

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

  const mainListInlineStyle = !isMobile ? {width: pcWidth} : {};

  const mainListItemClass = isReadonly 
  ? `${classes['admin-list-item']}`
  : `${classes['admin-list-item']} ${classes['admin-list-item--edit']}`;

  return (
    <>
      <li className={mainListItemClass} style={mainListInlineStyle}>
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
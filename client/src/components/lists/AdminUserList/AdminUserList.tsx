import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { adminToggleUserSatus } from '../../../store/admin/actions/admin-toggle-user-status';
import EditButton from '../../buttons/EditButton/EditButton';
import MoreDetailsButton from '../../buttons/MoreDetailsButton/MoreDetailsButton';
import EmailInput from '../../inputs/EmailInput/EmailInput';
import SwitchInput from '../../inputs/SwitchInput/SwitchInput';
import AdminUserListItem from '../../list-items/AdminUserListItem/AdminUserListItem';
import BooleanDotListItem from '../../list-items/BooleanDotListItem/StatusDotListItem';
import classes from './AdminUserList.module.scss';

interface IProps {
  _id: string;
  email: string;
  isActive: boolean;
  isAdmin: boolean;
  adminNote: string;
}

const AdminUserList = ({_id, email, isActive, isAdmin, adminNote}: IProps) => {
  const dispatch = useDispatch();

  const token = useSelector((state: RootState) => state.user.token);

  const [isReadonly, setIsReadonly] = useState<boolean>(true);
  const [isMoreDetails, setIsMoreDetails] = useState<boolean>(false);
  const [moreDetailsButtonDirection, setMoreDetailsButtonDirection] = useState<string>('bottom');

  const listClass = isReadonly 
  ? `${classes['user-list']}` 
  : `${classes['user-list']} ${classes['user-list__edit']}`

  const toggleUserStatus = () => {
    setIsReadonly(!isReadonly);

    if(!isMoreDetails) {
      toggleMoreDetails();
    }
  }

  const toggleMoreDetails = () => {
    setIsMoreDetails(!isMoreDetails);

    if(isMoreDetails ) {
      setMoreDetailsButtonDirection('bottom');
    } else {
      setMoreDetailsButtonDirection('top');
    }


  }

  const toggleUserIsActive = () => {
    const adminNote = 'kekekew';
    dispatch(adminToggleUserSatus(isActive, token, _id, email, adminNote));
  }

  return (
    <ul className={listClass}>
      <AdminUserListItem title='ID' data={_id} />
      <EmailInput 
        isReadonly={isReadonly}
        title='Email'
        isValid={true}
        defaultValue={email}
      />
      
      {isMoreDetails &&
      <>
        <SwitchInput status={isActive} isReadony={false} toggleFunction={toggleUserIsActive} />
        <BooleanDotListItem title='Admin' status={isAdmin} />
        <span>{adminNote}</span>
      </>
      }
      <MoreDetailsButton direction={moreDetailsButtonDirection} onClick={toggleMoreDetails} />
      <div className={classes['edit-button-container']}>
        <EditButton isActive={isReadonly} onClick={toggleUserStatus} />
      </div>
    </ul>
  )
}

export default AdminUserList
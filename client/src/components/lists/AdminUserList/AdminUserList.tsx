import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { AdminEditUser } from '../../../store/admin/actions/admin-edit-user';
import { adminToggleUserSatus } from '../../../store/admin/actions/admin-toggle-user-status';
import { addInfoMessage } from '../../../store/ui/actions/info-items-actions';
import EditButton from '../../buttons/EditButton/EditButton';
import MainButton from '../../buttons/MainButton/MainButton';
import MoreDetailsButton from '../../buttons/MoreDetailsButton/MoreDetailsButton';
import EmailInput from '../../inputs/EmailInput/EmailInput';
import SwitchInput from '../../inputs/SwitchInput/SwitchInput';
import TextAreaInput from '../../inputs/TextAreaInput/TextAreaInput';
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

  const emailInputRef = useRef<HTMLInputElement>(null);
  const adminNoteInputRef = useRef<HTMLTextAreaElement>(null);

  const token = useSelector((state: RootState) => state.user.token);
  const adminGetUsersUrl = useSelector((state: RootState) => state.admin.getUsersUrl);

  const [isReadonly, setIsReadonly] = useState<boolean>(true);
  const [isMoreDetails, setIsMoreDetails] = useState<boolean>(false);
  const [moreDetailsButtonDirection, setMoreDetailsButtonDirection] = useState<string>('bottom');

  const listClass = isReadonly 
  ? `${classes['user-list']}` 
  : `${classes['user-list']} ${classes['user-list__edit']}`

  const toggleUserReadonly = () => {
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

    if(isMoreDetails && !isReadonly) {
      setIsReadonly(true);
    }
  }

  const toggleUserIsActive = () => {
    const adminNoteValue = adminNoteInputRef.current!.value;

    if(!adminNoteValue) {
      
      return dispatch(addInfoMessage({
        message: 'Admin note is required', 
        timeout: 1500, 
        isPositive: false
      }));
    }

    dispatch(adminToggleUserSatus(isActive, token, adminGetUsersUrl, _id, email, adminNoteValue));
  }

  const submitEditUserDataHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const emailValue = emailInputRef.current!.value;
    const adminNoteValue = adminNoteInputRef.current!.value;
    
    dispatch(AdminEditUser(token, adminGetUsersUrl, _id, emailValue, adminNoteValue));

    toggleUserReadonly();
    toggleMoreDetails();
  }

  return (
    <ul className={listClass}>
      <AdminUserListItem title='ID' data={_id} />
      <form onSubmit={submitEditUserDataHandler}>
        <EmailInput
          ref={emailInputRef}
          isReadonly={isReadonly}
          title='Email'
          isValid={true}
          defaultValue={email}
        />

        {isMoreDetails &&
        <>
          <div className={classes['account-status-container']}>
            <label>Account status:</label>
            <SwitchInput status={isActive} isReadony={isReadonly} toggleFunction={toggleUserIsActive} />
          </div>
          <BooleanDotListItem title='Is Admin' status={isAdmin} />
          <TextAreaInput
            ref={adminNoteInputRef}
            isLabel={true} 
            isReadonly={isReadonly} 
            title='Admin note' 
            value={adminNote}
            maxLength={500}
          />
          {!isReadonly && <MainButton isSubmit={true} title='Change' />}
        </>
        }
      </form>
      <MoreDetailsButton direction={moreDetailsButtonDirection} onClick={toggleMoreDetails} />
      <div className={classes['edit-button-container']}>
        <EditButton isActive={isReadonly} onClick={toggleUserReadonly} />
      </div>
    </ul>
  )
}

export default AdminUserList
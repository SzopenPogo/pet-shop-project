import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { adminBanUser } from '../../../store/admin/actions/admin-ban-user';
import { adminUnbanUser } from '../../../store/admin/actions/admin-unban-user';
import { addInfoMessage } from '../../../store/ui/actions/info-items-actions';
import EditButton from '../../buttons/EditButton/EditButton';
import EmailInput from '../../inputs/EmailInput/EmailInput';
import SwitchInput from '../../inputs/SwitchInput/SwitchInput';

interface IProps {
  _id: string;
  email: string;
  isActive: boolean;
  isAdmin: boolean;
  adminNote: string;
}

const AdminUserDataListItem = ({_id, email, isActive, isAdmin, adminNote}: IProps) => {
  const dispatch = useDispatch();

  const adminData = useSelector((state: RootState) => state.user);
  const {token, data} = adminData;

  const [isReadonly, setIsReadonly] = useState<boolean>(true);

  const toggleUserStatus = () => {
    setIsReadonly(!isReadonly);
  }

  const toggleUserIsActive = () => {

    if(isActive) {
      const adminNote = 'kekekew';
      dispatch(adminBanUser(token, _id, adminNote));
      dispatch(addInfoMessage({message: 'User banned!', timeout: 1500, isPositive: false}));

      //Create a new action "toggleUserStatus" that contains, ban, unban, get all users, info message
    } else {
      dispatch(adminUnbanUser(token, _id));
      dispatch(addInfoMessage({message: 'User unbanned!', timeout: 1500, isPositive: true}));
    }
  }

  return (
    <li>
      <span>{_id}</span>
      <EmailInput 
        isReadonly={isReadonly}
        title='Email'
        isValid={true}
        defaultValue={email}
      />
      <SwitchInput status={isActive} isReadony={false} toggleFunction={toggleUserIsActive} />
      <span>isAdmin{isAdmin.toString()}</span>
      <span>{adminNote}</span>
      <EditButton isActive={isReadonly} onClick={toggleUserStatus} />
    </li>
  )
}

export default AdminUserDataListItem
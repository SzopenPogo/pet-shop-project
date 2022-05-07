import React, { useState } from 'react'
import EditButton from '../../buttons/EditButton/EditButton';
import EmailInput from '../../inputs/EmailInput/EmailInput';

interface IProps {
  _id: string;
  email: string;
  isActive: boolean;
  isAdmin: boolean;
  adminNote: string;
}

const AdminUserDataListItem = ({_id, email, isActive, isAdmin, adminNote}: IProps) => {
  const [isReadonly, setIsReadonly] = useState<boolean>(true);

  const toggleUserStatus = () => {
    setIsReadonly(!isReadonly);
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
      <span>{isActive}</span>
      <span>{isAdmin}</span>
      <span>{adminNote}</span>
      <EditButton isActive={isReadonly} onClick={toggleUserStatus} />
    </li>
  )
}

export default AdminUserDataListItem
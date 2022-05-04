import { SyntheticEvent, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { addInfoMessage } from '../../../store/ui/actions/info-items-actions';
import { editUserData } from '../../../store/user/actions/user-edit-data-action';
import EditButton from '../../buttons/EditButton/EditButton';
import MainButton from '../../buttons/MainButton/MainButton';
import EmailInput from '../../inputs/EmailInput/EmailInput';
import PasswordInput from '../../inputs/PasswordInput/PasswordInput';
import classes from './UserDataEditForm.module.scss';

const UserDataEditForm = () => {
  const dispatch = useDispatch();

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const currentPasswordInputRef = useRef<HTMLInputElement>(null);

  const currentEmail = useSelector((state: RootState) =>  state.user.data.email);
  const token = useSelector((state: RootState) => state.user.token);

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const toggleFormStatus = () => {
    setIsEdit(!isEdit);
  }

  const submitUserDataEditHandler = (event: SyntheticEvent) => {
    event.preventDefault();

    const emailValue = emailInputRef.current!.value;
    const passwordValue = passwordInputRef.current!.value;
    const currentPasswordValue = currentPasswordInputRef.current!.value;

    dispatch(editUserData(token, emailValue, passwordValue, currentPasswordValue));

    toggleFormStatus();
    dispatch(addInfoMessage({message: 'Data Edited!', timeout: 1500, isPositive: true}));
  }

  return (
    <form onSubmit={submitUserDataEditHandler} className={classes['edit-data-form']}>
      <div className={classes['edit-button-container']}>
        <EditButton isActive={true} onClick={toggleFormStatus} />
      </div>


      <EmailInput 
        ref={emailInputRef}
        title='Edit email:'
        isValid={true}
        isReadonly={!isEdit}
        defaultValue={currentEmail}
        isLabel={true}
      />
      <PasswordInput 
        ref={passwordInputRef} 
        title='Edit password:' 
        isValid={true} 
        isReadonly={!isEdit}
        defaultValue=''
        isLabel={true}
      />
      {isEdit && 
        <div className={classes['active-form-container']}>
          <PasswordInput 
            ref={currentPasswordInputRef} 
            title='Current password' 
            isValid={true} 
            isReadonly={!isEdit}
            defaultValue=''
            isLabel={true}
          />
          <div className={classes['active-form__button']}>
            <MainButton isSubmit={true} title='Edit data' />
          </div>
        </div>
      }
    </form>
  )
}

export default UserDataEditForm
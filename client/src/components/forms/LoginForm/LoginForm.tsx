import { SyntheticEvent, useRef } from 'react'
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../store/user/user-actions';
import MainButton from '../../buttons/MainButton/MainButton';
import EmailInput from '../../inputs/EmailInput/EmailInput';
import PasswordInput from '../../inputs/PasswordInput/PasswordInput';
import classes from './LoginForm.module.scss';

const LoginForm = () => {
  const dispatch = useDispatch();
  
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const onSubmitHandler = (event: SyntheticEvent) => {
    event.preventDefault();

    const emailValue = emailInputRef.current!.value;
    const passwordValue = passwordInputRef.current!.value;

    dispatch(loginUser(emailValue, passwordValue));
  }
  
  return (
    <form className={classes['login-form']} onSubmit={onSubmitHandler}>
      <h1>Sign in</h1>
      <EmailInput ref={emailInputRef} title='email' />
      <PasswordInput ref={passwordInputRef} title='password' />
      <div className={classes['button-container']}>
        <MainButton title='Sign in' />
      </div>
    </form>
  )
}

export default LoginForm
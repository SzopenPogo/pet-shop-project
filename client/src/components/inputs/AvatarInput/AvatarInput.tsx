import Cookies from 'js-cookie';
import { SyntheticEvent, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { USER_TOKEN_COOKIE_NAME } from '../../../constants/user';
import { editUserAvatar } from '../../../store/user/actions/user-avatar-upload';
import classes from './AvatarInput.module.scss';

const AvatarInput = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const submitEditAvatar = (event: SyntheticEvent) => {
    event.preventDefault();

    const fileData = fileInputRef.current!.files![0];
    if (fileData) {
      dispatch(editUserAvatar(Cookies.get(USER_TOKEN_COOKIE_NAME)!, fileData));
    }
  }
  
  return (
    <form className={classes.wrapper} title="Upload a new avatar">
      <input ref={fileInputRef} type="file" name="myfile" onChange={submitEditAvatar} />
    </form>
  )
}

export default AvatarInput
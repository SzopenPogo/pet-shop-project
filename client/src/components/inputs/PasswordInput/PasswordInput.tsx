import React, { useState } from 'react'
import classes from './PasswordInput.module.scss';

interface IProps {
  title: string;
  isValid: boolean;
}

const PasswordInput = React.forwardRef<HTMLInputElement, IProps>(({ title, isValid }, ref) => {
  const [isPassword, setIsPassword] = useState<boolean>(true);

  const toggleInputType = () => {
    setIsPassword(!isPassword);
  }

  const inputType = isPassword ? 'password' : 'text';
  const containerClass = isValid ? classes['password-container'] : `${classes['password-container']} ${classes['invalid-password-input']}`;

  return (
    <div className={containerClass}>
      <input ref={ref} type={inputType} placeholder={title} required />
      <button type='button' onClick={toggleInputType}>
        show
      </button>
    </div>
  )
})

export default PasswordInput
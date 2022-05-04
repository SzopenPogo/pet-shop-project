import React, { useState } from 'react'
import classes from './PasswordInput.module.scss';

interface IProps {
  title: string;
  isValid: boolean;
  isReadonly: boolean;
  defaultValue?: string;
  isLabel?: boolean;
}

const PasswordInput = React.forwardRef<HTMLInputElement, IProps>(({ 
  title, 
  isValid, 
  isReadonly, 
  defaultValue,
  isLabel
}, ref) => {

  const [isPassword, setIsPassword] = useState<boolean>(true);

  const toggleInputType = () => {
    setIsPassword(!isPassword);
  }

  const inputType = isPassword ? 'password' : 'text';
  const containerClass = isValid ? classes['password-container'] : `${classes['password-container']} ${classes['invalid-password-input']}`;

  return (
    <div className={classes['password-input-container']}>
      {isLabel && <label>{title}</label>}
      <div className={containerClass}>
        <input 
          ref={ref} 
          type={inputType} 
          placeholder={title} 
          required 
          readOnly={isReadonly}
          defaultValue={defaultValue}
        />
        <button type='button' onClick={toggleInputType}>
          show
        </button>
      </div>
    </div>
  )
})

export default PasswordInput
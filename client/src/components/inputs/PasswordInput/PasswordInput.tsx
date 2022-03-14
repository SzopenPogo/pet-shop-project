import React, { useState } from 'react'
import classes from './PasswordInput.module.scss';

interface IProps {
  title: string;
}

const PasswordInput = React.forwardRef<HTMLInputElement, IProps>(({ title }, ref) => {
  const [isPassword, setIsPassword] = useState<boolean>(true);

  const toggleInputType = () => {
    setIsPassword(!isPassword);
  }

  const inputType = isPassword ? 'password' : 'text';

  return (
    <div className={classes['password-container']}>
      <input ref={ref} type={inputType} placeholder={title} required />
      <button type='button' onClick={toggleInputType}>
        show
      </button>
    </div>
  )
})

export default PasswordInput
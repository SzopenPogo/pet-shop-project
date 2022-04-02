import React from 'react'
import classes from './EmailInput.module.scss';

interface IProps {
  title: string;
  isValid: boolean;
}

const EmailInput = React.forwardRef<HTMLInputElement, IProps>(({ title, isValid }, ref) => {
  const inputClass = isValid
    ? classes['email-input']
    : `${classes['email-input']} ${classes['invalid-email-input']}`;
  
  return (
    <input
      ref={ref}
      type='email'
      placeholder={title}
      required
      className={inputClass} />
  )
})

export default EmailInput
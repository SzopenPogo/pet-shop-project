import React from 'react'
import classes from './EmailInput.module.scss';

interface IProps {
  title: string;
  isValid: boolean;
  isReadonly: boolean;
  defaultValue?: string;
  isLabel?: boolean;
}

const EmailInput = React.forwardRef<HTMLInputElement, IProps>(({ 
  title, 
  isValid, 
  isReadonly, 
  defaultValue,
  isLabel
}, ref) => {
  
  const inputClass = isValid
    ? classes['email-input']
    : `${classes['email-input']} ${classes['invalid-email-input']}`;
  
  return (
    <div className={classes['email-input-container']}>
      {isLabel && <label>{title}</label>}
      <input
        ref={ref}
        type='email'
        readOnly={isReadonly}
        placeholder={title}
        defaultValue={defaultValue}
        required
        className={inputClass}
      />
    </div>
  )
})

export default EmailInput
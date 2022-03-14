import React from 'react'
import classes from './EmailInput.module.scss';

interface IProps {
  title: string;
}

const EmailInput = React.forwardRef<HTMLInputElement, IProps>(({ title }, ref) => {
  return (
    <input ref={ref} type='email' placeholder={title} required className={classes['email-input']} />
  )
})

export default EmailInput
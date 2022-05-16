import React from 'react';
import generateInputId from '../../../utils/generateInputId';
import classes from './CheckboxInput.module.scss';

interface IProps {
  title: string;
  isLabel: boolean;
}

const CheckboxInput = React.forwardRef<HTMLInputElement, IProps>(({
  title,
  isLabel,
  }, ref) => {

  const inputId = generateInputId(title);
  return (
    <div className={classes['checkbox-container']}>
      {isLabel && <label htmlFor={inputId}>{title}:</label>}
      <input ref={ref} type='checkbox' />
      <span className={classes.checkmark} />
    </div>
  )
})

export default CheckboxInput
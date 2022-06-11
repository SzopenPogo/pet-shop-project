import React from 'react';
import generateInputId from '../../../utils/generateInputId';
import classes from './ColorInput.module.scss';

interface IProps {
  title: string;
  isReadonly: boolean;
  isRequired: boolean;
  isLabel?: boolean;
  value?: string;
}

const ColorInput = React.forwardRef<HTMLInputElement, IProps>(({
  title,
  isReadonly,
  isRequired,
  isLabel,
  value
}, ref) => {
  const inputId = generateInputId(title);
  return (
    <div className={classes['color-input-container']}>
      {isLabel && <label htmlFor={inputId}>{title}:</label>}
      <input
        id={inputId}
        ref={ref}
        type='color'
        placeholder={title}
        readOnly={isReadonly}
        required={isRequired}
        defaultValue={value}
      />
    </div>
  )
})

export default ColorInput
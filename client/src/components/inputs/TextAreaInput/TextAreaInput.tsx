import React, { useState } from 'react'
import generateInputId from '../../../utils/generateInputId';
import classes from './TextAreaInput.module.scss';

interface IProps {
  title: string;
  isReadonly: boolean;
  isRequired?: boolean;
  isLabel: boolean;
  value: string;
  maxLength?: number;
}

const TextAreaInput = React.forwardRef<HTMLTextAreaElement, IProps>(({
  title, 
  isReadonly, 
  isRequired, 
  isLabel, 
  value,
  maxLength
  }, ref) => {
  const [inputValue, setInputValue] = useState<string>(value);

  const inputId = generateInputId(title);

  const controllInputValue = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.currentTarget.value);
  }

  return (
    <div className={classes['text-area-input']}>
      { isLabel && <label htmlFor={inputId}>{title}:</label> }
      <textarea
        ref={ref}
        id={inputId}
        readOnly={isReadonly}
        required={isRequired}
        value={inputValue}
        onChange={controllInputValue}
        maxLength={maxLength}
        />
        { maxLength && <span className={classes['length-info']}>
          {inputValue.length} / {maxLength}
        </span> }
    </div>
  )
})

export default TextAreaInput
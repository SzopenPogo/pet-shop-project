import React, { useState } from 'react';
import { useEffect } from 'react';
import classes from './TextInput.module.scss';

interface IProps {
  title: string;
  isValid?: boolean;
  isReadonly: boolean;
  isRequired: boolean;
  isLabel: boolean;
  value: string;
  validateInput?: (value: string) => boolean;
}

const TextInput = React.forwardRef<HTMLInputElement, IProps>(({
  title,
  isValid = true,
  isReadonly,
  isRequired,
  isLabel,
  value,
  validateInput}, ref) => {
  
  const [inputValue, setInputValue] = useState<string>(value);
  const [isInputValid, setIsInputValid] = useState<boolean>(isValid);

  useEffect(() => {
    if (validateInput) {
      setIsInputValid(validateInput(inputValue));
    }
    
  }, [validateInput, inputValue]);

  const controllInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value);
  }
  
  const inputClass = isInputValid
    ? classes['text-input']
    : `${classes['text-input']} ${classes['invalid-text-input']}`;

  
  const inputId = `${title}-input-${Math.random().toFixed(3)}`;
  
  return (
    <div className={classes['text-input-container']}>
      {isLabel && <label htmlFor={inputId}>{title}:</label>}
      <input
        id={inputId}
        ref={ref}
        type='text'
        placeholder={title}
        readOnly={isReadonly}
        className={inputClass}
        required={isRequired}
        value={inputValue}
        onChange={controllInputValue}
      />
    </div>
  )
})

export default TextInput
import React, { useState } from 'react';
import { useEffect } from 'react';
import generateInputId from '../../../utils/generateInputId';
import classes from './TextInput.module.scss';

interface IProps {
  title: string;
  isValid?: boolean;
  isReadonly: boolean;
  isRequired: boolean;
  isLabel: boolean;
  value: string;
  validateInput?: (value: string, length?: number) => boolean;
  inputMinValueLenght?: number;
}

const TextInput = React.forwardRef<HTMLInputElement, IProps>(({
  title,
  isValid = true,
  isReadonly,
  isRequired,
  isLabel,
  value,
  validateInput,
  inputMinValueLenght}, ref) => {
  
  const [inputValue, setInputValue] = useState<string>(value);
  const [isInputValid, setIsInputValid] = useState<boolean>(isValid);

  const minValueLength = inputMinValueLenght ?  inputMinValueLenght : 0;

  useEffect(() => {
    setInputValue(value)
  }, [value])
  

  useEffect(() => {
    if (validateInput) {
      setIsInputValid(validateInput(inputValue, minValueLength));
    }
    
  }, [validateInput, inputValue, minValueLength]);

  const controllInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value);
  }
  
  const inputClass = isInputValid
    ? classes['text-input']
    : `${classes['text-input']} ${classes['invalid-text-input']}`;

  
  const inputId = generateInputId(title);
  
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
        minLength={minValueLength}
      />
    </div>
  )
})

export default TextInput
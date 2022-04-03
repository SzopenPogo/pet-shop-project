import React, { useState } from 'react';
import { useEffect } from 'react';
import generateInputId from '../../../utils/generateInputId';
import classes from './NumberInput.module.scss';

interface IProps {
  title: string;
  isValid?: boolean;
  isReadonly: boolean;
  isRequired: boolean;
  isLabel: boolean;
  value: number;
  validateInput?: (value: string) => boolean;
}

const NumberInput = React.forwardRef<HTMLInputElement, IProps>(({
  title,
  isValid = true,
  isReadonly,
  isRequired,
  isLabel,
  value,
  validateInput}, ref) => {
  
  const [inputValue, setInputValue] = useState<number>(value);
  const [isInputValid, setIsInputValid] = useState<boolean>(isValid);

  useEffect(() => {
    if (validateInput) {
      setIsInputValid(validateInput(inputValue.toString()));
    }
    
  }, [validateInput, inputValue]);

  const controllInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(+event.currentTarget.value);
  }
  
  const inputClass = isInputValid
    ? classes['number-input']
    : `${classes['number-input']} ${classes['invalid-number-input']}`;

  
  const inputId = generateInputId(title);
  
  return (
    <div className={classes['number-input-container']}>
      {isLabel && <label htmlFor={inputId}>{title}:</label>}
      <input
        id={inputId}
        ref={ref}
        type='number'
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

export default NumberInput
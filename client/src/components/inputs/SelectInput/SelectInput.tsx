import React from 'react'
import { ISelectOption } from '../../../interfaces/ISelectOption'
import generateInputId from '../../../utils/generateInputId';
import classes from './SelectInput.module.scss';

interface IProps {
  options: Array<ISelectOption>;
  title: string;
  isLabel: boolean;
  isRequired: boolean;
  onChangeFunction?: (value: string) => void;
}


const SelectInput = React.forwardRef<HTMLSelectElement, IProps>(({
  options,
  title,
  isLabel,
  isRequired,
  onChangeFunction
  }, ref) => {

  const onChangeHandler = (event: any) => {
    if(onChangeFunction) {
      onChangeFunction(event.target.value);
    }
  }

  const renderOptions = options.map(option => (
    <option key={option.value} value={option.value}>{option.title}</option>
  ));

  const inputId = generateInputId(title);
  return (
    <div className={classes['select-container']}>
      {isLabel && <label htmlFor={inputId}>{title}:</label>}
      <select
        ref={ref}
        id={inputId}
        required={isRequired}
        onChange={onChangeHandler}
      >
        {renderOptions}
      </select>
    </div>
  )
})

export default SelectInput
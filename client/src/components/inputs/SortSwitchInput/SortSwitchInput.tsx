import { useState } from 'react';
import classes from './SortSwitchInput.module.scss';

interface IProps {
  defaultStatus: boolean;
  onChange: () => void;
  title: string;
}

const SortSwitchInput = ({defaultStatus, onChange, title}: IProps) => {
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const setSortSwitchActive = () => {
    setIsClicked(true);
  }

  const labelClass = isClicked 
    ? `${classes.switch} ${classes['slider-active']}`
    : `${classes.switch}`

  return (
    <label 
      className={labelClass}
      onClick={setSortSwitchActive}
    >
      <span>{title}</span>
      <input 
        type="checkbox"
        checked={defaultStatus}
        onChange={onChange}
      />
      <span className={classes.slider} />
    </label>
  )
}

export default SortSwitchInput
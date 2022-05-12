import classes from './SwitchInput.module.scss';

interface IProps {
  status: boolean;
  isReadony: boolean;
  toggleFunction?: () => void;
}

const SwitchInput = ({status, isReadony, toggleFunction}: IProps) => {
  const switchChangeHandler = () => {
    if(isReadony) {
      return status;
    }

    if(toggleFunction) {
      toggleFunction();
    }
  }

  return (
    <label className={classes.switch}>
      <input 
        type="checkbox"
        checked={status}
        onChange={switchChangeHandler}
      />
      <span className={classes.slider} />
    </label>
  )
}

export default SwitchInput
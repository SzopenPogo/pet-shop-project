import classes from './NumberFromNumbers.module.scss';

interface IProps {
  number: number;
  numbers: number;
}

const NumberFromNumbers = ({number, numbers}: IProps) => {
  const numberInfo = `${number} / ${numbers}`;
  return (
    <span className={classes['number-from-numbers']}>{numberInfo}</span>
  )
}

export default NumberFromNumbers
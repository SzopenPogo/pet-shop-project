import classes from './MainSubmitButton.module.scss';

interface IProps {
  title: string;
}

const MainSubmitButton = ({title}: IProps) => {
  return (
    <button type='submit' className={classes['submit-button']}>{title}</button>
  )
}

export default MainSubmitButton
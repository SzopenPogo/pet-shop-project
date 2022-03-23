import classes from './MainButton.module.scss';

interface IProps {
  title: string;
}

const MainButton = ({title}: IProps) => {
  return (
    <button type='submit' className={classes['submit-button']}>{title}</button>
  )
}

export default MainButton
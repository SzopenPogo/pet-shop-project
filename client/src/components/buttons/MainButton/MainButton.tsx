import classes from './MainButton.module.scss';

interface IProps {
  title: string;
  isSubmit: boolean;
  onClick?: () => void;
}

const MainButton = ({ title, isSubmit, onClick }: IProps) => {
  const buttonType = isSubmit ? 'submit' : 'button';

  return (
    <button
      type={buttonType}
      className={classes['submit-button']}
      onClick={onClick}
    >
      {title}
    </button>
  )
}

export default MainButton
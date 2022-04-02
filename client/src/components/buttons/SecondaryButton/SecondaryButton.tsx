import classes from './SecondaryButton.module.scss';

interface IProps {
  title: string;
  isSubmit: boolean;
  onClick?: () => void;
}

const SecondaryButton = ({ title, isSubmit, onClick }: IProps) => {
  const buttonType = isSubmit ? 'submit' : 'button';

  return (
    <button
      type={buttonType}
      className={classes['secondary-button']}
      onClick={onClick ? onClick : () => {}}
    >
      {title}
    </button>
  )
}

export default SecondaryButton
import classes from './DeleteButton.module.scss';

interface IProps {
  onClick: () => void;
}

const DeleteButton = ({ onClick }: IProps) => {
  return (
    <button
      type='button'
      className={classes['delete-button']}
      onClick={onClick}
    />
  )
}

export default DeleteButton;
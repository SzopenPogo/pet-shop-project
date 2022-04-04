import classes from './CloseButton.module.scss';

interface IProps {
  onClick: () => void;
}

const CloseButton = ({ onClick }: IProps) => {
  return (
    <button
      type='button'
      className={classes['close-button']}
      onClick={onClick}
    />
  )
}

export default CloseButton;
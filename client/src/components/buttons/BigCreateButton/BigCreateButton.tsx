import classes from './BigCreateButton.module.scss';

interface IProps {
  title: string;
  onClick?: () => void;
}

const BigCreateButton = ({ title, onClick }: IProps) => {
  return (
    <button
      type='button'
      className={classes['add-button']}
      onClick={onClick}
    >
      <h3>Create</h3>
      <h1>{title}</h1>
    </button>
  )
}

export default BigCreateButton
import classes from './Backdrop.module.scss';

interface Props {
  onClick: () => void;
}

const Backdrop = ({onClick}: Props) => {
  return <div className={classes.backdrop} onClick={onClick} />;
};

export default Backdrop;

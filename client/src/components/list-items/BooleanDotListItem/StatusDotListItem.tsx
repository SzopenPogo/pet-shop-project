import classes from './StatusDotListItem.module.scss';

interface IProps {
  title: string;
  status: boolean;
}

const BooleanDotListItem = ({title, status}: IProps) => {
  const dotClass = status 
    ? `${classes['bool-dot-dot']} ${classes['bool-dot-dot__true']}`
    : `${classes['bool-dot-dot']} ${classes['bool-dot-dot__false']}`;

  return (
    <div className={classes['bool-dot-container']}>
      
      <span>{title}</span>
      <div className={dotClass} />
    </div>
  )
}

export default BooleanDotListItem
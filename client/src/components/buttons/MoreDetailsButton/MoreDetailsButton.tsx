import classes from './MoreDetailsButton.module.scss';

interface IProps {
  direction: string;
  onClick: () => void;
}

const MoreDetailsButton = ({direction, onClick}: IProps) => {
  const buttonClass = direction === 'top' 
  ? `${classes['more-details-button']} ${classes['more-details-button__top']}`
  : direction === 'right'
  ? `${classes['more-details-button']} ${classes['more-details-button__right']}`
  : direction === 'bottom'
  ? `${classes['more-details-button']} ${classes['more-details-button__bottom']}`
  : `${classes['more-details-button']}`;

  return (
    <button className={buttonClass} onClick={onClick} />
  )
}

export default MoreDetailsButton
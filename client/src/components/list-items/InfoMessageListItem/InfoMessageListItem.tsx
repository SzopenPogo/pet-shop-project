import { memo, ReactChild, useEffect } from 'react';
import classes from './InfoMessageListItem.module.scss';

interface IProps {
  children: ReactChild;
  timeout: number;
  isPositive: boolean;
  removeFunction?: () => void;
}

const InfoMessageListItem = memo(({children, timeout, isPositive, removeFunction}: IProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if(removeFunction) {
        removeFunction();
      }
    }, timeout);
  
    return () => {
      clearTimeout(timer)
    }
  }, [removeFunction, timeout]);
  

  const infoMessageClass = isPositive 
  ? `${classes['info-message-container']} ${classes['info-message-positive']}`
  : `${classes['info-message-container']} ${classes['info-message-negative']}`

  return (
    <li 
      className={infoMessageClass}
      onClick={removeFunction}
    >
      {children}
    </li>
  )
})

export default InfoMessageListItem;
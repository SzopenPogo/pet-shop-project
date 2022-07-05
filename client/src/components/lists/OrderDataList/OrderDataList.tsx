import { ReactChild, useState } from 'react';
import MoreDetailsButton from '../../buttons/MoreDetailsButton/MoreDetailsButton';
import classes from './OrderDataList.module.scss';

interface IProps {
  title: string;
  children: ReactChild
}

const OrderDataList = ({title, children}: IProps) => {
  const [isDataVisible, setIsDataVisible] = useState<boolean>(false);
  const [moreDetailsButtonDirection, setMoreDetailsButtonDirection] = useState<string>('bottom');

  const dataVisibleHandler = () => {
    setIsDataVisible(!isDataVisible);

    const moreDetailsButtonDirection = isDataVisible ? 'bottom' : 'top';
    setMoreDetailsButtonDirection(moreDetailsButtonDirection);
  }

  return (
    <ul className={classes['order-data-list']}>
      <span className={classes['order-data-list-title']}>{title}</span>
      {isDataVisible && children}
      <MoreDetailsButton direction={moreDetailsButtonDirection} onClick={dataVisibleHandler} />
    </ul>
  )
}

export default OrderDataList;
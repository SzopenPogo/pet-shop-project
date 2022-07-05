import classes from './OrderItemElement.module.scss';

interface IProps {
  title: string;
  value: string | number;
  haveBorder?: boolean;
}

const OrderItemElement = ({title, value, haveBorder = true}: IProps) => {
  const orderItemElementClass = haveBorder
    ? `${classes['order-item-element']} ${classes['order-item-element--border']}`
    : `${classes['order-item-element']}`;

  return (
    <span className={orderItemElementClass}>
      {title}:
      <span className={classes['order-item-element-value']}>{value}</span>
    </span>
  )
}

export default OrderItemElement;
import { IBank } from '../../../interfaces/IBank';
import classes from './BankListItem.module.scss';

interface IProps extends IBank {
  onClick: () => void;
}

const BankListItem = ({
  name,
  logo,
  onClick
}: IProps) => {
  return (
    <li 
      className={classes['bank-item']}
      onClick={onClick}
      title={name}
    >
      <img src={logo} alt={`${logo}-bank`} className={classes['bank-logo']} />
    </li>
  )
}

export default BankListItem;
import { BANKS_DATA } from '../../../constants/paymentMethod';
import BankListItem from '../../list-items/BankListItem/BankListItem';
import classes from './BankList.module.scss';

interface IProps {
  onBankSelect: () => void;
}

const BankList = ({onBankSelect}: IProps) => {
  const renderBanks = BANKS_DATA.map(bank => (
    <BankListItem
      key={bank.name}
      name={bank.name}
      logo={bank.logo}
      onClick={onBankSelect}
    />
  ))

  return (
    <ul className={classes['bank-list']}>
      {renderBanks}
    </ul>
  )
}

export default BankList;
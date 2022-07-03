import szopenBankLogo from '../images/logo/szopenBankLogo.webp';
import verteBankLogo from '../images/logo/verteBankLogo.webp';
import { IBank } from '../interfaces/IBank';

export const DELIVERY_PAYMENT_METHOD = 'DELIVERY_PAYMENT_METHOD';
export const CARD_PAYMENT_METHOD = 'CARD_PAYMENT_METHOD';

export const BANKS_DATA: Array<IBank> = [
  {
    name: 'Szopen Bank',
    logo: szopenBankLogo
  }, {
    name: 'Verte Bank',
    logo: verteBankLogo
  }
]
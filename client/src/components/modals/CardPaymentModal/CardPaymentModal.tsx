import Backdrop from '../../Backdrop/Backdrop';
import classes from './CardPaymentModal.module.scss';
import { CSSTransition } from 'react-transition-group';
import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import BankList from '../../lists/BankList/BankList';
import { CARD_PAYMENT_METHOD } from '../../../constants/paymentMethod';
import Spinner from '../../spinners/Spinner/Spinner';

interface IProps {
  activate: boolean;
  timeout: number;
  close: () => void;
  sendDataToForm: (paymentMethod: string) => void;
}

const CardPaymentModal = ({
  activate,
  timeout,
  close,
  sendDataToForm
}: IProps) => {
  const [isTransactionProcessing, setIsTransactionProcessing] = useState<boolean>(false);

  const bankSelectHandler = () => {
    setIsTransactionProcessing(true);
    const transactionTimeout = setTimeout(() => {
      sendDataToForm(CARD_PAYMENT_METHOD);
      close();

      setIsTransactionProcessing(false);
      clearTimeout(transactionTimeout);
    }, 1500);
  }

  const nodeRef = useRef(null);
  return createPortal(
    <>
      <Backdrop timeout={timeout} activate={activate} onClick={() => {}} />
      <CSSTransition
        nodeRef={nodeRef}
        in={activate}
        timeout={timeout}
        mountOnEnter
        unmountOnExit
        classNames={{
          enter: classes['enter'],
          enterActive: classes['enter-active'],
          exit: classes['exit'],
          exitActive: classes['exit-active']
        }}
      >
        <div ref={nodeRef} className={classes['payment-modal']}>
          {!isTransactionProcessing && <>
            <h1>Select your bank</h1>
            <BankList onBankSelect={bankSelectHandler} />
          </>}
          {isTransactionProcessing && <div className={classes['spinner-container']}>
            <Spinner size={'5rem'} borderSize={'.55rem'} color={'black'} />
            <span>processing...</span>  
          </div>}
        </div>
    </CSSTransition>
    </>
    , document.getElementById('react-portal')!)
}

export default CardPaymentModal;
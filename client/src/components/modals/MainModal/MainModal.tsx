import { createPortal } from 'react-dom'
import Backdrop from '../../Backdrop/Backdrop'
import classes from './MainModal.module.scss';
import { ReactChild, useRef } from 'react'
import { CSSTransition } from 'react-transition-group';
import CloseButton from '../../buttons/CloseButton/CloseButton';

interface IProps {
  activate: boolean;
  timeout: number;
  children: ReactChild;
  title: string;
  closeFunction: () => void;
}

const MainModal = ({ activate, timeout, children, title, closeFunction }: IProps) => {
  const nodeRef = useRef(null);
  return createPortal(
    <>
      <Backdrop timeout={timeout} activate={activate} onClick={closeFunction} />
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
        <div ref={nodeRef} className={classes['main-modal']}>
          <div className={classes['close-button-container']}>
            <CloseButton onClick={closeFunction} /> 
          </div>
            <h1>{title}</h1>  
          {children}
        </div>
    </CSSTransition>
    </>
    , document.getElementById('react-portal')!)
}

export default MainModal
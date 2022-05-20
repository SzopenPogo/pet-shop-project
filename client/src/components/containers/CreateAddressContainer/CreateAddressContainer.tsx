import { useRef, useState } from 'react';
import CreateAddressForm from '../../forms/CreateAddressForm/CreateAddressForm';
import { CSSTransition } from 'react-transition-group';
import classes from './CreateAddressContainer.module.scss';
import MainAndCloseButtonToggle from '../../buttons/MainAndCloseButtonToggle/MainAndCloseButtonToggle';

const CreateAddressContainer = () => {
  const [isCreateAddress, setIsCreateAddress] = useState<boolean>(false);

  const toggleCreateAddress = () => {
    setIsCreateAddress(!isCreateAddress);
  }


  const nodeRef = useRef(null);
  return (
    <section className={classes['create-address']}>
      

      <MainAndCloseButtonToggle 
        title={'Add new address'}
        isToClose={isCreateAddress}
        toggleFunction={toggleCreateAddress} 
      />
      
      <CSSTransition
        nodeRef={nodeRef}
        in={isCreateAddress}
        timeout={150}
        mountOnEnter
        unmountOnExit
        classNames={{
          enter: classes['enter'],
          enterActive: classes['enter-active'],
          exit: classes['exit'],
          exitActive: classes['exit-active']
        }}
      >
        <div ref={nodeRef} className={classes['form-container']}>
          <CreateAddressForm onSubmitAdditionalFunction={toggleCreateAddress} />
        </div>
      </CSSTransition>
    </section>
  )
}

export default CreateAddressContainer
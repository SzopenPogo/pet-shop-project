import { useRef, useState } from 'react';
import CloseButton from '../../buttons/CloseButton/CloseButton';
import MainButton from '../../buttons/MainButton/MainButton';
import CreateAddressForm from '../../forms/CreateAddressForm/CreateAddressForm';
import { CSSTransition } from 'react-transition-group';
import classes from './CreateAddressContainer.module.scss';

const CreateAddressContainer = () => {
  const [isCreateAddress, setIsCreateAddress] = useState<boolean>(false);

  const toggleCreateAddress = () => {
    setIsCreateAddress(!isCreateAddress);
  }

  const buttonsStyle = isCreateAddress ? { justifyContent: 'flex-end', width: '100%' } : {};

  const nodeRef = useRef(null);
  return (
    <section className={classes['create-address']}>
      
      <div className={classes.buttons} style={buttonsStyle}>
        {!isCreateAddress && <MainButton
          isSubmit={false}
          title='Add new address'
          onClick={toggleCreateAddress}
        />}
        {isCreateAddress && <CloseButton onClick={toggleCreateAddress} />}
      </div>
      
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
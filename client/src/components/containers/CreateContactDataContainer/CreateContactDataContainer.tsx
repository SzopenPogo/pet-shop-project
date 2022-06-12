import { useState } from 'react';
import BigAdminButton from '../../buttons/BigAdminButton/BigAdminButton';
import classes from './CreateContactDataContainer.module.scss';
import phoneIcon from '../../../images/icon/phoneIconGray.svg';
import CreateContactDataForm from '../../forms/CreateContactDataForm/CreateContactDataForm';

const CreateContactDataContainer = () => {
  const [isFormActive, setIsFormActive] = useState<boolean>(false);
  const [isButtonActive, setIsButtonActive] = useState<boolean>(true);
  
  const formActiveTimeout = 200;

  const setFormActive = () => {
    setIsButtonActive(false);
    setTimeout(() => {
      setIsFormActive(true);
    }, formActiveTimeout);
  }

  const setFormInctive = () => {
    setIsFormActive(false);
    setTimeout(() => {
      setIsButtonActive(true);
    }, formActiveTimeout);
  }
  
  return (
    <section className={classes['create-contact-container']}>
      <BigAdminButton
        title='Contact'
        subtitle='create'
        backgroundImage={phoneIcon}
        activate={isButtonActive}
        timeout={formActiveTimeout}
        onClick={setFormActive}
      />
      <CreateContactDataForm
        activate={isFormActive}
        timeout={formActiveTimeout}
        toggleForm={setFormInctive}
      />
    </section>
  )
}

export default CreateContactDataContainer
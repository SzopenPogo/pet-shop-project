import classes from './CreateSliderContainer.module.scss';
import BigAdminButton from '../../buttons/BigAdminButton/BigAdminButton';
import sliderImage from '../../../images/icon/imagesGray.svg'
import { useState } from 'react';
import CreateSliderForm from '../../forms/CreateSliderForm/CreateSliderForm';

const CreateSliderContainer = () => {
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
    <section className={classes['create-slider-container']}>
      <BigAdminButton
        title='Slider'
        subtitle='create'
        backgroundImage={sliderImage}
        activate={isButtonActive}
        timeout={formActiveTimeout}
        onClick={setFormActive}
      />
      <CreateSliderForm
        activate={isFormActive}
        timeout={formActiveTimeout}
        toggleForm={setFormInctive}
      />
    </section>
  )
}

export default CreateSliderContainer
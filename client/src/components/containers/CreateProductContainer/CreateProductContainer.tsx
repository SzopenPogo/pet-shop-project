import { useState } from 'react';
import BigAdminButton from '../../buttons/BigAdminButton/BigAdminButton';
import CreateProductForm from '../../forms/CreateProductForm/CreateProductForm';
import classes from './CreateProductContainer.module.scss';
import productImage from '../../../images/icon/productIconGray.svg';

const CreateProductContainer = () => {
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
    <section className={classes['create-product-container']}>
      <BigAdminButton
        title='Product'
        subtitle='create'
        backgroundImage={productImage}
        activate={isButtonActive}
        timeout={formActiveTimeout}
        onClick={setFormActive}
      />
      <CreateProductForm 
        activate={isFormActive}
        timeout={formActiveTimeout}
        toggleFunction={setFormInctive}
      />
    </section>
  )
}

export default CreateProductContainer
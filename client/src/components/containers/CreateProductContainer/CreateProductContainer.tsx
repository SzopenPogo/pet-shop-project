import { useState } from 'react';
import BigCreateButton from '../../buttons/BigCreateButton/BigCreateButton';
import CreateProductForm from '../../forms/CreateProductForm/CreateProductForm';
import classes from './CreateProductContainer.module.scss';

const CreateProductContainer = () => {
  const [isFormActive, setIsFormActive] = useState<boolean>(false);

  const toggleFormActive = () => {
    setIsFormActive(!isFormActive);
  }

  const formActiveTimeout = 200;
  return (
    <section className={classes['create-product-container']}>
      <BigCreateButton
        title='Product'
        activate={!isFormActive}
        timeout={formActiveTimeout}
        onClick={toggleFormActive}
      />
      <CreateProductForm 
        activate={isFormActive}
        timeout={formActiveTimeout}
        toggleFunction={toggleFormActive}
      />
    </section>
  )
}

export default CreateProductContainer
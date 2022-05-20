import { useState } from 'react';
import CloseButton from '../../buttons/CloseButton/CloseButton';
import MainAndCloseButtonToggle from '../../buttons/MainAndCloseButtonToggle/MainAndCloseButtonToggle';
import MainButton from '../../buttons/MainButton/MainButton';
import CreateCategoryForm from '../../forms/CreateCategoryForm/CreateCategoryForm';
import classes from './CreateCategoryContainer.module.scss';

const CreateCategoryContainer = () => {
  const [isCreateMode, setIsCreateMode] = useState<boolean>(false);

  const toggleCreateMode = () => {
    setIsCreateMode(!isCreateMode);
  }

  return (
    <div className={classes['create-category-container']}>
      <div className={classes['create-category-button']}>
        <MainAndCloseButtonToggle 
          title={'Create a new category'}
          isToClose={isCreateMode}
          toggleFunction={toggleCreateMode}
        />
      </div>
      {isCreateMode && <CreateCategoryForm />}
    </div>
  )
}

export default CreateCategoryContainer
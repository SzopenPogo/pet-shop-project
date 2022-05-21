import { ReactChild, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { toggleFormContainer } from '../../../store/ui/actions/form-container-actions';
import MainAndCloseButtonToggle from '../../buttons/MainAndCloseButtonToggle/MainAndCloseButtonToggle';
import classes from './FormContainer.module.scss';

interface IProps {
  title: string;
  children: ReactChild;
}

const FormContainer = ({title, children}: IProps) => {
  const dispatch = useDispatch();

  const isActive = useSelector((state: RootState) => state.ui.isFormContainerActive);

  const toggleActive = () => {
    dispatch(toggleFormContainer());
  }

  const categoryContainerClass = isActive 
    ? `${classes['form-container']}  ${classes['form-container--active']}`
    : `${classes['form-container']}`;

  return (
    <div className={categoryContainerClass}>
      <div className={classes['form-container-button']}>
        <MainAndCloseButtonToggle 
          title={title}
          isToClose={isActive}
          toggleFunction={toggleActive}
        />
      </div>
      {isActive && children}
    </div>
  )
}

export default FormContainer
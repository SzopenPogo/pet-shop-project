import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import BigAdminButton from '../../buttons/BigAdminButton/BigAdminButton'
import classes from './AdminSliderListContainer.module.scss'
import listIcon from '../../../images/icon/listGray.svg';
import { sliderGet } from '../../../store/slider/actions/slider-get-actions';

const AdminSliderListContainer = () => {
  const dispatch = useDispatch();

  const [isListActive, setIsListActive] = useState<boolean>(false);
  const [isButtonActive, setIsButtonActive] = useState<boolean>(true);

  const timeout = 150;

  useEffect(() => {
    if(isListActive) {
      dispatch(sliderGet());
    }
  }, [isListActive, dispatch])

  const setListActive = () => {
    setIsButtonActive(false)
    setTimeout(() => {
      setIsListActive(true);
    }, timeout)
  }
  
  return (
    <section className={classes['slider-list-container']}>
      <BigAdminButton
        title='Products'
        subtitle='list of'
        activate={isButtonActive}
        timeout={timeout}
        backgroundImage={listIcon}
        onClick={setListActive}
      />
    </section>
  )
}

export default AdminSliderListContainer
import classes from './AdminContactListContainer.module.scss';
import BigAdminButton from '../../buttons/BigAdminButton/BigAdminButton';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getContacts } from '../../../store/contact/actions/contact-get-actions';
import listIcon from '../../../images/icon/listGray.svg';
import AdminContactList from '../../lists/AdminContactList/AdminContactList';

const AdminContactListContainer = () => {
  const dispatch = useDispatch();

  const [isListActive, setIsListActive] = useState<boolean>(false);
  const [isButtonActive, setIsButtonActive] = useState<boolean>(true);

  const timeout = 150;

  useEffect(() => {
    if(isListActive) {
      dispatch(getContacts());
    }
  }, [isListActive, dispatch])

  const setListActive = () => {
    setIsButtonActive(false);
    setTimeout(() => {
      setIsListActive(true);
    }, timeout)
  }
  
  return (
    <section className={classes['contact-list-container']}>
      <BigAdminButton
        title='Sliders'
        subtitle='list of'
        activate={isButtonActive}
        timeout={timeout}
        backgroundImage={listIcon}
        onClick={setListActive}
      />
      <AdminContactList
        activate={isListActive}
        timeout={timeout}
      />
    </section>
  )
}

export default AdminContactListContainer
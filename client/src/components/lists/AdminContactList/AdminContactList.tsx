import classes from './AdminContactList.module.scss';
import { CSSTransition } from 'react-transition-group';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import Spinner from '../../spinners/Spinner/Spinner';
import { useRef } from 'react';
import AdminContactListItem from '../../list-items/AdminContactListItem/AdminContactListItem';

interface IProps {
  activate: boolean;
  timeout: number;
}

const AdminContactList = ({ activate, timeout }: IProps) => {

  const {loading, error, data} = useSelector((state: RootState) => state.contact.contact);

  const nodeRef = useRef(null);

  const renderContacts = data.map((contact, index) => (
    <AdminContactListItem
      key={contact._id}
      index={index}
      phoneNumber={contact.phoneNumber}
      country={contact.country}
      postalCode={contact.postalCode}
      city={contact.city} 
      street={contact.street}
      homeNumber={contact.homeNumber}
      bankNumber={contact.bankNumber}
      _id={contact._id}
    />
  ))

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={activate}
      timeout={timeout}
      mountOnEnter
      unmountOnExit
      classNames={{
        enter: classes['enter'],
        enterActive: classes['enter-active'],
        exit: classes['exit'],
        exitActive: classes['exit-active']
      }}
    >
    <ul 
      ref={nodeRef}
      className={classes['admin-contact-list']}
    >
      {loading && <div className={classes['spinner-container']}>
          <Spinner size={'11rem'} borderSize={'.75rem'} color={'black'} />  
      </div>}
      {data.length >= 0 && renderContacts}
      {data.length <= 0 && <h1>No contacts found</h1>}
      {!loading && error && <h1>{error}</h1>}
    </ul>
    </CSSTransition>
  )
}

export default AdminContactList
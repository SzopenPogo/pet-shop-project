import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IContact } from '../../../interfaces/IContact';
import { RootState } from '../../../store';
import { adminDeleteContact } from '../../../store/contact/actions/contact-delete-actions';
import { selectContact } from '../../../store/contact/actions/contact-select-actions';
import ContactForm from '../../forms/ContactForm/ContactForm';
import AdminMainListItem from '../AdminMainListItem/AdminMainListItem';

interface IProps extends IContact {
  index: number;
}

const AdminContactListItem = ({
  index,
  bankNumber,
  city,
  country,
  homeNumber,
  phoneNumber,
  postalCode,
  street,
  _id
}: IProps) => {
  const dispatch = useDispatch();

  const token = useSelector((state: RootState) => state.user.token);
  const {_id: selectedContactId, 
    index: selectedContactIndex} = useSelector((state: RootState) => state.contact.selectedContact);
  
    const [isReadonly, setIsReadonly] = useState<boolean>(true);

    const toggleContactEdit = () => {
      setIsReadonly(!isReadonly);
    }
  
    const contactSelectToDeleteHandler = () => {
      if(_id) {
        dispatch(selectContact({_id, index}));
      }
    }
  
  
    const deleteContactHandler = () => {
      dispatch(adminDeleteContact(token, selectedContactId, selectedContactIndex));
    }
  

  return (
    <AdminMainListItem
      _id={_id ? _id : ''}
      title={'Contact'}
      isReadonly={isReadonly}
      deleteItem={deleteContactHandler}
      selectItemToDelete={contactSelectToDeleteHandler}
      toggleItemEdit={toggleContactEdit}
      pcWidth='30rem'
    >
      <ContactForm
        bankNumber={bankNumber}
        city={city}
        country={country}
        homeNumber={homeNumber}
        index={index}
        phoneNumber={phoneNumber}
        postalCode={postalCode}
        street={street}
        _id={_id}
        isReadonly={isReadonly}
        disableReadonly={toggleContactEdit}
      />
    </AdminMainListItem>
  )
}

export default AdminContactListItem
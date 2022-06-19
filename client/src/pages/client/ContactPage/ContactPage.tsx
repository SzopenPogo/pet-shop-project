import MainLayout from '../../../components/layout/MainLayout/MainLayout';
import classes from './ContactPage.module.scss';
import animalImage from '../../../images/images/sharPeiDog.png'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import ContactElement from '../../../components/elements/ContactElement/ContactElement';
import { useEffect } from 'react';
import { getContacts } from '../../../store/contact/actions/contact-get-actions';
import Spinner from '../../../components/spinners/Spinner/Spinner';

const ContactPage = () => {
  const dispatch = useDispatch();

  const {loading, data} = useSelector((state: RootState) => state.contact.contact);

  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch])

  const renderContacts = data.map((contact, index) => (
    <ContactElement
      key={contact._id}
      index={index}
      bankNumber={contact.bankNumber}
      city={contact.city}
      country={contact.country}
      phoneNumber={contact.phoneNumber}
      postalCode={contact.postalCode}
      street={contact.street}
      homeNumber={contact.homeNumber}
    />
  ))

  return (
  <MainLayout>
    <section className={classes.contact}>
      <img
        src={animalImage}
        alt='animal-img'
        className={classes.animal}
      />
      <div className={classes.contacts}>
        {loading && <Spinner size={'5rem'} borderSize={'.55rem'} color={'gray'} />}
        {!loading && renderContacts}
      </div>
    </section>
  </MainLayout>
  )
}

export default ContactPage
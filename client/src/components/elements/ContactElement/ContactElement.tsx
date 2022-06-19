import { IContact } from '../../../interfaces/IContact';
import ContactText from '../../Text/ContactText/ContactText';
import classes from './ContactElement.module.scss';

interface IProps extends IContact {
  index: number
}

const ContactElement = ({
  index,
  bankNumber,
  city,
  country,
  homeNumber,
  phoneNumber,
  postalCode,
  street
}: IProps) => {
  return (
    <div className={classes['contact-element']}>
      
      <h1 className={classes['contact-title']}>Contact {index + 1}</h1>

      <ContactText
        title='Country'
        data={country}
      />

      <ContactText
        title='Postal code'
        data={postalCode}
      />

      <ContactText
        title='City'
        data={city}
      />

      <ContactText
        title='Street'
        data={street}
      />

      <ContactText
        title='Home number'
        data={homeNumber}
      />

      <ContactText
        title='Phone number'
        data={phoneNumber.toString()}
      />

      <ContactText
        title='Bank number'
        data={bankNumber}
      />


    </div>
  )
}

export default ContactElement
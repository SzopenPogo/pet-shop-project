import { FormEvent, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IContact } from '../../../interfaces/IContact';
import { RootState } from '../../../store';
import { adminContactEdit } from '../../../store/contact/actions/contact-edit-actions';
import { addInfoMessage } from '../../../store/ui/actions/info-items-actions';
import { validatePhoneNumber } from '../../../utils/validation/validatePhoneNumber';
import MainButton from '../../buttons/MainButton/MainButton';
import NumberInput from '../../inputs/NumberInput/NumberInput';
import TextInput from '../../inputs/TextInput/TextInput';
import classes from './ContactForm.module.scss';

interface IProps extends IContact {
  index: number;
  isReadonly: boolean;
  disableReadonly: () => void;
}

const ContactForm = ({
  index,
  bankNumber,
  city,
  country,
  homeNumber,
  phoneNumber,
  postalCode,
  street,
  _id,
  isReadonly,
  disableReadonly
}: IProps) => {
  const dispatch = useDispatch();

  const token = useSelector((state: RootState) => state.user.token);

  const phoneNumberRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const postalCodeRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const streetRef = useRef<HTMLInputElement>(null);
  const homeNumberRef = useRef<HTMLInputElement>(null);
  const bankNumberRef = useRef<HTMLInputElement>(null);

  const submitContactEditHandler = (event: FormEvent) => {
    event.preventDefault();

    const phoneNumberValue = phoneNumberRef.current!.value;
    const countryValue = countryRef.current!.value;
    const postalCodeValue = postalCodeRef.current!.value;
    const cityValue = cityRef.current!.value;
    const streetValue = streetRef.current!.value;
    const homeNumberValue = homeNumberRef.current!.value;
    const bankNumberValue = bankNumberRef.current!.value;


    dispatch(adminContactEdit(
      token, 
      index, {
      bankNumber: bankNumberValue,
      city: cityValue,
      country: countryValue,
      homeNumber: homeNumberValue,
      phoneNumber: +phoneNumberValue,
      postalCode: postalCodeValue,
      street: streetValue,
      _id
    }));

    dispatch(addInfoMessage({
      message: 'Contact edited!',
      isPositive: true,
      timeout: 1500
    }));

    disableReadonly();
  }

  return (
    <form
      className={classes['contact-form']}
      onSubmit={submitContactEditHandler}
    >
      <NumberInput
        ref={phoneNumberRef}
        title={'Phone number'}
        isReadonly={false}
        isRequired={true}
        isLabel={true}
        value={phoneNumber}
        validateInput={validatePhoneNumber}
      />
      <TextInput
        ref={countryRef}
        title={'Country'}
        isReadonly={false}
        isRequired={true}
        isLabel={true}
        value={country}
        inputMinValueLenght={2}
      />
      
      <TextInput
        ref={postalCodeRef}
        title={'Postal Code'}
        isReadonly={false}
        isRequired={true}
        isLabel={true}
        value={postalCode}
        inputMinValueLenght={3}
      />

      <TextInput
        ref={cityRef}
        title={'City'}
        isReadonly={false}
        isRequired={true}
        isLabel={true}
        value={city}
        inputMinValueLenght={2}
      />

      <TextInput
        ref={streetRef}
        title={'Street'}
        isReadonly={false}
        isRequired={true}
        isLabel={true}
        value={street}
        inputMinValueLenght={2}
      />

      <TextInput
        ref={homeNumberRef}
        title={'Home Number'}
        isReadonly={false}
        isRequired={true}
        isLabel={true}
        value={homeNumber}
        inputMinValueLenght={2}
      />

      <TextInput
        ref={bankNumberRef}
        title={'Bank Number'}
        isReadonly={false}
        isRequired={true}
        isLabel={true}
        value={bankNumber}
        inputMinValueLenght={2}
      />

      {!isReadonly && 
      <div className={classes['submit-button-container']}>
        <MainButton
          isSubmit={true}
          title='Edit contact'
        />
      </div>}
    </form>
  )
}

export default ContactForm
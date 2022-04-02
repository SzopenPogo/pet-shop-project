import { SyntheticEvent, useRef, useState } from 'react';
import EditButton from '../../buttons/EditButton/EditButton';
import MainButton from '../../buttons/MainButton/MainButton';
import TextInput from '../../inputs/TextInput/TextInput';
import classes from './AddressForm.module.scss';

const AddressForm = () => {

  const countryInputRef = useRef<HTMLInputElement>(null);
  const cityInputRef = useRef<HTMLInputElement>(null);
  const postalCodeInputRef = useRef<HTMLInputElement>(null);
  const streetInputRef = useRef<HTMLInputElement>(null);
  const homeNumberInputRef = useRef<HTMLInputElement>(null);
  const phoneNumberInputRef = useRef<HTMLInputElement>(null);

  const [isReadonly, setIsReadolny] = useState<boolean>(true);

  const validateInput = (value: string) => {
    return value.length >= 2;
  }

  const clickEditButtonHandler = () => {
    setIsReadolny(!isReadonly);
  }

  const submitHandler = (event: SyntheticEvent) => {
    event.preventDefault();

    const countryValue = countryInputRef.current!.value;
    const cityValue = cityInputRef.current!.value;
    const postalCodeValue = postalCodeInputRef.current!.value;
    const streetValue = streetInputRef.current!.value;
    const homeNumberValue = homeNumberInputRef.current!.value;
    const phoneNumberValue = phoneNumberInputRef.current!.value;

    const addressValues = [countryValue, cityValue, postalCodeValue, streetValue, homeNumberValue, phoneNumberValue];
  
    setIsReadolny(false);
  }

  return (
    <form className={classes['address-container']} onSubmit={submitHandler}>
      <h1>Address X</h1>
      <TextInput
        ref={countryInputRef}
        title='Country'
        value=''
        isLabel={true}
        isReadonly={isReadonly}
        isRequired={true}
        validateInput={validateInput}
      />

      <TextInput
        ref={cityInputRef}
        title='City'
        value=''
        isLabel={true}
        isReadonly={isReadonly}
        isRequired={true}
        validateInput={validateInput}
      />

      <TextInput
        ref={postalCodeInputRef}
        title='Postal code'
        value=''
        isLabel={true}
        isReadonly={isReadonly}
        isRequired={true}
        validateInput={validateInput}
      />

      <TextInput
        ref={streetInputRef}
        title='Street'
        value=''
        isLabel={true}
        isReadonly={isReadonly}
        isRequired={true}
        validateInput={validateInput}
      />

      <TextInput
        ref={homeNumberInputRef}
        title='Home number'
        value=''
        isLabel={true}
        isReadonly={isReadonly}
        isRequired={true}
        validateInput={validateInput}
      />

      <TextInput
        ref={phoneNumberInputRef}
        title='Phone number'
        value=''
        isLabel={true}
        isReadonly={isReadonly}
        isRequired={true}
        validateInput={validateInput}
      />

      { !isReadonly &&
        <div className={classes['submit-form']}>
          <MainButton title='Edit address' isSubmit={true} />
        </div>
      }

      <div className={classes['edit-button-container']}>
        <EditButton isActive={isReadonly} onClick={clickEditButtonHandler} />
      </div>
    </form>
  )
}

export default AddressForm
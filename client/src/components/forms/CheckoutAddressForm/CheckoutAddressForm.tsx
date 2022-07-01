import { useRef } from 'react';
import { MIN_ADDRES_CITY_LENGTH, MIN_ADDRES_COUNTRY_LENGTH, MIN_ADDRES_HOME_NUMBER_LENGTH, MIN_ADDRES_POSTAL_CODE_LENGTH, MIN_ADDRES_STREET_LENGTH } from '../../../constants/address';
import { validateAddressInput } from '../../../utils/validation/validateAddressInput';
import { validatePhoneNumber } from '../../../utils/validation/validatePhoneNumber';
import TextInput from '../../inputs/TextInput/TextInput';
import classes from './CheckoutAddressForm.module.scss';

const CheckoutAddressForm = () => {
  const countryInputRef = useRef<HTMLInputElement>(null);
  const cityInputRef = useRef<HTMLInputElement>(null);
  const postalCodeInputRef = useRef<HTMLInputElement>(null);
  const streetInputRef = useRef<HTMLInputElement>(null);
  const homeNumberInputRef = useRef<HTMLInputElement>(null);
  const phoneNumberInputRef = useRef<HTMLInputElement>(null);

  return (
    <form className={classes['checkout-addres']}>
      <TextInput
        ref={countryInputRef}
        title='Country'
        value=''
        isLabel={true}
        isReadonly={false}
        isRequired={true}
        validateInput={validateAddressInput}
        inputMinValueLenght={MIN_ADDRES_COUNTRY_LENGTH}
      />

      <TextInput
        ref={cityInputRef}
        title='City'
        value=''
        isLabel={true}
        isReadonly={false}
        isRequired={true}
        validateInput={validateAddressInput}
        inputMinValueLenght={MIN_ADDRES_CITY_LENGTH}
      />

      <TextInput
        ref={postalCodeInputRef}
        title='Postal code'
        value=''
        isLabel={true}
        isReadonly={false}
        isRequired={true}
        validateInput={validateAddressInput}
        inputMinValueLenght={MIN_ADDRES_POSTAL_CODE_LENGTH}
      />

      <TextInput
        ref={streetInputRef}
        title='Street'
        value=''
        isLabel={true}
        isReadonly={false}
        isRequired={true}
        validateInput={validateAddressInput}
        inputMinValueLenght={MIN_ADDRES_STREET_LENGTH}
      />

      <TextInput
        ref={homeNumberInputRef}
        title='Home number'
        value=''
        isLabel={true}
        isReadonly={false}
        isRequired={true}
        validateInput={validateAddressInput}
        inputMinValueLenght={MIN_ADDRES_HOME_NUMBER_LENGTH}
      />

      <TextInput
        ref={phoneNumberInputRef}
        title='Phone number'
        value=''
        isLabel={true}
        isReadonly={false}
        isRequired={true}
        validateInput={validatePhoneNumber}
      />
    </form>
  )
}

export default CheckoutAddressForm;
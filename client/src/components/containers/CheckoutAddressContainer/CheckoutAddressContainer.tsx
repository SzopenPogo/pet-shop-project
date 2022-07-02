import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { MIN_ADDRES_CITY_LENGTH, MIN_ADDRES_COUNTRY_LENGTH, MIN_ADDRES_HOME_NUMBER_LENGTH, MIN_ADDRES_POSTAL_CODE_LENGTH, MIN_ADDRES_STREET_LENGTH } from '../../../constants/address';
import { IDeliveryAddressData } from '../../../interfaces/IAddressData';
import { RootState } from '../../../store';
import { validateAddressInput } from '../../../utils/validation/validateAddressInput';
import { validatePhoneNumber } from '../../../utils/validation/validatePhoneNumber';
import SecondaryButton from '../../buttons/SecondaryButton/SecondaryButton';
import TextInput from '../../inputs/TextInput/TextInput';
import AddressesModal from '../../modals/AddressesModal/AddressesModal';
import classes from './CheckoutAddressContainer.module.scss';

interface IProps {
  sendDataToForm: (addressData: IDeliveryAddressData) => void;
}

const CheckoutAddressContainer = ({sendDataToForm}: IProps) => {
  const countryInputRef = useRef<HTMLInputElement>(null);
  const cityInputRef = useRef<HTMLInputElement>(null);
  const postalCodeInputRef = useRef<HTMLInputElement>(null);
  const streetInputRef = useRef<HTMLInputElement>(null);
  const homeNumberInputRef = useRef<HTMLInputElement>(null);
  const phoneNumberInputRef = useRef<HTMLInputElement>(null);

  const userId = useSelector((state: RootState) => state.user.data._id);
  const selectedAddress = useSelector((state: RootState) => state.address.selectedAddressData);
  
  const [isAddressModal, setIsAddressModal] = useState<boolean>(false);
  const [values, setValues] = useState({
    countryInputValue: '',
    cityInputValue: '',
    postalCodeInputValue: '',
    streetInputValue: '',
    homeNumberInputValue: '',
    phoneNumberInputValue: ''
  });

  const addressSelectHandler = useCallback(() => {
    const addressData = {
      country: values.countryInputValue,
      postalCode: values.postalCodeInputValue,
      city: values.cityInputValue,
      street: values.streetInputValue,
      homeNumber: values.homeNumberInputValue,
      phoneNumber: values.phoneNumberInputValue
    } as IDeliveryAddressData;

    sendDataToForm(addressData);
  }, [sendDataToForm, values])

  const addressChangeHandler = () => {
    //Pass data to parent component

    const countryValue = countryInputRef.current!.value;
    const cityValue = cityInputRef.current!.value;
    const postalCodeValue = postalCodeInputRef.current!.value;
    const streetValue = streetInputRef.current!.value;
    const homeNumberValue = homeNumberInputRef.current!.value;
    const phoneNumberValue = phoneNumberInputRef.current!.value;

    const addressData = {
      country: countryValue,
      postalCode: postalCodeValue,
      city: cityValue,
      street: streetValue,
      homeNumber: homeNumberValue,
      phoneNumber: phoneNumberValue
    } as IDeliveryAddressData

    
    
    sendDataToForm(addressData);
  }
  
  const updateSelectedValues = useCallback(() => {
    if(selectedAddress._id && userId) {
      //Extract object keys
      const selectedAddressKeys = Object.keys(selectedAddress);
      const inputValuesKeys = Object.keys(values);

      const newValues = {
        ...values
      };
  
      //Loop through selected addres keys
      for (let i = 0; i < selectedAddressKeys.length; i++) {
        //Loop through values keys
        for (let j = 0; j < inputValuesKeys.length; j++) {
          //Check if value key name include any part of address key name
          if(inputValuesKeys[j].includes(selectedAddressKeys[i])) {
            //Cast value into objects keys
            type ValuesObjectKey = keyof typeof values;
            const inputValuesKey = inputValuesKeys[j] as ValuesObjectKey;
  
            type SelectedAddresObjectKey = keyof typeof selectedAddress;
            const selectedAddresKey = selectedAddressKeys[i] as SelectedAddresObjectKey;
  
            //Set values
            newValues[`${inputValuesKey}`] = selectedAddress[`${selectedAddresKey}`].toString();
          }
        }
      }

      setValues(newValues);
    }
  }, [selectedAddress, userId])

  useEffect(() => {
    updateSelectedValues();
  }, [updateSelectedValues]);

  useEffect(() => {
    addressSelectHandler();
  }, [values])
  

  const toggleAdressesModalHandler = () => {
    setIsAddressModal(!isAddressModal);
  }

  return (
    <div className={classes['checkout-address-container']} onChange={addressChangeHandler}>
      <h1 className={classes['checkout-address-title']}>Address</h1>
      {userId && <div className={classes['saved-address-button-container']}>
        <SecondaryButton 
          isSubmit={false} 
          title='Saved addresses'
          onClick={toggleAdressesModalHandler}
        />  
      </div>}

      <TextInput
        ref={countryInputRef}
        title='Country'
        value={values.countryInputValue}
        isLabel={true}
        isReadonly={false}
        isRequired={true}
        validateInput={validateAddressInput}
        inputMinValueLenght={MIN_ADDRES_COUNTRY_LENGTH}
      />

      <TextInput
        ref={cityInputRef}
        title='City'
        value={values.cityInputValue}
        isLabel={true}
        isReadonly={false}
        isRequired={true}
        validateInput={validateAddressInput}
        inputMinValueLenght={MIN_ADDRES_CITY_LENGTH}
      />

      <TextInput
        ref={postalCodeInputRef}
        title='Postal code'
        value={values.postalCodeInputValue}
        isLabel={true}
        isReadonly={false}
        isRequired={true}
        validateInput={validateAddressInput}
        inputMinValueLenght={MIN_ADDRES_POSTAL_CODE_LENGTH}
      />

      <TextInput
        ref={streetInputRef}
        title='Street'
        value={values.streetInputValue}
        isLabel={true}
        isReadonly={false}
        isRequired={true}
        validateInput={validateAddressInput}
        inputMinValueLenght={MIN_ADDRES_STREET_LENGTH}
      />

      <TextInput
        ref={homeNumberInputRef}
        title='Home number'
        value={values.homeNumberInputValue}
        isLabel={true}
        isReadonly={false}
        isRequired={true}
        validateInput={validateAddressInput}
        inputMinValueLenght={MIN_ADDRES_HOME_NUMBER_LENGTH}
      />

      <TextInput
        ref={phoneNumberInputRef}
        title='Phone number'
        value={values.phoneNumberInputValue}
        isLabel={true}
        isReadonly={false}
        isRequired={true}
        validateInput={validatePhoneNumber}
      />

      <AddressesModal
        isAddressModal={isAddressModal}
        close={toggleAdressesModalHandler}
      />
    </div>
  )
}

export default CheckoutAddressContainer;
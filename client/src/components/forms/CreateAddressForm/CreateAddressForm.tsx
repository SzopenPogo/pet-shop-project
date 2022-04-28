import { SyntheticEvent, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { addNewAddress } from '../../../store/address/actions/address-add-actions';
import { validateAddressInput } from '../../../utils/validation/validateAddressInput';
import { validatePhoneNumber } from '../../../utils/validation/validatePhoneNumber';
import MainButton from '../../buttons/MainButton/MainButton';
import TextInput from '../../inputs/TextInput/TextInput'
import classes from './CreateAddressForm.module.scss';

interface IProps {
  onSubmitFunction?: () => void;
}

const CreateAddressForm = ({onSubmitFunction}: IProps) => {
  const dispatch = useDispatch();

  const countryInputRef = useRef<HTMLInputElement>(null);
  const cityInputRef = useRef<HTMLInputElement>(null);
  const postalCodeInputRef = useRef<HTMLInputElement>(null);
  const streetInputRef = useRef<HTMLInputElement>(null);
  const homeNumberInputRef = useRef<HTMLInputElement>(null);
  const phoneNumberInputRef = useRef<HTMLInputElement>(null);

  const token = useSelector((state: RootState) => state.user.token);

  const CreateAddress = (event: SyntheticEvent) => {
    event.preventDefault();

    const countryValue = countryInputRef.current!.value;
    const cityValue = cityInputRef.current!.value;
    const postalCodeValue = postalCodeInputRef.current!.value;
    const streetValue = streetInputRef.current!.value;
    const homeNumberValue = homeNumberInputRef.current!.value;
    const phoneNumberValue = phoneNumberInputRef.current!.value;

    dispatch(addNewAddress(
      token,
      countryValue,
      cityValue,
      postalCodeValue,
      streetValue,
      homeNumberValue,
      phoneNumberValue
    ));

    if (onSubmitFunction) {
      onSubmitFunction();
    }
  }
  
  return (
    <form className={classes['create-address-form']} onSubmit={CreateAddress}>
      <h1>Create new address</h1>
      <TextInput
        ref={countryInputRef}
        title='Country'
        value=''
        isLabel={true}
        isReadonly={false}
        isRequired={true}
        validateInput={validateAddressInput}
      />

      <TextInput
        ref={cityInputRef}
        title='City'
        value=''
        isLabel={true}
        isReadonly={false}
        isRequired={true}
        validateInput={validateAddressInput}
      />

      <TextInput
        ref={postalCodeInputRef}
        title='Postal code'
        value=''
        isLabel={true}
        isReadonly={false}
        isRequired={true}
        validateInput={validateAddressInput}
      />

      <TextInput
        ref={streetInputRef}
        title='Street'
        value=''
        isLabel={true}
        isReadonly={false}
        isRequired={true}
        validateInput={validateAddressInput}
      />

      <TextInput
        ref={homeNumberInputRef}
        title='Home number'
        value=''
        isLabel={true}
        isReadonly={false}
        isRequired={true}
        validateInput={validateAddressInput}
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

      <div className={classes['submit-button']}>
        <MainButton
          isSubmit={true}
          title='Create'
        />
      </div>
    </form>
  )
}

export default CreateAddressForm
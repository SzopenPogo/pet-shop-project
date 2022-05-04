import { SyntheticEvent, useRef, useState } from 'react';
import EditButton from '../../buttons/EditButton/EditButton';
import MainButton from '../../buttons/MainButton/MainButton';
import TextInput from '../../inputs/TextInput/TextInput';
import classes from './AddressForm.module.scss';
import { CSSTransition } from 'react-transition-group';
import { IAddressData } from '../../../interfaces/IAddressData';
import { useDispatch, useSelector } from 'react-redux';
import { editAddress } from '../../../store/address/actions/address-edit-actions';
import { RootState } from '../../../store';
import DeleteButton from '../../buttons/DeleteButton/DeleteButton';
import MainModal from '../../modals/MainModal/MainModal';
import { uiActions } from '../../../store/ui/ui-slice';
import { deleteUserAddress } from '../../../store/address/actions/address-delete-actions';
import MainRedButton from '../../buttons/MainRedButton/MainRedButton';
import { validateAddressInput } from '../../../utils/validation/validateAddressInput';
import { validatePhoneNumber } from '../../../utils/validation/validatePhoneNumber';
import { addInfoMessage } from '../../../store/ui/actions/info-items-actions';
import { MIN_ADDRES_CITY_LENGTH, MIN_ADDRES_COUNTRY_LENGTH, MIN_ADDRES_HOME_NUMBER_LENGTH, MIN_ADDRES_POSTAL_CODE_LENGTH, MIN_ADDRES_STREET_LENGTH } from '../../../constants/address';
import { addressSelect } from '../../../store/address/actions/address-select-actions';

interface IProps extends IAddressData {
  addressIndex: number;
}

const AddressForm = ({
  _id,
  country,
  postalCode,
  city,
  street,
  homeNumber,
  phoneNumber,
  addressIndex }: IProps) => {

  const dispatch = useDispatch();
  
  const countryInputRef = useRef<HTMLInputElement>(null);
  const cityInputRef = useRef<HTMLInputElement>(null);
  const postalCodeInputRef = useRef<HTMLInputElement>(null);
  const streetInputRef = useRef<HTMLInputElement>(null);
  const homeNumberInputRef = useRef<HTMLInputElement>(null);
  const phoneNumberInputRef = useRef<HTMLInputElement>(null);

  const [isReadonly, setIsReadolny] = useState<boolean>(true);

  const token = useSelector((state: RootState) => state.user.token);
  const isDeleteModalActive = useSelector((state: RootState) => state.ui.isDeleteModalActive);
  const selectedAddres = useSelector((state: RootState) => state.address.selectedAddressData);

  const clickEditButtonHandler = () => {
    setIsReadolny(!isReadonly);
  }

  const toggleDeleteModal = () => {
    dispatch(uiActions.toggleDeleteModal());
  }

  const selectAddress = () => {
    dispatch(addressSelect({
      _id,
      userId: token,
      country,
      postalCode,
      city,
      street,
      homeNumber,
      phoneNumber,
      index: addressIndex
    }));
  }

  const prepareAddressForDelete = () => {
    selectAddress();
    toggleDeleteModal();
  }

  const deleteAddress = () => {
    dispatch(deleteUserAddress(token, selectedAddres._id, selectedAddres.index));
    toggleDeleteModal();
    dispatch(addInfoMessage({message: 'Address deleted!', timeout: 1500, isPositive: false}));
  }

  const submitHandler = (event: SyntheticEvent) => {
    event.preventDefault();

    const countryValue = countryInputRef.current!.value;
    const cityValue = cityInputRef.current!.value;
    const postalCodeValue = postalCodeInputRef.current!.value;
    const streetValue = streetInputRef.current!.value;
    const homeNumberValue = homeNumberInputRef.current!.value;
    const phoneNumberValue = phoneNumberInputRef.current!.value;

    dispatch(editAddress(
      token,
      _id,
      addressIndex,
      countryValue,
      cityValue,
      postalCodeValue,
      streetValue,
      homeNumberValue,
      phoneNumberValue
    ));

    setIsReadolny(true);
    dispatch(addInfoMessage({message: `Address edited!`, timeout: 1500, isPositive: true}));
  }

  let addressNumber = addressIndex; // <-- Added to prevent addressIndex from being incremented while map
  const nodeRef = useRef(null);
  return (
    <form className={classes['address-container']} onSubmit={submitHandler}>
      <h1>Address {++addressNumber}</h1>
      <TextInput
        ref={countryInputRef}
        title='Country'
        value={country}
        isLabel={true}
        isReadonly={isReadonly}
        isRequired={true}
        validateInput={validateAddressInput}
        inputMinValueLenght={MIN_ADDRES_COUNTRY_LENGTH}
      />

      <TextInput
        ref={cityInputRef}
        title='City'
        value={city}
        isLabel={true}
        isReadonly={isReadonly}
        isRequired={true}
        validateInput={validateAddressInput}
        inputMinValueLenght={MIN_ADDRES_CITY_LENGTH}
      />

      <TextInput
        ref={postalCodeInputRef}
        title='Postal code'
        value={postalCode}
        isLabel={true}
        isReadonly={isReadonly}
        isRequired={true}
        validateInput={validateAddressInput}
        inputMinValueLenght={MIN_ADDRES_POSTAL_CODE_LENGTH}
      />

      <TextInput
        ref={streetInputRef}
        title='Street'
        value={street}
        isLabel={true}
        isReadonly={isReadonly}
        isRequired={true}
        validateInput={validateAddressInput}
        inputMinValueLenght={MIN_ADDRES_STREET_LENGTH}
      />

      <TextInput
        ref={homeNumberInputRef}
        title='Home number'
        value={homeNumber}
        isLabel={true}
        isReadonly={isReadonly}
        isRequired={true}
        validateInput={validateAddressInput}
        inputMinValueLenght={MIN_ADDRES_HOME_NUMBER_LENGTH}
      />

      <TextInput
        ref={phoneNumberInputRef}
        title='Phone number'
        value={phoneNumber.toString()}
        isLabel={true}
        isReadonly={isReadonly}
        isRequired={true}
        validateInput={validatePhoneNumber}
        inputMinValueLenght={5}
      />

      <CSSTransition
        nodeRef={nodeRef}
        in={!isReadonly}
        timeout={150}
        mountOnEnter
        unmountOnExit
        classNames={{
          enter: classes['enter'],
          enterActive: classes['enter-active'],
          exit: classes['exit'],
          exitActive: classes['exit-active']
        }}
      >
        <div ref={nodeRef} className={classes['submit-form']}>
          <MainButton title='Edit address' isSubmit={true} />
        </div>
      </CSSTransition>

      <div className={classes['manage-buttons-container']}>
        {isReadonly && <DeleteButton onClick={prepareAddressForDelete} />}
        <EditButton isActive={isReadonly} onClick={clickEditButtonHandler} />
      </div>

      <MainModal
        timeout={300}
        activate={isDeleteModalActive}
        title={`Delete Address`}
        closeFunction={toggleDeleteModal} >
        <div className={classes['address-delete-modal']}>
          <span>Are you sure you want<br />to delete this address?</span>
          <MainRedButton isSubmit={false} title='Delete' onClick={deleteAddress} />
        </div>
      </MainModal>
    </form>
  )
}

export default AddressForm
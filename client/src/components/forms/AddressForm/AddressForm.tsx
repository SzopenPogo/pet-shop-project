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

  const validateInput = (value: string) => {
    return value.length >= 2;
  }

  const validatePhoneInput = (value: string) => {
    // Check if value is not a number. Whitespaces are allowed
    if (!+value.replace(/\s+/g, '')) {
      return false;
    }

    return value.length >= 2;
  }

  const clickEditButtonHandler = () => {
    setIsReadolny(!isReadonly);
  }

  const toggleDeleteModal = () => {
    dispatch(uiActions.toggleDeleteModal());
  }

  const deleteAddress = () => {
    dispatch(deleteUserAddress(token, _id, addressIndex));
    toggleDeleteModal();
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
        validateInput={validateInput}
      />

      <TextInput
        ref={cityInputRef}
        title='City'
        value={city}
        isLabel={true}
        isReadonly={isReadonly}
        isRequired={true}
        validateInput={validateInput}
      />

      <TextInput
        ref={postalCodeInputRef}
        title='Postal code'
        value={postalCode}
        isLabel={true}
        isReadonly={isReadonly}
        isRequired={true}
        validateInput={validateInput}
      />

      <TextInput
        ref={streetInputRef}
        title='Street'
        value={street}
        isLabel={true}
        isReadonly={isReadonly}
        isRequired={true}
        validateInput={validateInput}
      />

      <TextInput
        ref={homeNumberInputRef}
        title='Home number'
        value={homeNumber}
        isLabel={true}
        isReadonly={isReadonly}
        isRequired={true}
        validateInput={validateInput}
      />

      <TextInput
        ref={phoneNumberInputRef}
        title='Phone number'
        value={phoneNumber.toString()}
        isLabel={true}
        isReadonly={isReadonly}
        isRequired={true}
        validateInput={validatePhoneInput}
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
        {isReadonly && <DeleteButton onClick={toggleDeleteModal} />}
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